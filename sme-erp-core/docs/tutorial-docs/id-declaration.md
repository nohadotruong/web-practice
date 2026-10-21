Trong thiết kế cơ sở dữ liệu và SQLAlchemy 2.0, **ID (Primary Key)** thường được chia thành 2 nhóm chính: **Dạng số tự tăng (Numeric Auto-Increment)** và **Dạng chuỗi ngẫu nhiên / Định danh duy nhất (Random String / UUID / ULID)**.

Dưới đây là tổng hợp đầy đủ các kiểu khai báo ID phổ biến nhất kèm ưu/nhược điểm và đoạn code mẫu chuẩn SQLAlchemy 2.0.

---

### 1. Dạng Số Nguyên Tự Tăng (Auto-Increment Integer)

Đây là kiểu mặc định phổ biến nhất. Database sẽ tự động cấp phát ID dạng số đếm tăng dần ($1, 2, 3, ...$).

#### A. `Integer` Tự tăng (32-bit: tối đa ~2.1 tỷ bản ghi)

* Phù hợp cho hầu hết các bảng dữ liệu vừa và nhỏ.

```python
id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

```

#### B. `BigInteger` Tự tăng (64-bit: tối đa ~$9 \times 10^{18}$ bản ghi)

* Khuyên dùng cho các hệ thống lớn, bảng log, transaction hoặc bảng sẽ tích lũy dữ liệu rất nhanh (tránh bị tràn số/out of bounds).

```python
from sqlalchemy import BigInteger

id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)

```

> **Ưu điểm:** Tối ưu hiệu năng index (B-Tree), dung lượng lưu trữ nhẹ, truy vấn nhanh.
> **Nhược điểm:** Dễ bị lộ quy mô dữ liệu (đoán được tổng số đơn hàng/user) và dễ bị thu thập dữ liệu tự động (Crawl) nếu lộ ID trên URL (ví dụ: `/orders/1`, `/orders/2`).

---

### 2. Dạng Chuỗi Ngẫu Nhiên & Định Danh Duy Nhất (String / UUID / ULID)

Giúp ẩn quy mô dữ liệu, an toàn khi đưa lên URL, và tuyệt vời cho hệ thống phân tán (Microservices/Distributed Systems) vì có thể sinh ID ở phía Application mà không sợ trùng.

#### A. `UUID v4` (Ngẫu nhiên hoàn toàn)

* Tạo chuỗi 36 ký tự (Ví dụ: `c9bf9e57-1685-4c89-bafb-ff5af830be8a`).

```python
import uuid
from sqlalchemy import String

class Product(Base):
    __tablename__ = "products"

    # Dùng String(36) lưu dạng text
    id: Mapped[str] = mapped_column(
        String(36), 
        primary_key=True, 
        default=lambda: str(uuid.uuid4())
    )

```

*(Nếu dùng PostgreSQL, bạn có thể dùng kiểu `UUID` native của DB bằng `from sqlalchemy.dialects.postgresql import UUID`)*.

#### B. `UUID v7` (Sắp xếp được theo thời gian)

* Khắc phục điểm yếu phân mảnh index của UUID v4 bằng cách kết hợp **Timestamp (ở đầu) + Random (ở cuối)**. Giúp DB index cực kỳ nhanh tương tự số tự tăng.
*(Yêu cầu Python 3.12+ hoặc thư viện `uuid6`)*:

```python
import uuid # Python 3.12+ hỗ trợ uuid.uuid7()

id: Mapped[str] = mapped_column(
    String(36), 
    primary_key=True, 
    default=lambda: str(uuid.uuid7())
)

```

#### C. `ULID` (Universally Unique Lexicographically Sortable Identifier)

* Tương tự UUID v7 nhưng ngẫu nhiên chuẩn base32, ngắn gọn hơn (chỉ 26 ký tự) và **không có dấu gạch ngang** (Ví dụ: `01ARZ3NDEKTSV4RRFFQ69G5FAV`).

```python
# Cần cài thư viện: pip install ulid-py
from ulid import ULID

id: Mapped[str] = mapped_column(
    String(26), 
    primary_key=True, 
    default=lambda: str(ULID())
)

```

#### D. Chuỗi Ngẫu Nhiên Ngắn Khác (Random String Custom / Prefixed ID)

* Thường dùng khi muốn thêm **Tiền tố (Prefix)** để phân biệt bảng dữ liệu (Ví dụ: Đơn hàng là `ORD-8f9x2a`, Khách hàng là `CUST-k3m9z1`).

```python
import secrets

def generate_custom_id(prefix: str = "ORD") -> str:
    # Sinh chuỗi ngẫu nhiên 8 ký tự Hex
    random_str = secrets.token_hex(4)
    return f"{prefix}-{random_str}"

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[str] = mapped_column(
        String(20), 
        primary_key=True, 
        default=lambda: generate_custom_id("ORD")
    )

```

---

### Bảng So Sánh Quick-Reference

| Loại ID | Dạng dữ liệu DB | Kích thước lưu trữ | Tính an toàn (Bảo mật URL) | Đánh Index / Hiệu năng |
| --- | --- | --- | --- | --- |
| **Integer / BigInt** | `Integer` / `BigInt` | $4 - 8$ bytes | ❌ Thấp (Dễ bị đoán) | ⚡ Rất nhanh |
| **UUID v4** | `String(36)` / `UUID` | $16 - 36$ bytes | ✅ Rất cao | ⚠️ Chậm dần khi dữ liệu lớn (Phân mảnh index) |
| **UUID v7 / ULID** | `String(26-36)` | $16 - 36$ bytes | ✅ Rất cao | ⚡ Nhanh (Sắp xếp theo thời gian) |
| **Prefixed String** | `String(N)` | Tùy độ dài | ✅ Cao | 🟡 Trung bình |

### Lời khuyên chọn lựa:

* **Mặc định / Nội bộ (Internal):** Dùng **`BigInteger` tự tăng**.
* **Đơn hàng / Giao dịch / API Public (Cần an toàn & hiệu năng):** Dùng **`UUID v7`** hoặc **`ULID`**.
* **Cần mã hiển thị thân thiện người dùng:** Dùng **Prefixed String** (Ví dụ: `INV-2026-0001`).