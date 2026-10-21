Dưới đây là danh sách đầy đủ các kiểu dữ liệu tích hợp sẵn (built-in data types) trong PostgreSQL, được phân loại theo nhóm chức năng:

---

### 1. Kiểu số (Numeric Types)

| Kiểu dữ liệu                      | Kích thước | Mô tả                                                     | Phạm vi                                                           |
| --------------------------------- | ---------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| **`SMALLINT`**                    | 2 bytes    | Số nguyên nhỏ                                             | -32,768 đến +32,767                                               |
| **`INTEGER` / `INT**`             | 4 bytes    | Số nguyên phổ biến                                        | -2,147,483,648 đến +2,147,483,647                                 |
| **`BIGINT`**                      | 8 bytes    | Số nguyên lớn                                             | Khoảng -9 $\times 10^{18}$ đến +9 $\times 10^{18}$                |
| **`DECIMAL` / `NUMERIC**`         | Linh hoạt  | Số thực chính xác tuyệt đối (dùng cho tiền tệ, tài chính) | Lên tới 131,072 chữ số trước dấu phẩy, 16,383 chữ số sau dấu phẩy |
| **`REAL` / `FLOAT4**`             | 4 bytes    | Số thực dấu chấm động (độ chính xác không tuyệt đối)      | 6 chữ số thập phân chính xác                                      |
| **`DOUBLE PRECISION` / `FLOAT8**` | 8 bytes    | Số thực dấu chấm động chính xác đôi                       | 15 chữ số thập phân chính xác                                     |
| **`SMALLSERIAL`**                 | 2 bytes    | Số nguyên tự tăng                                         | 1 đến 32,767                                                      |
| **`SERIAL`**                      | 4 bytes    | Số nguyên tự tăng                                         | 1 đến 2,147,483,647                                               |
| **`BIGSERIAL`**                   | 8 bytes    | Số nguyên tự tăng lớn                                     | 1 đến 9223372036854775807                                         |

---

### 2. Kiểu chuỗi / Ký tự (Character Types)

| Kiểu dữ liệu                   | Mô tả                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| **`VARCHAR(n)`**               | Chuỗi có độ dài biến đổi, tối đa `n` ký tự.                                           |
| **`CHAR(n)` / `CHARACTER(n)**` | Chuỗi có độ dài cố định `n` ký tự (tự thêm khoảng trắng nếu ngắn hơn).                |
| **`TEXT`**                     | Chuỗi có độ dài bất kỳ (tối đa ~1 GB per value). **Khuyên dùng nhất trong Postgres.** |

---

### 3. Kiểu Ngày & Giờ (Date/Time Types)

| Kiểu dữ liệu      | Kích thước | Mô tả                                       |
| ----------------- | ---------- | ------------------------------------------- |
| **`TIMESTAMP`**   | 8 bytes    | Ngày và giờ (không có múi giờ).             |
| **`TIMESTAMPTZ`** | 8 bytes    | Ngày và giờ (có múi giờ - **Khuyên dùng**). |
| **`DATE`**        | 4 bytes    | Chỉ lưu ngày (`YYYY-MM-DD`).                |
| **`TIME`**        | 8 bytes    | Chỉ lưu giờ (không múi giờ).                |
| **`TIMETZ`**      | 12 bytes   | Chỉ lưu giờ (có múi giờ).                   |
| **`INTERVAL`**    | 16 bytes   | Khoảng thời gian (ví dụ: `3 days 4 hours`). |

---

### 4. Kiểu Boolean (Logic)

| Kiểu dữ liệu           | Kích thước | Giá trị chấp nhận                                                                    |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------ |
| **`BOOLEAN` / `BOOL**` | 1 byte     | `TRUE` / `FALSE` / `NULL` (chấp nhận cả `'t'`, `'f'`, `'1'`, `'0'`, `'yes'`, `'no'`) |

---

### 5. Kiểu dữ liệu Chuỗi định dạng JSON (JSON Types)

| Kiểu dữ liệu | Mô tả                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------- |
| **`JSON`**   | Lưu văn bản JSON nguyên bản (giữ nguyên khoảng trắng, thứ tự key). Truy vấn chậm hơn `JSONB`. |
| **`JSONB`**  | Lưu JSON dưới dạng nhị phân đã qua xử lý. **Nhanh hơn, hỗ trợ đánh Index, khuyên dùng.**      |

---

### 6. Kiểu dữ liệu Mạng (Network Address Types)

| Kiểu dữ liệu   | Mô tả                                                | Ví dụ                     |
| -------------- | ---------------------------------------------------- | ------------------------- |
| **`INET`**     | Địa chỉ IPv4 hoặc IPv6 cùng với subnet mask tùy chọn | `192.168.1.1/24`          |
| **`CIDR`**     | Mạng IPv4 hoặc IPv6 (Network specifier)              | `10.0.0.0/8`              |
| **`MACADDR`**  | Địa chỉ MAC (Media Access Control)                   | `08:00:2b:01:02:03`       |
| **`MACADDR8`** | Địa chỉ MAC định dạng EUI-64 (8 bytes)               | `08-00-2b-01-02-03-04-05` |

---

### 7. Kiểu dữ liệu Nhị phân (Binary Data Types)

| Kiểu dữ liệu | Mô tả                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| **`BYTEA`**  | Mảng bytes dùng để lưu dữ liệu nhị phân (hình ảnh, file, dữ liệu mã hóa). |

---

### 8. Kiểu Định danh duy nhất (UUID)

| Kiểu dữ liệu | Kích thước | Mô tả                                                                                                              |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| **`UUID`**   | 16 bytes   | Lưu mã định danh duy nhất toàn cầu (Universally Unique Identifier). Ví dụ: `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`. |

---

### 9. Kiểu Hình học (Geometric Types)

Dùng để mô tả các hình thể phẳng $2D$:

- **`POINT`** : Điểm trên mặt phẳng `(x, y)`
- **`LINE`** : Đường thẳng vô hạn $\{A, B, C\}$
- **`LSEG`** : Đoạn thẳng `((x1,y1), (x2,y2))`
- **`BOX`** : Hình chữ nhật `((x1,y1), (x2,y2))`
- **`PATH`** : Đường dẫn mở hoặc đóng
- **`POLYGON`** : Đa giác
- **`CIRCLE`** : Hình tròn `<(x,y), r>`

---

### 10. Kiểu Mảng & Cấu trúc (Array & Composite Types)

- **`ARRAY`**: PostgreSQL cho phép khai báo **mảng** cho bất kỳ kiểu dữ liệu cơ bản nào.
- Ví dụ: `INTEGER[]` (Mảng số nguyên), `TEXT[]` (Mảng chuỗi).

- **Composite Types**: Kiểu dữ liệu tự định nghĩa gồm nhiều trường họp lại (tương tự như một `struct` trong lập trình).

---

### 11. Kiểu Tìm kiếm văn bản (Text Search Types)

Dùng cho tính năng Full-Text Search tối ưu trong Postgres:

- **`TSVECTOR`**: Lưu danh sách các từ đã được chuẩn hóa (lexemes) để tìm kiếm.
- **`TSQUERY`**: Lưu các truy vấn tìm kiếm logic (`AND`, `OR`, `NOT`).

---

### 12. Kiểu Phạm vi & Đa phạm vi (Range & Multirange Types)

Dùng để biểu diễn một khoảng giá trị từ điểm đầu đến điểm cuối:

- **`INT4RANGE` / `INT8RANGE**`: Khoảng số nguyên (`[1, 10)`).
- **`NUMRANGE`**: Khoảng số thực.
- **`TSRANGE` / `TSTZRANGE**`: Khoảng thời gian (Timestamp).
- **`DATERANGE`**: Khoảng ngày tháng.
- **Multirange** (từ Postgres 14+): Dạng tập hợp của nhiều Range không liên tục (`INT4MULTIRANGE`, `DATEMULTIRANGE`,...).

---

### 13. Các kiểu đặc biệt khác

- **`BIT(n)` / `BIT VARYING(n)**`: Chuỗi các bit nhị phân (`0`và`1`).
- **`MONEY`**: Lưu giá trị tiền tệ (có ký tự tiền tệ đi kèm, phụ thuộc vào cài đặt locale).
- **`XML`**: Kiểm tra tính hợp lệ của dữ liệu XML.
- **`OID`** (Object Identifier): Mã định danh nội bộ do Postgres sử dụng để quản lý bảng, cột, hàm,...
- **`PG_LSN`**: Lưu thông tin Log Sequence Number (dùng cho Replication và WAL log).
