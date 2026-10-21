```markdown
# 📱 MobileMart – Website Bán Điện Thoại Trực Tuyến

Đây là một ứng dụng web thương mại điện tử cho phép người dùng xem và mua điện thoại trực tuyến. Dự án được xây dựng với ReactJS (frontend), NodeJS + Express (backend) và PostgreSQL (cơ sở dữ liệu).

---

## 🚀 Tính năng

### 👤 Người dùng

- Xem danh sách điện thoại theo hãng, giá, cấu hình
- Xem chi tiết sản phẩm
- Thêm vào giỏ hàng và đặt hàng
- Đăng ký / Đăng nhập (bằng JWT)
- Xem lịch sử đơn hàng

### 🛠 Quản trị viên (Admin)

- Quản lý sản phẩm (thêm/sửa/xoá)
- Quản lý người dùng
- Quản lý đơn hàng
- Xem thống kê đơn hàng

---

## 🧰 Công nghệ sử dụng

| Thành phần    | Công nghệ                        |
| ------------- | -------------------------------- |
| Frontend      | ReactJS, Bootstrap               |
| Backend       | NodeJS, Express                  |
| Cơ sở dữ liệu | PostgreSQL                       |
| Xác thực      | JWT (JSON Web Token)             |
| Triển khai    | Vercel (FE), Railway/Render (BE) |

---

## 📁 Cấu trúc thư mục

project-root/
│
├── client/ # Giao diện người dùng (React)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── ...
│
├── server/ # Server ExpressJS
│ ├── db/
│ ├── index.js
│ └── ...
```

---

## ⚙️ Hướng dẫn cài đặt

### 1. Clone project

```bash
git clone https://github.com/ten-cua-ban/mobilemart.git
cd mobilemart
```

### 2. Cài đặt Backend

```bash
cd server
npm install
cp .env.example .env
# Cập nhật thông tin DB vào .env
npm start
```

### 3. Cài đặt Frontend

```bash
cd client
npm install
npm start
```

> Frontend chạy tại: [http://localhost:3000](http://localhost:3000)
> Backend chạy tại: [http://localhost:5000](http://localhost:5000)

---

```

```
