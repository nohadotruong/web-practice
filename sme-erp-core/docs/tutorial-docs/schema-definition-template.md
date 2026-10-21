Khi sử dụng **FastAPI**, cách chuẩn nhất để định nghĩa Schema DB là sử dụng **SQLAlchemy 2.0 Models** (ORM) kết hợp với **Pydantic Schemas** (Data validation & Serialization).

Bạn chỉ cần gửi cho tôi **SQLAlchemy Models** (file `models.py`) hoặc file **Pydantic Schemas**. Tôi sẽ kiểm tra được đầy đủ các quan hệ (relationships), khóa chính/ngoại, kiểu dữ liệu, các chỉ số Index, và cả cách bạn ràng buộc dữ liệu đầu vào.

---

### Mẫu định nghĩa Schema bằng SQLAlchemy 2.0 (Khuyên dùng)

Dưới đây là ví dụ chuẩn mực cấu trúc bảng bằng SQLAlchemy v2 để bạn tham khảo cách viết và gửi cho tôi:

```python
import enum
from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Integer, Decimal, DateTime, ForeignKey, Enum, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

# Base class cho toàn bộ models
class Base(DeclarativeBase):
    pass

# Enum cho trạng thái đơn hàng (Quy tắc nghiệp vụ OMS)
class OrderStatus(str, enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    SHIPPING = "SHIPPING"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

# 1. Bảng Sản phẩm (Product Master)
class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    sku: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    ean: Mapped[Optional[str]] = mapped_column(String(13), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    
    cost_price: Mapped[float] = mapped_column(Decimal(12, 2), nullable=False) # Giá nhập
    selling_price: Mapped[float] = mapped_column(Decimal(12, 2), nullable=False) # Giá bán
    floor_price: Mapped[float] = mapped_column(Decimal(12, 2), nullable=False) # Giá sàn
    
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    # Relationships
    inventory_items: Mapped[List["Inventory"]] = relationship(back_populates="product")
    order_items: Mapped[List["OrderItem"]] = relationship(back_populates="product")

# 2. Bảng Tồn kho (Inventory)
class Inventory(Base):
    __tablename__ = "inventories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    
    physical_stock: Mapped[int] = mapped_column(Integer, default=0) # Tồn thực tế
    available_stock: Mapped[int] = mapped_column(Integer, default=0) # Tồn khả dụng
    safety_stock: Mapped[int] = mapped_column(Integer, default=10) # Ngưỡng cảnh báo

    # Relationships
    product: Mapped["Product"] = relationship(back_populates="inventory_items")

# 3. Bảng Chi tiết Đơn hàng (OrderItem)
class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[float] = mapped_column(Decimal(12, 2), nullable=False)

    # Relationships
    product: Mapped["Product"] = relationship(back_populates="order_items")

```

---

### Mẫu định nghĩa bằng SQLModel (Nếu bạn thích viết gọn)

Nếu dự án của bạn sử dụng **SQLModel** (thư viện kết hợp giữa Pydantic + SQLAlchemy do chính tác giả FastAPI phát triển), bạn có thể viết như sau:

```python
from typing import Optional, List
from decimal import Decimal
from sqlmodel import SQLModel, Field, Relationship

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sku: str = Field(index=True, unique=True, max_length=50)
    ean: Optional[str] = Field(default=None, index=True, unique=True, max_length=13)
    name: str
    cost_price: Decimal = Field(max_digits=12, decimal_places=2)
    selling_price: Decimal = Field(max_digits=12, decimal_places=2)
    floor_price: Decimal = Field(max_digits=12, decimal_places=2)

```

---

### Cách thức gửi cho tôi để kiểm tra

Khi bạn chuẩn bị xong code SQLAlchemy models cho các bảng của dự án, bạn hãy paste trực tiếp đoạn code đó vào chat kèm theo một vài chú thích nhỏ:

1. **Cơ sở dữ liệu thực tế sẽ dùng:** (Ví dụ: `PostgreSQL` hoặc `MySQL`).
2. **Những phần nghiệp vụ bạn muốn tôi soi kỹ:** (Ví dụ: *"Kiểm tra giúp tôi bảng IMEI/Serial kết nối với Đơn hàng đã ổn chưa?"*, *"Cách lưu Lịch sử giao dịch kho như vậy có bị ghi đè dữ liệu không?"*).

Tôi sẽ đối soát từng bảng, từng mối quan hệ `ForeignKey`, kiểu dữ liệu tiền tệ `Decimal`, và tính toàn vẹn nghiệp vụ (ACID) giúp bạn ngay lập tức!