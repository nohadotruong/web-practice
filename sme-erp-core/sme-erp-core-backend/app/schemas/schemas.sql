-- =====================================================================
-- SME ERP CORE DB - Phân hệ 1: Quản lý kho & chuỗi cung ứng
-- PostgreSQL 13+
-- Bước 0 (chạy riêng, ngoài script này):
--     CREATE DATABASE sme_erp_core_db;
--     \c sme_erp_core_db
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 1. ENUM
-- ---------------------------------------------------------------------
CREATE TYPE user_role_value      AS ENUM ('admin', 'warehouse_manager', 'sale', 'cashier', 'accountant');
CREATE TYPE product_source_value AS ENUM ('genuine', 'repurchased');
CREATE TYPE serial_status_value  AS ENUM ('in_stock', 'sold', 'warranty', 'returned');
CREATE TYPE movement_type_value  AS ENUM ('import', 'export', 'transfer_in', 'transfer_out', 'adjust', 'return');

-- ---------------------------------------------------------------------
-- 2. HÀM DÙNG CHUNG
-- ---------------------------------------------------------------------
CREATE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------
-- 3. BẢNG DỮ LIỆU
-- Quy ước: mỗi bảng có 6 cột audit (created_at/by, updated_at/by, deleted_at/by).
-- FK audit và trigger updated_at được gắn tự động ở mục 5.
-- ---------------------------------------------------------------------

CREATE TABLE users (
    user_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username       VARCHAR(50)  NOT NULL,
    full_name      VARCHAR(100) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    date_of_birth  DATE         NOT NULL,
    user_role      user_role_value NOT NULL,           -- bắt buộc chỉ định, không default
    password_hash  TEXT         NOT NULL,              -- bcrypt/argon2 hash
    is_active      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ,
    deleted_at     TIMESTAMPTZ,
    created_by     UUID,
    updated_by     UUID,
    deleted_by     UUID
);

CREATE TABLE categories (
    category_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_name  VARCHAR(100) NOT NULL,
    description    VARCHAR(255),
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ,
    deleted_at     TIMESTAMPTZ,
    created_by     UUID,
    updated_by     UUID,
    deleted_by     UUID
);

CREATE TABLE brands (
    brand_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_name     VARCHAR(100) NOT NULL,
    description    VARCHAR(255),
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ,
    deleted_at     TIMESTAMPTZ,
    created_by     UUID,
    updated_by     UUID,
    deleted_by     UUID
);

CREATE TABLE attributes (
    attribute_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attribute_name VARCHAR(50)  NOT NULL,              -- 'Màu sắc', 'Dung lượng'...
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ,
    deleted_at     TIMESTAMPTZ,
    created_by     UUID,
    updated_by     UUID,
    deleted_by     UUID
);

CREATE TABLE attribute_values (
    attribute_value_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attribute_id       UUID NOT NULL
        REFERENCES attributes(attribute_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    attribute_value    VARCHAR(100) NOT NULL,          -- 'Đỏ', '256GB'...
    created_at         TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMPTZ,
    deleted_at         TIMESTAMPTZ,
    created_by         UUID,
    updated_by         UUID,
    deleted_by         UUID,
    -- cần để product_attributes tham chiếu composite (đảm bảo value thuộc đúng attribute)
    CONSTRAINT uq_attribute_values_id_attr UNIQUE (attribute_value_id, attribute_id)
);

CREATE TABLE warehouses (
    warehouse_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warehouse_name       VARCHAR(100) NOT NULL,
    address              VARCHAR(255),
    warehouse_manager_id UUID
        REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    is_active            BOOLEAN NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ,
    deleted_at           TIMESTAMPTZ,
    created_by           UUID,
    updated_by           UUID,
    deleted_by           UUID
);

CREATE TABLE vendors (
    vendor_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_name        VARCHAR(150) NOT NULL,
    vendor_tax_id      VARCHAR(20)  NOT NULL,
    product_source     product_source_value NOT NULL DEFAULT 'genuine',
    rating             NUMERIC(2,1) CHECK (rating BETWEEN 1 AND 5),
    contact_person     VARCHAR(100),
    contact_phone      VARCHAR(20),
    contact_email      VARCHAR(255),
    address            VARCHAR(255),
    credit_limit       NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (credit_limit >= 0),      -- hạn mức công nợ
    payment_term_days  INTEGER       NOT NULL DEFAULT 0 CHECK (payment_term_days >= 0), -- vd: 30 ngày
    created_at         TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMPTZ,
    deleted_at         TIMESTAMPTZ,
    created_by         UUID,
    updated_by         UUID,
    deleted_by         UUID
);

CREATE TABLE products (
    product_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku_code              VARCHAR(30)  NOT NULL,
    ean_code              VARCHAR(13),                 -- EAN-13, có thể không có
    product_name          VARCHAR(255) NOT NULL,
    category_id           UUID NOT NULL
        REFERENCES categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    brand_id              UUID
        REFERENCES brands(brand_id) ON DELETE SET NULL ON UPDATE CASCADE,
    default_vendor_id     UUID
        REFERENCES vendors(vendor_id) ON DELETE SET NULL ON UPDATE CASCADE,
    unit                  VARCHAR(20)  NOT NULL DEFAULT 'cái',
    is_serial_tracked     BOOLEAN      NOT NULL DEFAULT FALSE,   -- TRUE: theo dõi IMEI/Serial
    weight_g              NUMERIC(10,2) CHECK (weight_g >= 0),
    length_mm             NUMERIC(10,2) CHECK (length_mm >= 0),
    width_mm              NUMERIC(10,2) CHECK (width_mm >= 0),
    height_mm             NUMERIC(10,2) CHECK (height_mm >= 0),
    last_import_price     NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (last_import_price >= 0),
    average_import_price  NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (average_import_price >= 0),
    listed_retail_price   NUMERIC(15,2) NOT NULL CHECK (listed_retail_price >= 0),
    wholesale_price       NUMERIC(15,2) NOT NULL CHECK (wholesale_price >= 0),
    floor_price           NUMERIC(15,2) NOT NULL CHECK (floor_price >= 0),
    created_at            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMPTZ,
    deleted_at            TIMESTAMPTZ,
    created_by            UUID,
    updated_by            UUID,
    deleted_by            UUID,
    CONSTRAINT chk_products_price_order
        CHECK (floor_price <= wholesale_price AND wholesale_price <= listed_retail_price)
);

CREATE TABLE product_attributes (
    product_attribute_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id           UUID NOT NULL
        REFERENCES products(product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    attribute_id         UUID NOT NULL,
    attribute_value_id   UUID NOT NULL,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ,
    deleted_at           TIMESTAMPTZ,
    created_by           UUID,
    updated_by           UUID,
    deleted_by           UUID,
    -- value phải thuộc đúng attribute
    CONSTRAINT fk_product_attributes_value
        FOREIGN KEY (attribute_value_id, attribute_id)
        REFERENCES attribute_values(attribute_value_id, attribute_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE product_serials (
    serial_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id           UUID NOT NULL
        REFERENCES products(product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    serial_number        VARCHAR(50) NOT NULL,          -- IMEI / Serial
    serial_status        serial_status_value NOT NULL DEFAULT 'in_stock',
    warehouse_id         UUID                           -- NULL khi đã bán / đang ở khách
        REFERENCES warehouses(warehouse_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    vendor_id            UUID
        REFERENCES vendors(vendor_id) ON DELETE SET NULL ON UPDATE CASCADE,
    import_price         NUMERIC(15,2) CHECK (import_price >= 0),
    imported_at          TIMESTAMPTZ,
    warranty_expired_at  DATE,                          -- theo dõi bảo hành
    created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ,
    deleted_at           TIMESTAMPTZ,
    created_by           UUID,
    updated_by           UUID,
    deleted_by           UUID
);

CREATE TABLE stock_cards (
    stock_card_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID NOT NULL
        REFERENCES products(product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    warehouse_id    UUID NOT NULL
        REFERENCES warehouses(warehouse_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    physical_stock  INTEGER NOT NULL DEFAULT 0 CHECK (physical_stock >= 0),   -- tồn thực tế
    reserved_stock  INTEGER NOT NULL DEFAULT 0 CHECK (reserved_stock >= 0),   -- khách đặt chưa giao
    available_stock INTEGER GENERATED ALWAYS AS (physical_stock - reserved_stock) STORED, -- tồn khả dụng
    safety_stock    INTEGER NOT NULL DEFAULT 0 CHECK (safety_stock >= 0),     -- tồn tối thiểu
    max_stock       INTEGER NOT NULL DEFAULT 0 CHECK (max_stock >= 0),        -- tồn tối đa
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ,
    deleted_at      TIMESTAMPTZ,
    created_by      UUID,
    updated_by      UUID,
    deleted_by      UUID,
    CONSTRAINT chk_stock_cards_reserved  CHECK (reserved_stock <= physical_stock),
    CONSTRAINT chk_stock_cards_safety_max CHECK (safety_stock <= max_stock)
);

-- Sổ cái nhập/xuất: append-only, không sửa/xoá -> không cần cột update/delete
CREATE TABLE stock_movements (
    movement_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID NOT NULL
        REFERENCES products(product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    warehouse_id    UUID NOT NULL
        REFERENCES warehouses(warehouse_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    serial_id       UUID
        REFERENCES product_serials(serial_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    movement_type   movement_type_value NOT NULL,
    quantity        INTEGER NOT NULL CHECK (quantity <> 0),  -- dương = nhập, âm = xuất
    unit_cost       NUMERIC(15,2) CHECK (unit_cost >= 0),
    reference_type  VARCHAR(30),                             -- 'purchase_order', 'sales_order'...
    reference_id    UUID,
    note            TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      UUID REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------
-- 4. UNIQUE INDEX (partial: chỉ áp dụng bản ghi chưa xoá mềm)
-- ---------------------------------------------------------------------
CREATE UNIQUE INDEX uq_users_username        ON users(username)            WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_users_email           ON users(lower(email))        WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_users_phone           ON users(phone)               WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_categories_name       ON categories(lower(category_name)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_brands_name           ON brands(lower(brand_name))  WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_attributes_name       ON attributes(lower(attribute_name)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_attribute_values      ON attribute_values(attribute_id, lower(attribute_value)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_warehouses_name       ON warehouses(lower(warehouse_name)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_vendors_tax_id        ON vendors(vendor_tax_id)     WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_products_sku          ON products(sku_code)         WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_products_ean          ON products(ean_code)         WHERE deleted_at IS NULL AND ean_code IS NOT NULL;
CREATE UNIQUE INDEX uq_product_attributes    ON product_attributes(product_id, attribute_id) WHERE deleted_at IS NULL; -- 1 giá trị / thuộc tính / sản phẩm
CREATE UNIQUE INDEX uq_product_serials_sn    ON product_serials(serial_number) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX uq_stock_cards_prod_wh   ON stock_cards(product_id, warehouse_id) WHERE deleted_at IS NULL;

-- ---------------------------------------------------------------------
-- 5. INDEX CHO FK / TRUY VẤN THƯỜNG DÙNG
-- (Postgres không tự tạo index cho cột FK)
-- ---------------------------------------------------------------------
CREATE INDEX idx_products_category        ON products(category_id);
CREATE INDEX idx_products_brand           ON products(brand_id);
CREATE INDEX idx_products_default_vendor  ON products(default_vendor_id);
CREATE INDEX idx_attribute_values_attr    ON attribute_values(attribute_id);
CREATE INDEX idx_product_attributes_value ON product_attributes(attribute_value_id, attribute_id);
CREATE INDEX idx_product_serials_product  ON product_serials(product_id);
CREATE INDEX idx_product_serials_wh_stat  ON product_serials(warehouse_id, serial_status);
CREATE INDEX idx_product_serials_warranty ON product_serials(warranty_expired_at) WHERE warranty_expired_at IS NOT NULL;
CREATE INDEX idx_stock_cards_warehouse    ON stock_cards(warehouse_id);
CREATE INDEX idx_stock_movements_prod_wh  ON stock_movements(product_id, warehouse_id, created_at DESC);
CREATE INDEX idx_stock_movements_ref      ON stock_movements(reference_type, reference_id);
CREATE INDEX idx_warehouses_manager       ON warehouses(warehouse_manager_id);

-- ---------------------------------------------------------------------
-- 6. GẮN FK AUDIT + TRIGGER updated_at CHO TẤT CẢ BẢNG
-- ---------------------------------------------------------------------
DO $$
DECLARE
    t TEXT;
    tables TEXT[] := ARRAY[
        'users', 'categories', 'brands', 'attributes', 'attribute_values',
        'warehouses', 'vendors', 'products', 'product_attributes',
        'product_serials', 'stock_cards'
    ];
BEGIN
    FOREACH t IN ARRAY tables LOOP
        EXECUTE format(
            'ALTER TABLE %I ADD CONSTRAINT %I FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE',
            t, 'fk_' || t || '_created_by');
        EXECUTE format(
            'ALTER TABLE %I ADD CONSTRAINT %I FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE',
            t, 'fk_' || t || '_updated_by');
        EXECUTE format(
            'ALTER TABLE %I ADD CONSTRAINT %I FOREIGN KEY (deleted_by) REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE',
            t, 'fk_' || t || '_deleted_by');
        EXECUTE format(
            'CREATE TRIGGER %I BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()',
            'trg_' || t || '_updated_at', t);
    END LOOP;
END $$;

-- ---------------------------------------------------------------------
-- 7. COMMENT MÔ TẢ
-- ---------------------------------------------------------------------
COMMENT ON TABLE product_serials  IS 'Từng máy vật lý (IMEI/Serial) - theo dõi bảo hành';
COMMENT ON TABLE stock_cards      IS 'Số dư tồn hiện tại của mỗi SKU tại từng kho';
COMMENT ON TABLE stock_movements  IS 'Sổ cái nhập/xuất kho (append-only) - nguồn đối soát cho stock_cards';
COMMENT ON COLUMN stock_cards.available_stock IS 'Tự tính = physical_stock - reserved_stock';
COMMENT ON COLUMN products.average_import_price IS 'Bình quân gia quyền, cập nhật khi nhập kho (trigger/tầng ứng dụng)';

COMMIT;