# 🍽️ Website Quản lý Nhà hàng Buffet

## 🎥 Video Demo

[![Watch the video](https://img.youtube.com/vi/zaQs5uHJhKA/0.jpg)](https://youtu.be/zaQs5uHJhKA)

---

## ✨ Chức năng

### 👨‍💼 Quản lý

- Quản lý bàn ăn (thêm/sửa/xóa/trạng thái)
- Quản lý vé ăn
- Quản lý hóa đơn
- Quản lý nhân viên & phân quyền

### 💰 Thu ngân

- Check-in & Check-out khách
- Thanh toán & xuất hóa đơn

---

## 🛠 Công nghệ sử dụng

- **Frontend:** React, Bootstrap
- **Backend:** NodeJS/Express, PostgreSQL

---

## ⚡ Hướng dẫn cài đặt và chạy

### 1️⃣ Clone dự án

```
git clone https://github.com/LongTruongPhamHai/buffet-management-system.git
cd buffet-management-system
```

### 2️⃣ Cài đặt và chạy Frontend

```
cd client
npm install     # Cài thư viện
npm start       # Chạy frontend (http://localhost:3000)
```

### 3️⃣ Cài đặt và chạy Backend

```
cd ../server
npm install      # Cài thư viện
npx nodemon index.js  # Chạy backend (http://localhost:5000)
```

---

## 📂 Cấu trúc thư mục

```
buffet-management-system/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── Invoices/
│   │   │   ├── Layouts/
│   │   │   ├── Revenues/
│   │   │   ├── Tables/
│   │   │   ├── Tickets/
│   │   │   └── Users/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   └── Login/
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package-lock.json
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📡 API chính

### 🪑 Bàn ăn

- `GET /tables/:seating_cap/:status` → Lấy danh sách bàn theo sức chứa & trạng thái

### 🎫 Vé ăn

- `GET /tickets` → Lấy danh sách vé ăn

### 🧾 Hóa đơn

- `POST /invoices` → Tạo hóa đơn
- `GET /invoice_details/by-invoice/:id` → Lấy chi tiết hóa đơn

### 👤 Nhân viên

- `GET /users/by-role/:role` → Lấy danh sách nhân viên theo chức vụ

_(… và nhiều API khác)_

---

## 👤 Tác giả

- **Long Trương Phạm Hải** – [GitHub](https://github.com/LongTruongPhamHai)

---
