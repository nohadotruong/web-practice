Dưới đây là tổng hợp đầy đủ các quy tắc khai báo, kiểu dữ liệu, khóa chính, khóa ngoại, unique, nullability và các mối quan hệ (1-1, 1-N, N-N) chuẩn cú pháp **SQLAlchemy 2.0 (Declarative Style)** để bạn áp dụng chuẩn xác nhất vào code của mình.

---

### 1. Khai báo Khóa chính (Primary Key) & Tự động tăng (Autoincrement)

```python
# Single Primary Key (Cơ bản)
id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

# Composite Primary Key (Khóa chính kết hợp từ nhiều cột)
class OrderItem(Base):
    __tablename__ = "order_items"
    
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), primary_key=True)

```

---

### 2. Nullable (Cho phép NULL / NOT NULL)

Trong SQLAlchemy 2.0, thuộc tính **`nullable` được tự động suy luận từ Python Type Hinting (`Optional` hoặc `| None`)**:

```python
# NOT NULL (Bắt buộc nhập): Không dùng Optional trong Mapped[...]
name: Mapped[str] = mapped_column(String(255)) 

# NULLABLE (Có thể để trống): Dùng Optional[...] hoặc str | None
ean: Mapped[Optional[str]] = mapped_column(String(13))
# HOẶC cú pháp Python 3.10+:
ean: Mapped[str | None] = mapped_column(String(13))

# Bạn vẫn có thể khai báo tường minh nullable=True/False nếu muốn:
bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

```

---

### 3. Khai báo Ràng buộc Unique & Index

```python
# Unique trên 1 cột đơn lẻ
sku: Mapped[str] = mapped_column(String(50), unique=True, index=True)

# Unique / Index kết hợp nhiều cột (Khai báo trong __table_args__)
from sqlalchemy import UniqueConstraint, Index

class Inventory(Base):
    __tablename__ = "inventories"
    __table_args__ = (
        UniqueConstraint("product_id", "warehouse_id", name="uq_product_warehouse"),
        Index("idx_product_warehouse", "product_id", "warehouse_id"),
    )
    
    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
    warehouse_id: Mapped[int] = mapped_column(ForeignKey("warehouses.id"))

```

---

### 4. Sửa lỗi Kiểu dữ liệu Tiền tệ (`Decimal` vs `float`)

Trong SQLAlchemy, khi dùng cột `Decimal(12, 2)` (hoặc `Numeric`), **kiểu Python tương ứng phải là `Decimal` (từ thư viện chuẩn `decimal`), không phải `float**` để tránh sai số dấu phẩy động:

```python
from decimal import Decimal

class Product(Base):
    __tablename__ = "products"
    
    # Đúng chuẩn: Type Hint là Decimal tương ứng với Numeric/Decimal trong DB
    cost_price: Mapped[Decimal] = mapped_column(Decimal(12, 2), nullable=False)
    selling_price: Mapped[Decimal] = mapped_column(Decimal(12, 2), nullable=False)

```

---

### 5. Định nghĩa Quan hệ (Relationships)

#### A. Quan hệ 1 - N (One-to-Many / Many-to-One)

*Ví dụ: 1 Sản phẩm có Nhiều mục Tồn kho (1 Product -> N Inventories)*

```python
# Bên 1 (Product)
class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Khai báo danh sách các items con
    inventory_items: Mapped[List["Inventory"]] = relationship(back_populates="product")

# Bên N (Inventory)
class Inventory(Base):
    __tablename__ = "inventories"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Khóa ngoại
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    
    # Khai báo đối tượng cha
    product: Mapped["Product"] = relationship(back_populates="inventory_items")

```

---

#### B. Quan hệ 1 - 1 (One-to-One)

*Ví dụ: 1 User có 1 Profile cá nhân*

> **Bản chất:** Là quan hệ 1-N nhưng phía bên đối tượng đơn lẻ thêm ràng buộc `unique=True` ở khóa ngoại và không dùng `List[...]`.

```python
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Chỉ chứa 1 Profile (Không dùng List)
    profile: Mapped[Optional["UserProfile"]] = relationship(back_populates="user", uselist=False)

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Khóa ngoại phải có unique=True để đảm bảo chỉ có 1-1
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    
    user: Mapped["User"] = relationship(back_populates="profile")

```

---

#### C. Quan hệ N - N (Many-to-Many)

Có 2 cách triển khai quan hệ Nhiều - Nhiều:

##### Cách 1: Sử dụng Bảng trung gian đơn thuần (Association Table - Không có extra data)

*Ví dụ: Sản phẩm (Product) có nhiều Nhãn (Tag), 1 Tag gán cho nhiều Product.*

```python
from sqlalchemy import Table, Column

# Bảng trung gian (Association Table)
product_tag = Table(
    "product_tag",
    Base.metadata,
    Column("product_id", ForeignKey("products.id"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id"), primary_key=True),
)

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    tags: Mapped[List["Tag"]] = relationship(secondary=product_tag, back_populates="products")

class Tag(Base):
    __tablename__ = "tags"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    
    products: Mapped[List["Product"]] = relationship(secondary=product_tag, back_populates="tags")

```

##### Cách 2: Sử dụng Bảng liên kết chứa thêm thuộc tính (Association Object - Bảng trung gian là 1 Model)

*Ví dụ chuẩn theo đoạn code của bạn: Đơn hàng (`Order`) - Chi tiết đơn hàng (`OrderItem`) - Sản phẩm (`Product`). Bản thân `OrderItem` là bảng trung gian nhưng chứa thêm `quantity` và `unit_price`.*

```python
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Kết nối đến bảng trung gian OrderItem
    items: Mapped[List["OrderItem"]] = relationship(back_populates="order")

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Kết nối đến bảng trung gian OrderItem
    order_items: Mapped[List["OrderItem"]] = relationship(back_populates="product")

# Bảng trung gian chứa thông tin bổ sung (quantity, unit_price)
class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[Decimal] = mapped_column(Decimal(12, 2), nullable=False)

    # Relationships về 2 đầu
    order: Mapped["Order"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship(back_populates="order_items")

```

---

### Summary Checklist khi khai báo Model 2.0:

1. Luôn dùng `Mapped[Kiểu_Python]` kết hợp `mapped_column(Kiểu_SQLAlchemy, ...)`
2. Dùng `Decimal` (từ `decimal`) cho giá trị tiền tệ thay vì `float`.
3. Với quan hệ danh sách (1-N hoặc N-N), dùng `Mapped[List["ModelName"]]`.
4. Với quan hệ đơn (N-1 hoặc 1-1), dùng `Mapped["ModelName"]` hoặc `Mapped[Optional["ModelName"]]`.