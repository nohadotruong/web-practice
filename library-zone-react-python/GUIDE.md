# ⚙️ Hướng dẫn cài đặt & chạy dự án

## 🔹 Backend Setup (FastAPI - Python)

### 📦 Package cần cài

- **FastAPI** – Framework Python để xây dựng API nhanh, hiện đại.
- **Uvicorn** – ASGI server để chạy FastAPI, hỗ trợ reload khi dev.
- **psycopg2-binary** – Driver PostgreSQL cho Python.
- **SQLAlchemy** – ORM thao tác database bằng class.
- **Passlib[bcrypt]** – Hash mật khẩu với thuật toán bcrypt.
- **python-multipart** – Hỗ trợ upload file.
- **python-dotenv** – Load biến môi trường từ file `.env`.

### ⚙️ CMD Commands

1. Di chuyển vào thư mục backend

```
cd server
```

2. Tạo môi trường ảo

```
python -m venv venv
```

3. Kích hoạt môi trường ảo (Windows PowerShell)

```
venv\Scripts\activate
```

4. Cài đặt package cần thiết

```
pip install fastapi uvicorn psycopg2-binary sqlalchemy passlib[bcrypt] python-multipart python-dotenv
```

5. Hoặc cài từ file requirements.txt

```
pip install -r requirements.txt
```

6. Chạy server FastAPI (tự reload khi code thay đổi)

```
uvicorn main:app --reload
```

👉 API mặc định chạy tại:

- [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🔹 Frontend Setup (ReactJS)

### 📦 Package cần cài

- **Axios** – Gọi API trong React.
- **React Router DOM** – Quản lý routing trong React.
- **TailwindCSS + CLI** – CSS framework utility-first.
- **Bootstrap Icons** – Bộ icon nhẹ, dễ tích hợp.

### ⚙️ CMD Commands

1. Di chuyển vào thư mục frontend

```
cd client
```

2. Cài đặt package

```
npm install axios react-router-dom tailwindcss @tailwindcss/cli bootstrap-icons
```

3. Chạy frontend React

```
npm start
```

👉 Website mặc định chạy tại:

- [http://localhost:3000](http://localhost:3000)

---

## 🔹 Kết nối Backend & Frontend

- Frontend gọi API từ backend qua Axios (`http://127.0.0.1:8000/api/books`)
- Cấu hình baseURL trong `client/src/services/api.js`

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default api;
```
