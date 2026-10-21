# 📖 Website Tiệm Sách (Cho thuê – Mượn – Mua bán)

## 🟢 Giai đoạn 1: Cơ bản

### 🎯 Mục tiêu

Xây dựng hệ thống web cơ bản gồm **Frontend + Backend**, hiển thị danh mục sách, tìm kiếm, lọc sách theo tên, thể loại, tác giả.

---

## 🚀 Chức năng

- **Trang giới thiệu cửa hàng**
- **Danh mục sách** từ backend API
- **Tìm kiếm & Lọc sách** theo tên, thể loại, tác giả

---

## 🛠️ Công nghệ

### Backend

- FastAPI, Uvicorn
- SQLAlchemy, psycopg2-binary
- python-dotenv

### Frontend

- ReactJS, Axios, React Router DOM
- TailwindCSS hoặc Bootstrap
- Bootstrap Icons

---

## 📂 Cấu trúc dự án

```

bookstore/
│── server/ # Backend (FastAPI)
│ ├── main.py
│ ├── models/
│ ├── routes/
│ ├── database/
│ └── requirements.txt
│
│── client/ # Frontend (React)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.js
│
│── README.md
│── GUIDE.md

```

👉 Xem chi tiết cài đặt trong [GUIDE.md](./GUIDE.md)

---

## 📌 Kế hoạch mở rộng

### 🟢 Giai đoạn 1 (Cơ bản)

- Giao diện website giới thiệu cửa hàng
- Danh mục sách (hiển thị danh sách từ JSON hoặc database)
- Chức năng tìm kiếm và lọc sách theo tên, thể loại, tác giả

---

### 🟡 Giai đoạn 2 (Trung bình – có backend)

- Hệ thống tài khoản người dùng (đăng ký/đăng nhập)
- Quản lý sách: CRUD (thêm/sửa/xóa)
- Phân quyền: **Admin** (quản lý sách, đơn hàng), **User** (xem và đặt)
- Tích hợp giỏ hàng (cho mua sách)
- Chức năng “đăng ký mượn sách” hoặc “thuê sách” (ghi nhận thời gian mượn/trả)

---

### 🔵 Giai đoạn 3 (Nâng cao)

- Tích hợp thanh toán online (mua sách)
- Quản lý mượn sách: thông báo hạn trả (email hoặc thông báo web)
- Ghi nhận lịch sử mượn/mua
- Upload ảnh bìa, mô tả chi tiết sách
- Dashboard thống kê: số lượng sách, số lượt mượn/mua

---

### 🔴 Giai đoạn 4 (Rất nâng cao – nếu muốn làm đồ án chất lượng cao)

- Hệ thống gợi ý sách dựa trên lịch sử mượn/mua
- Chatbot tư vấn tìm sách nhanh
- Cho phép người dùng review, đánh giá, bình luận sách
- Tích hợp API Google Books để cập nhật thông tin sách tự động
- Triển khai online (Heroku, Vercel, AWS, hoặc Firebase Hosting)
