# Schema Mô tả — Phân hệ 1: Quản lý Kho & Chuỗi cung ứng

> Dùng để giao cho agent sinh migration/code. DB đích: PostgreSQL 13+.
> Đây là bản đã cập nhật sau khi đọc toàn bộ đề bài 4 phân hệ — bổ sung các bảng
> bắt buộc phải có để tương thích với Bán hàng đa kênh, HRM/RBAC theo chi nhánh,
> và Tài chính (Phân hệ 2–4), dù code chi tiết các phân hệ đó chưa làm ở đây.

---

## 1. Bối cảnh

SME bán lẻ công nghệ, bán qua nhiều kênh (Showroom, Website, Shopee, Lazada),
có nhiều chi nhánh/kho. Phân hệ này là nguồn sự thật duy nhất cho: sản phẩm,
nhà cung cấp, tồn kho, và mọi biến động kho.

**Thay đổi lớn so với bản trước**, lý do:

| Thay đổi                                                                            | Vì yêu cầu nào                                                        |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Thêm `branches` (chi nhánh), gắn vào `warehouses`                                   | RBAC "chỉ nhìn thấy dữ liệu chi nhánh mình"                           |
| Thêm `stock_reservations` (giữ chỗ theo đơn hàng) thay vì chỉ 1 số `reserved_stock` | OMS: "Đã xác nhận → khoá tồn kho"; tránh 2 khách mua cùng 1 hàng cuối |
| Thêm `stocktakes` + `stocktake_lines` (phiếu kiểm kê)                               | Nghiệp vụ kiểm kê, khoá sổ kiểm kê, ghi nhận chênh lệch + lý do       |
| Thêm `purchase_receipts` + `purchase_receipt_lines` (phiếu nhập kho)                | Nguồn phát sinh công nợ phải trả NCC; giá vốn theo lô                 |
| Bắt buộc chọn `serial_id` khi xuất kho với hàng `is_serial_tracked`                 | "Bán theo Serial/IMEI" — chống tráo hàng                              |
| Đánh dấu trường nhạy cảm (giá vốn) cần ẩn theo role                                 | "Sales/Kho không được xem giá nhập gốc"                               |
| `available_stock` = tồn thực tế − tổng giữ chỗ đang hiệu lực (không phải cột đơn)   | Đồng bộ tồn realtime đa kênh                                          |

---

## 2. Quy ước chung (áp dụng mọi bảng trừ khi ghi khác)

- **Khoá chính:** UUID tự sinh.
- **Audit:** `created_at`, `updated_at`, `deleted_at`; `created_by`, `updated_by`,
  `deleted_by` (tham chiếu `users`, xoá user → đặt NULL).
- **Xoá mềm:** không xoá vật lý. "Duy nhất" = duy nhất trong các bản ghi
  `deleted_at IS NULL`.
- **Xoá mềm bản ghi cha khi còn con hoạt động → phải bị từ chối ở tầng
  ứng dụng/trigger**, DB constraint `RESTRICT` không tự chặn được xoá mềm.
- **Tiền:** số thập phân 15 chữ số, 2 lẻ, không âm.
- **Đặt tên:** snake_case, bảng số nhiều, `created_at` (không viết tắt).
- **Chứng từ (receipt/movement/stocktake đã duyệt):** bất biến — không có
  `updated_at/updated_by`, chỉ có thể bị đảo bằng chứng từ điều chỉnh mới,
  giống nguyên tắc ở Phân hệ 4 (Tài chính) để nhất quán toàn hệ thống.

---

## 3. Danh sách bảng

1. `branches` — chi nhánh
2. `warehouses` — kho vật lý, thuộc 1 chi nhánh
3. `users` _(rút gọn, đầy đủ ở Phân hệ 3 — chỉ khai trường Phân hệ 1 cần)_
4. `categories`
5. `brands`
6. `attributes`, `attribute_values`
7. `vendors`
8. `products`
9. `product_attributes`
10. `product_serials`
11. `stock_cards`
12. `stock_reservations`
13. `stock_movements`
14. `purchase_receipts`, `purchase_receipt_lines`
15. `stocktakes`, `stocktake_lines`

---

## 4. Đặc tả từng bảng

### 4.1 `branches` — Chi nhánh

| Trường      | Kiểu      | Bắt buộc | Ghi chú       |
| ----------- | --------- | -------- | ------------- |
| branch_name | text ≤100 | có       | Duy nhất      |
| address     | text      | không    |               |
| is_active   | boolean   | có       | mặc định true |

Dùng làm gốc cho **cô lập dữ liệu theo chi nhánh** (RBAC Phân hệ 3):
mọi truy vấn của Sales/Quản lý kho phải lọc theo chi nhánh của user, trừ
Giám đốc/Quản lý khu vực.

### 4.2 `warehouses` — Kho vật lý

| Trường            | Kiểu       | Bắt buộc | Ghi chú                        |
| ----------------- | ---------- | -------- | ------------------------------ |
| warehouse_name    | text ≤100  | có       | Duy nhất                       |
| branch            | → branches | **có**   | Một kho thuộc đúng 1 chi nhánh |
| warehouse_manager | → users    | không    | Xoá user → để trống            |
| address           | text       | không    |                                |
| is_active         | boolean    | có       | mặc định true                  |

> Thay đổi so với bản trước: `branch_id NOT NULL` — bắt buộc, vì toàn bộ
> cô lập dữ liệu theo chi nhánh dựa vào đường dẫn `warehouse → branch`.

### 4.3 `users` (chỉ phần Phân hệ 1 cần biết)

Bảng đầy đủ thuộc Phân hệ 3 (hồ sơ nhân sự, lương, hợp đồng). Ở đây chỉ
liệt kê các trường mà Phân hệ 1 tham chiếu tới:

| Trường                 | Kiểu                | Ghi chú                                 |
| ---------------------- | ------------------- | --------------------------------------- |
| user_id                | UUID                | khoá chính                              |
| username, email, phone | text                | định danh đăng nhập                     |
| branch                 | → branches          | chi nhánh làm việc, dùng để lọc dữ liệu |
| role                   | → roles (Phân hệ 3) | quyết định trường nào bị ẩn (COGS...)   |

**Ràng buộc bảo mật cần agent hiện thực ở tầng API (không phải ở schema):**
Response API cho role `sales` hoặc `warehouse_staff` phải loại bỏ các
trường: `last_import_price`, `average_import_price`, `unit_cost` (trong
`purchase_receipt_lines`), và mọi số liệu lợi nhuận. Chỉ `accountant` và
`admin` được thấy.

### 4.4 `categories`, `brands`, `attributes`, `attribute_values`

Giữ nguyên thiết kế bản trước (không đổi):

- `categories(category_name, description)`
- `brands(brand_name, description)`
- `attributes(attribute_name)` — ví dụ "Màu sắc", "Dung lượng"
- `attribute_values(attribute, attribute_value)` — ví dụ "Đỏ", "256GB"

### 4.5 `vendors` — Nhà cung cấp

| Trường                                       | Kiểu                       | Bắt buộc | Ghi chú                             |
| -------------------------------------------- | -------------------------- | -------- | ----------------------------------- |
| vendor_name                                  | text ≤150                  | có       |                                     |
| vendor_tax_id                                | text ≤20                   | có       | Duy nhất                            |
| product_source                               | enum(genuine, repurchased) | có       | mặc định genuine                    |
| rating                                       | số 1 lẻ                    | không    | 1.0–5.0                             |
| contact_person, contact_phone, contact_email | text                       | không    |                                     |
| address                                      | text                       | không    |                                     |
| credit_limit                                 | tiền                       | có       | Hạn mức công nợ được nợ, mặc định 0 |
| payment_term_days                            | số nguyên                  | có       | Gối đầu N ngày, mặc định 0          |

> Công nợ phải trả thực tế (số dư hiện tại) được **tính**, không lưu ở đây —
> xem `purchase_receipts` (Phân hệ 1) và Phiếu Chi (Phân hệ 4). Tránh lưu 2 nơi.

### 4.6 `products` — Sản phẩm master

Giữ nguyên phần lớn bản trước, bổ sung 1 trường:

| Trường                                   | Kiểu         | Bắt buộc | Ghi chú                                                             |
| ---------------------------------------- | ------------ | -------- | ------------------------------------------------------------------- |
| sku_code                                 | text ≤30     | có       | Duy nhất                                                            |
| ean_code                                 | text 13 số   | không    | Duy nhất nếu có; đúng định dạng EAN-13                              |
| product_name                             | text ≤255    | có       |                                                                     |
| category                                 | → categories | có       |                                                                     |
| brand                                    | → brands     | không    |                                                                     |
| default_vendor                           | → vendors    | không    | Gợi ý, không ràng buộc mua                                          |
| is_serial_tracked                        | boolean      | có       | **Quyết định luồng xuất kho** (xem 5.4)                             |
| unit                                     | text         | có       | mặc định "cái"                                                      |
| weight_g, length_mm, width_mm, height_mm | số           | không    |                                                                     |
| last_import_price                        | tiền         | có       | Hệ thống tự cập nhật từ `purchase_receipt_lines`, không cho sửa tay |
| average_import_price                     | tiền         | có       | Bình quân gia quyền, tự cập nhật                                    |
| listed_retail_price                      | tiền         | có       |                                                                     |
| wholesale_price                          | tiền         | có       |                                                                     |
| floor_price                              | tiền         | có       | Giá sàn — Sales không được bán dưới giá này (xem Phân hệ 2)         |

Ràng buộc: `floor_price ≤ wholesale_price ≤ listed_retail_price`.

**Trường nhạy cảm:** `last_import_price`, `average_import_price` = giá vốn
(COGS). Ẩn khỏi API response cho role không phải kế toán/admin.

### 4.7 `product_attributes`

Không đổi: `(product, attribute, attribute_value)`, mỗi sản phẩm chỉ 1
giá trị cho mỗi thuộc tính, `attribute_value` phải thuộc đúng `attribute`.

### 4.8 `product_serials` — Từng máy vật lý (IMEI/Serial)

| Trường                | Kiểu                                                        | Bắt buộc | Ghi chú                                                 |
| --------------------- | ----------------------------------------------------------- | -------- | ------------------------------------------------------- |
| product               | → products                                                  | có       | Chỉ tạo dòng này khi `product.is_serial_tracked = true` |
| serial_number         | text ≤50                                                    | có       | Duy nhất; nếu là IMEI thì đúng 15 chữ số                |
| serial_status         | enum(in_stock, reserved, sold, warranty, returned, damaged) | có       | mặc định in_stock                                       |
| warehouse             | → warehouses                                                | không    | NULL khi đã bán/không còn trong kho                     |
| vendor                | → vendors                                                   | không    | NCC của lô nhập ra serial này                           |
| purchase_receipt_line | → purchase_receipt_lines                                    | không    | Gắn về đúng lần nhập tạo ra máy này                     |
| import_price          | tiền                                                        | không    | Giá vốn của riêng máy này                               |
| imported_at           | thời gian                                                   | không    |                                                         |
| warranty_expired_at   | ngày                                                        | không    | Theo dõi bảo hành                                       |

> Thêm `serial_status = 'reserved'` và `'damaged'` so với bản trước, để khớp
> với "khoá tồn kho khi Đã xác nhận đơn" và "chênh lệch kiểm kê → lý do hỏng/mất".

### 4.9 `stock_cards` — Tồn kho hiện tại theo (sản phẩm, kho)

| Trường              | Kiểu         | Bắt buộc | Ghi chú                                     |
| ------------------- | ------------ | -------- | ------------------------------------------- |
| product             | → products   | có       |                                             |
| warehouse           | → warehouses | có       | Duy nhất theo cặp (product, warehouse)      |
| physical_stock      | số nguyên ≥0 | có       | Tồn thực tế — chỉ đổi qua `stock_movements` |
| safety_stock        | số nguyên ≥0 | có       | Ngưỡng cảnh báo tồn thấp                    |
| max_stock           | số nguyên ≥0 | có       | `safety_stock ≤ max_stock`                  |
| is_stocktake_locked | boolean      | có       | mặc định false — xem 5.3                    |

**`available_stock` không lưu ở đây.** Tính bằng công thức:

```
available_stock = physical_stock
                 − SUM(stock_reservations.quantity
                       WHERE status = 'active' AND product & warehouse khớp)
```

Lý do đổi so với bản trước: một số `reserved_stock` không đủ để biết đơn
nào đang giữ bao nhiêu, không xử lý được huỷ giữ chỗ riêng lẻ, và không an
toàn khi 2 kênh bán cùng lúc (race condition). Xem `stock_reservations`.

### 4.10 `stock_reservations` — Giữ chỗ tồn kho theo đơn hàng _(bảng mới)_

| Trường     | Kiểu                               | Bắt buộc | Ghi chú                                                               |
| ---------- | ---------------------------------- | -------- | --------------------------------------------------------------------- |
| product    | → products                         | có       |                                                                       |
| warehouse  | → warehouses                       | có       |                                                                       |
| quantity   | số nguyên >0                       | có       |                                                                       |
| order_id   | UUID                               | có       | Tham chiếu đơn hàng bên Phân hệ 2 (chưa có bảng `orders` ở đây)       |
| channel    | enum(pos, website, shopee, lazada) | có       | Kênh phát sinh đơn                                                    |
| status     | enum(active, released, consumed)   | có       | active: đang giữ; released: đơn huỷ; consumed: đã xuất kho thật       |
| expires_at | thời gian                          | không    | Tự huỷ giữ chỗ nếu đơn không thanh toán sau N phút (tránh giữ chỗ ảo) |

**Quy tắc:**

- Tạo dòng `active` khi đơn hàng chuyển "Đã xác nhận" → khoá tồn kho.
- Chuyển `consumed` khi đơn thực xuất kho (đồng thời tạo `stock_movements` loại export).
- Chuyển `released` khi đơn bị huỷ trước khi xuất kho.
- **Không tồn âm:** trước khi tạo `active` mới, phải kiểm tra
  `available_stock ≥ quantity`; việc kiểm tra + tạo phải nằm trong **một
  transaction có khoá dòng** (`SELECT ... FOR UPDATE` trên `stock_cards`)
  để 2 đơn cùng lúc không cùng giữ chỗ vượt tồn thật.

### 4.11 `stock_movements` — Sổ cái nhập/xuất/chuyển/điều chỉnh (append-only)

| Trường            | Kiểu                                                                                     | Bắt buộc                                                                | Ghi chú                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| product           | → products                                                                               | có                                                                      |                                                                               |
| warehouse         | → warehouses                                                                             | có                                                                      |                                                                               |
| serial            | → product_serials                                                                        | **bắt buộc nếu `product.is_serial_tracked = true`, không thì để trống** |                                                                               |
| movement_type     | enum(import, export, transfer_out, transfer_in, stocktake_adjust, return_in, return_out) | có                                                                      |                                                                               |
| quantity          | số nguyên khác 0                                                                         | có                                                                      | import/transfer_in/return_in > 0; export/transfer_out/return_out < 0          |
| unit_cost         | tiền                                                                                     | không                                                                   |                                                                               |
| transfer_group_id | UUID                                                                                     | không                                                                   | Nối cặp `transfer_out` ở kho A và `transfer_in` ở kho B của cùng 1 lần chuyển |
| reference_type    | text                                                                                     | không                                                                   | `'purchase_receipt'`, `'order'`, `'stocktake'`...                             |
| reference_id      | UUID                                                                                     | không                                                                   | Tham chiếu chứng từ nguồn                                                     |
| note              | text                                                                                     | không                                                                   |                                                                               |

**Bất biến:** chỉ thêm, không sửa/xoá. Sai sót phải tạo dòng đảo (điều chỉnh),
không sửa dòng cũ — giống nguyên tắc chứng từ tài chính ở Phân hệ 4.

**Quy tắc "không tồn âm":** trước khi ghi `export`, phải kiểm tra
`available_stock ≥ |quantity|` trong cùng transaction. Nếu không đủ, từ
chối và yêu cầu lập `stocktakes` điều chỉnh trước — đúng theo đề bài.

### 4.12 `purchase_receipts` — Phiếu nhập kho _(bảng mới)_

| Trường       | Kiểu                              | Bắt buộc | Ghi chú                                              |
| ------------ | --------------------------------- | -------- | ---------------------------------------------------- |
| receipt_code | text                              | có       | Duy nhất, mã hiển thị cho người dùng                 |
| vendor       | → vendors                         | có       |                                                      |
| warehouse    | → warehouses                      | có       |                                                      |
| status       | enum(draft, confirmed, cancelled) | có       | Chỉ `confirmed` mới cộng tồn kho + phát sinh công nợ |
| confirmed_at | thời gian                         | không    |                                                      |
| total_amount | tiền                              | có       | Tổng giá trị phiếu, tự tính từ các dòng              |

> `confirmed` là **bất biến** (theo quy ước chung mục 2). Sai sót sau khi
> confirm phải lập phiếu nhập điều chỉnh mới, không sửa phiếu cũ.

### 4.13 `purchase_receipt_lines` — Dòng chi tiết phiếu nhập

| Trường           | Kiểu                | Bắt buộc  | Ghi chú                                                                                                       |
| ---------------- | ------------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| purchase_receipt | → purchase_receipts | có        |                                                                                                               |
| product          | → products          | có        |                                                                                                               |
| quantity         | số nguyên >0        | có        |                                                                                                               |
| unit_cost        | tiền                | có        | Giá vốn của lô này                                                                                            |
| serial_numbers   | —                   | điều kiện | Nếu `product.is_serial_tracked`, phải nhập đủ N số serial (N = quantity), mỗi số tạo 1 dòng `product_serials` |

**Khi phiếu chuyển `confirmed`:**

1. Với mỗi dòng: tạo `stock_movements` (`import`, `reference_type='purchase_receipt'`).
2. Cộng `stock_cards.physical_stock`.
3. Cập nhật `products.last_import_price` = `unit_cost` mới nhất;
   `average_import_price` = bình quân gia quyền theo công thức:
   `(tồn cũ × giá TB cũ + qty mới × unit_cost mới) / (tồn cũ + qty mới)`.
4. Nếu `is_serial_tracked`: tạo các dòng `product_serials` tương ứng.
5. Phát sinh công nợ phải trả NCC = `total_amount` (dữ liệu này Phân hệ 4
   đọc từ đây, không lưu trùng ở `vendors`).

### 4.14 `stocktakes` — Phiếu kiểm kê _(bảng mới)_

| Trường               | Kiểu               | Bắt buộc | Ghi chú                                      |
| -------------------- | ------------------ | -------- | -------------------------------------------- |
| stocktake_code       | text               | có       | Duy nhất                                     |
| warehouse            | → warehouses       | có       |                                              |
| scope_category       | → categories       | không    | Có thể kiểm kê toàn kho hoặc chỉ 1 nhóm hàng |
| status               | enum(open, closed) | có       | mặc định open                                |
| opened_at            | thời gian          | có       |                                              |
| closed_at            | thời gian          | không    |                                              |
| opened_by, closed_by | → users            | có/không |                                              |

**Quy tắc khoá sổ kiểm kê:**

- Khi `status = open`: mọi `stock_movements` (nhập/xuất/bán/chuyển) liên
  quan tới `warehouse` (và `scope_category` nếu có) của phiếu này **bị
  chặn** ở tầng ứng dụng — kiểm tra tồn tại `stocktakes` đang `open` khớp
  phạm vi trước khi cho tạo `stock_movements` mới.
- Chuyển `closed` chỉ khi tất cả `stocktake_lines` đã có `counted_quantity`.

### 4.15 `stocktake_lines` — Dòng chi tiết kiểm kê

| Trường           | Kiểu                                         | Bắt buộc                          | Ghi chú                                    |
| ---------------- | -------------------------------------------- | --------------------------------- | ------------------------------------------ |
| stocktake        | → stocktakes                                 | có                                |                                            |
| product          | → products                                   | có                                |                                            |
| system_quantity  | số nguyên                                    | có                                | Snapshot `physical_stock` lúc mở phiếu     |
| counted_quantity | số nguyên                                    | không → bắt buộc trước khi đóng   | Số đếm thực tế                             |
| variance_reason  | enum(damaged, lost, found, other)            | **bắt buộc nếu counted < system** |                                            |
| responsibility   | enum(employee_compensate, company_write_off) | **bắt buộc nếu counted < system** | Nhân viên đền hay tính vào chi phí hao hụt |
| responsible_user | → users                                      | không                             | Nếu `employee_compensate`                  |

**Khi đóng phiếu (`closed`):** với mỗi dòng có chênh lệch, tự tạo 1 dòng
`stock_movements` loại `stocktake_adjust` (dấu +/− theo chênh lệch),
`reference_type='stocktake'`, để `physical_stock` khớp `counted_quantity`.

---

## 5. Quy tắc nghiệp vụ tổng hợp (theo đề bài)

1. **Không tồn âm:** mọi `export`/tạo `stock_reservations` phải kiểm tra
   `available_stock ≥ số lượng cần` trong transaction có khoá dòng
   (`SELECT ... FOR UPDATE`), tuyệt đối không cho âm.
2. **Bán theo serial:** nếu `product.is_serial_tracked = true`, mọi
   `stock_movements` loại export **bắt buộc** có `serial_id`, và serial đó
   phải đang ở `serial_status = 'in_stock'` (hoặc `'reserved'` bởi đúng đơn
   đang xuất). Sau khi xuất, đổi `serial_status = 'sold'`.
3. **Khoá sổ kiểm kê:** xem mục 4.14. Không được nhập/xuất/bán hàng thuộc
   phạm vi đang kiểm kê cho đến khi phiếu `closed`.
4. **Chênh lệch kiểm kê:** thiếu hàng bắt buộc có `variance_reason` +
   `responsibility` trước khi đóng phiếu.
5. **Đồng bộ tồn kho đa kênh (realtime):** mọi kênh (POS, Website, Shopee,
   Lazada) khi tạo đơn "Đã xác nhận" đều phải gọi cùng một quy trình tạo
   `stock_reservations`, không có luồng riêng cho từng kênh — đảm bảo
   `available_stock` luôn đúng bất kể nguồn đơn.
6. **Giá vốn ẩn với Sales/Kho:** thực hiện ở tầng API (field-level
   authorization theo role), không thể đảm bảo bằng schema.

---

## 6. Ngoài phạm vi Phân hệ 1 (thuộc phân hệ khác, chỉ tham chiếu)

- `orders`, `order_items`, `customers`, `commission_rules` → Phân hệ 2, 3.
- `roles`, `permissions`, `employee_contracts` → Phân hệ 3.
- `cash_receipts`, `cash_payments`, `accounting_periods` (khoá sổ kế toán)
  → Phân hệ 4. `purchase_receipts.total_amount` là **input** cho công nợ
  phải trả tính ở đây, việc thanh toán/khoá sổ nằm ở Phân hệ 4.
- Thanh toán, webhook VNPay/Momo → Phân hệ 2 + Nâng cao.

---

## 7. Tiêu chí nghiệm thu

- Nhập 1 phiếu 50 máy `is_serial_tracked` → tạo đúng 50 `product_serials`,
  1 `purchase_receipts`, 50 `stock_movements`, `physical_stock` +50,
  `average_import_price` được tính lại đúng công thức.
- Hai request xuất kho cùng lúc cho SKU chỉ còn 1 tồn khả dụng → chỉ 1
  request thành công, request kia bị từ chối (không tồn âm).
- Xuất kho sản phẩm `is_serial_tracked` mà không truyền `serial_id` → bị
  từ chối.
- Mở phiếu kiểm kê cho 1 kho → thử tạo `stock_movements` cho kho đó → bị
  chặn cho đến khi đóng phiếu.
- Đóng phiếu kiểm kê có dòng thiếu hàng nhưng chưa chọn `variance_reason`
  → bị từ chối.
- User role `sales` gọi API lấy chi tiết sản phẩm → response không chứa
  `last_import_price`, `average_import_price`.
- User chi nhánh A gọi API tồn kho → chỉ thấy kho thuộc chi nhánh A.
