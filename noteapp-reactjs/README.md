# 📝 Note App

Ứng dụng ghi chú đơn giản được xây dựng bằng ReactJS.

## 🚀 Tính năng

- 📄 Thêm, sửa, xoá ghi chú
- 📋 Hiển thị danh sách ghi chú theo bảng
- ✅ Giao diện hiện đại, responsive với Bootstrap 5
- 🔁 Cập nhật tự động khi thao tác thêm/sửa/xoá thành công

## 🏗️ Cấu trúc thư mục

```
NOTE-APP/
├── client/                         # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── api/                   # Gọi API backend
│   │   │   └── notes.js
│   │   ├── components/           # Tái sử dụng được
│   │   │   ├── NoteForm/
│   │   │   │   ├── NoteForm.jsx     # Component chính
│   │   │   │   └── NoteForm.css    # CSS riêng (nếu có)
│   │   │   ├── NoteTable/
│   │   │   │   ├── NoteTable.jsx
│   │   │   │   └── NoteTable.css
│   │   ├── pages/                # Mỗi route là 1 page
│   │   │   ├── Detail/
│   │   │   │   ├── Detail.jsx 
│   │   │   │   └── Detail.css
│   │   │   └── Home/
│   │   │       ├── Home.jsx
│   │   │       └── Home.css
│   │   ├── App.jsx               # Gốc app
│   │   ├── index.js              # Entry file
│   │   └── index.css             # Global style
│   ├── package.json
│   └── .gitignore
│
├── server/                        # Backend (Node.js + Express)
│   ├── db/
│   │   ├── init.sql              # Script tạo bảng
│   │   └── index.js              # Kết nối DB
│   ├── repositories/            # Xử lý nghiệp vụ, tách DB query
│   │   └── NoteRepository.js
│   ├── routes/                  # Các API routes
│   │   └── notes.js
│   ├── index.js                 # Entry backend (Express server)
│   ├── .env                     # Biến môi trường
│   ├── package.json
│   └── .gitignore
│
└── README.md                    # Tài liệu mô tả dự án
```

## 🔧 Công nghệ sử dụng

### 🖥️ Frontend

- ReactJS
- React Router v6
- Bootstrap 5

### 🗄️ Backend

- Node.js + Express
- PostgreSQL (thông qua pg module)
- RESTful API

### ⚙️ Khác

- Dotenv (quản lý biến môi trường)
- Cấu trúc MVC: routes, repository, database

## ▶️ Khởi động nhanh

```bash
# Cài dependencies cho backend
cd server
npm install

# Khởi động server backend (cổng 5000)
npm start

# Cài dependencies cho frontend
cd client
npm install

# Khởi động frontend React (cổng 3000)
npm start

```

Truy cập ứng dụng tại: [http://localhost:3000](http://localhost:3000)

## 🛠️ Các script có sẵn

| Script          | Mô tả                                    |
| --------------- | ---------------------------------------- |
| `npm start`     | Chạy ứng dụng ở chế độ phát triển        |
| `npm run build` | Build ứng dụng cho môi trường production |
| `npm test`      | Chạy unit tests (nếu có)                 |

## 🧠 Kiến thức áp dụng

- React Hooks: `useState`, `useEffect`
- Tư duy component hóa
- Giao tiếp client ↔ server (axios/fetch)
- Routing với `react-router-dom`
- Xử lý form và gọi lại dữ liệu sau thao tác CRUD

## 🤖 Hỗ trợ

Dự án được hỗ trợ bởi [ChatGPT](https://openai.com/chatgpt) – công cụ trợ lý AI giúp tăng tốc phát triển phần mềm, cải thiện code và tối ưu trải nghiệm người dùng.
