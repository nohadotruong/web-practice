Dưới đây là tổng hợp các lệnh PostgreSQL (psql và SQL) phổ biến và thường dùng nhất, được phân loại theo từng nhóm chức năng:

### 1. Lệnh Quản trị hệ thống (Lệnh Meta / `psql`)

_Lưu ý: Các lệnh này gõ trực tiếp trong giao diện psql CLI (có dấu `\` ở đầu)._

- `\l` : Liệt kê tất cả các database.
- `\c name_db` : Kết nối (chuyển) sang database có tên `name_db`.
- `\dt` : Liệt kê tất cả các bảng (tables) trong database hiện tại.
- `\d name_table` : Xem cấu trúc chi tiết của bảng `name_table` (các cột, kiểu dữ liệu, ràng buộc).
- `\du` : Liệt kê danh sách các user/role và quyền hạn.
- `\dn` : Liệt kê các Schema.
- `\df` : Liệt kê các hàm (functions).
- `\q` : Thoát khỏi psql CLI.

---

### 2. Định nghĩa dữ liệu (DDL - Data Definition Language)

**Tạo & Xóa Database:**

```sql
CREATE DATABASE my_database;
DROP DATABASE my_database;

```

**Tạo bảng (Create Table):**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

**Sửa đổi bảng (Alter Table):**

```sql
-- Thêm cột mới
ALTER TABLE users ADD COLUMN age INT;

-- Xóa cột
ALTER TABLE users DROP COLUMN age;

-- Đổi tên cột
ALTER TABLE users RENAME COLUMN username TO full_name;

-- Thay đổi kiểu dữ liệu của cột
ALTER TABLE users ALTER COLUMN email TYPE VARCHAR(150);

```

**Xóa bảng (Drop / Truncate Table):**

```sql
DROP TABLE users; -- Xóa hoàn toàn bảng
TRUNCATE TABLE users; -- Xóa toàn bộ dữ liệu trong bảng nhưng giữ lại cấu trúc

```

---

### 3. Thao tác dữ liệu (DML - Data Manipulation Language)

**Thêm dữ liệu (Insert):**

```sql
INSERT INTO users (username, email)
VALUES ('nguyenvana', 'a@gmail.com');

-- Thêm nhiều bản ghi cùng lúc
INSERT INTO users (username, email)
VALUES
    ('tranvanb', 'b@gmail.com'),
    ('levanc', 'c@gmail.com');

```

**Cập nhật dữ liệu (Update):**

```sql
UPDATE users
SET email = 'new_a@gmail.com'
WHERE id = 1;

```

**Xóa dữ liệu (Delete):**

```sql
DELETE FROM users WHERE id = 1;

```

---

### 4. Truy vấn dữ liệu (DQL - Data Query Language)

**Truy vấn cơ bản:**

```sql
SELECT * FROM users;
SELECT username, email FROM users WHERE id > 5;

```

**Sắp xếp & Giới hạn:**

```sql
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;

```

**Gom nhóm & Thống kê (GROUP BY & HAVING):**

```sql
SELECT role, COUNT(*) as total_users
FROM users
GROUP BY role
HAVING COUNT(*) > 2;

```

**Kết hợp bảng (JOIN):**

```sql
SELECT orders.id, users.username, orders.amount
FROM orders
INNER JOIN users ON orders.user_id = users.id;

```

---

### 5. Quản lý phân quyền & User (DCL)

```sql
-- Tạo user mới có mật khẩu
CREATE USER new_user WITH PASSWORD 'secret_password';

-- Cấp toàn bộ quyền trên database cho user
GRANT ALL PRIVILEGES ON DATABASE my_database TO new_user;

-- Cấp quyền SELECT, INSERT trên bảng cụ thể
GRANT SELECT, INSERT ON users TO new_user;

-- Thu hồi quyền
REVOKE INSERT ON users FROM new_user;

-- Xóa user
DROP USER new_user;

```

---

### 6. Sao lưu & Phục hồi (Chạy trên Terminal/Bash OS, không chạy trong psql)

**Sao lưu (Backup/Export):**

```bash
# Backup toàn bộ database thành file .sql
pg_dump -U username -d my_database > backup.sql

# Backup định dạng custom (nén tốt hơn)
pg_dump -F c -U username -d my_database > backup.dump

```

**Phục hồi (Restore/Import):**

```bash
# Restore từ file .sql
psql -U username -d my_database < backup.sql

# Restore từ file .dump
pg_restore -U username -d my_database backup.dump

```
