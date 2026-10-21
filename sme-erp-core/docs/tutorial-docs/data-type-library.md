Dưới đây là tổng hợp toàn bộ các thư viện/module cần thiết để khai báo các kiểu dữ liệu, các quan hệ (relationship) và cấu trúc bảng đầy đủ cho ví dụ của bạn:

```python
import enum
from datetime import datetime, date, time
from decimal import Decimal
from typing import List, Optional

# 1. Các thành phần lõi của SQLAlchemy ORM (dùng cho Declarative 2.0)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
)

# 2. Các kiểu dữ liệu phổ biến của SQLAlchemy (SQL Types)
from sqlalchemy import (
    # Kiểu số
    Integer,
    BigInteger,
    SmallInteger,
    Numeric,
    Decimal,  # Hoặc dùng Float
    Float,
    Boolean,
    # Chuỗi / Văn bản
    String,
    Text,
    CHAR,
    # Ngày tháng / Thời gian
    DateTime,
    Date,
    Time,
    # Quan hệ & Khóa
    ForeignKey,
    # Enum & Khác
    Enum,
    JSON,
    BLOB,  # Hoặc LargeBinary
    # Hàm SQL (Ví dụ: func.now())
    func,
)

```

### Điểm lưu ý quan trọng về Import:

1. **`Decimal`**: Khi làm việc với tiền tệ hoặc số thập phân chính xác, bạn import `Decimal` từ thư viện chuẩn `decimal` của Python (`from decimal import Decimal`) để type-hinting trong `Mapped[...]`. Trong SQLAlchemy, kiểu dữ liệu tương ứng là `Numeric` hoặc `Decimal`.
2. **`Enum`**: `enum.Enum` từ Python dùng để định nghĩa enum class, còn `Enum` từ `sqlalchemy` dùng làm kiểu dữ liệu cột trong DB.