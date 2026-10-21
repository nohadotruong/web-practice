Dưới đây là file `README.md` hoàn chỉnh cho dự án **Ứng dụng đặt lịch học kèm gia sư** sử dụng ReactJS + Node.js/Express + PostgreSQL:

---

````markdown
# 📚 Ứng dụng Đặt Lịch Học Kèm Gia Sư

Ứng dụng web đơn giản giúp học sinh đặt lịch học với gia sư, và gia sư có thể xác nhận hoặc từ chối lịch học đó. Dự án được xây dựng với **ReactJS (frontend)**, **Node.js/Express (backend)** và **PostgreSQL (CSDL)**.

---

## ✅ Tính Năng

### 👨‍🎓 Học sinh

- Chọn môn học, thời gian học và số buổi
- Gửi yêu cầu đặt lịch học
- Xem danh sách các yêu cầu đã gửi và trạng thái (`pending`, `accepted`, `rejected`)

### 👨‍🏫 Gia sư

- Xem danh sách các yêu cầu đặt lịch
- Xác nhận hoặc từ chối lịch học
- Quản lý lịch học hàng tuần (hiển thị dạng danh sách)

---

## 🧱 Công Nghệ Sử Dụng

| Layer    | Công nghệ                 |
| -------- | ------------------------- |
| Frontend | ReactJS, Axios, Bootstrap |
| Backend  | Node.js, ExpressJS        |
| Database | PostgreSQL (`pg`)         |
| Khác     | Nodemon, CORS, dotenv     |

---

## 📁 Cấu Trúc Dự Án

```plaintext
📦 tutor-scheduler/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── server/               # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── db.js
│   └── index.js
└── README.md
```
````

---

## 🚀 Hướng Dẫn Cài Đặt

### 1. Clone dự án

```bash
git clone https://github.com/your-username/tutor-scheduler.git
cd tutor-scheduler
```

---

### 2. Cài đặt Backend

```bash
cd server
npm install
```

Tạo file `.env`:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/tutordb
```

Khởi động server:

```bash
npm run dev
```

---

### 3. Cài đặt Frontend

```bash
cd ../client
npm install
npm start
```

Ứng dụng sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

---

## 🛠 Tính Năng Có Thể Mở Rộng

- Đăng nhập bằng email (JWT)
- Thông báo (email hoặc app)
- Lịch hiển thị dạng tuần (dùng thư viện như FullCalendar)
- Phân loại môn học, bộ lọc nâng cao
- Responsive & giao diện đẹp hơn

---

```

```
