# 🏠 AI Quản Gia Thông Minh

Ứng dụng quản lý và tối ưu lịch trình cá nhân với sự hỗ trợ của AI.  
Người dùng có thể tạo, chỉnh sửa, tối ưu lịch và nhận nhắc nhở thông minh để cân bằng công việc, học tập và nghỉ ngơi.

---

## ✨ Chức năng chính

### 1. Quản lý lịch trình cơ bản
- Thêm / sửa / xóa công việc, sự kiện.
- Hiển thị lịch theo ngày / tuần / tháng.
- Lọc và tìm kiếm theo loại hoặc mức độ ưu tiên.
- Kéo thả hoặc chỉnh sửa trực tiếp trên giao diện lịch.

### 2. Kiểm tra tính hợp lý
- Phát hiện xung đột thời gian.
- Kiểm tra thời gian nghỉ giải lao.
- Phân tích mức độ ưu tiên và cảnh báo công việc quan trọng.

### 3. Gợi ý tối ưu (AI)
- AI gợi ý sắp xếp công việc hợp lý.
- Đề xuất kéo dài / rút ngắn thời gian dựa trên thói quen.
- Gợi ý cân bằng giữa công việc – học tập – nghỉ ngơi.

### 4. Nhắc nhở & thông báo
- Thông báo trước khi công việc bắt đầu.
- Cảnh báo lịch không hợp lý hoặc quá tải.
- Tùy chỉnh tần suất nhắc nhở.

### 5. Lưu trữ & học thói quen
- Lưu lịch trình đã hoàn thành để AI học.
- AI dự đoán thời gian hoàn thành công việc.
- Đề xuất lịch trình cho ngày / tuần tiếp theo.

---

## 🛠 Công nghệ sử dụng

### Frontend
- **ReactJS** (SPA)
- **TailwindCSS / Bootstrap**: UI responsive
- **FullCalendar / react-big-calendar**: hiển thị lịch
- **Axios / fetch**: gọi API

### Backend
- **FastAPI** (Python, async API)
- **pandas, numpy, scikit-learn, dateutil**: AI & xử lý dữ liệu
- API CRUD: người dùng, lịch trình, gợi ý tối ưu

### Database
- **PostgreSQL**: lưu trữ dữ liệu
- **Redis (optional)**: cache AI suggestion
- **Cloud storage (optional)**: lưu file đính kèm

### AI
- Input: dữ liệu lịch người dùng
- Output: gợi ý lịch tối ưu
- Thuật toán: phân tích xung đột, tối ưu hoá, học thói quen

---

## 🚀 Lộ trình phát triển

1. **Phase 1**: Đăng ký / Đăng nhập  
2. **Phase 2**: Quản lý lịch cơ bản  
3. **Phase 3**: Hiển thị & thao tác nâng cao  
4. **Phase 4**: AI gợi ý tối ưu  
5. **Phase 5**: Nhắc nhở & lịch sử  
6. **Phase 6**: Nâng cao & tối ưu  

---

## ⚡ Installation & Run

### 1. Clone repository
```bash
git clone https://github.com/your-username/ai-smart-butler.git
cd ai-smart-butler
````

### 2. Backend (FastAPI + Python)

```bash
cd server
python -m venv venv
source venv/bin/activate   # MacOS/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt

# Chạy server
uvicorn main:app --reload
```

Mặc định chạy tại: `http://127.0.0.1:8000`

### 3. Frontend (ReactJS)

```bash
cd client
npm install
npm start
```

Mặc định chạy tại: `http://localhost:3000`

### 4. Database (PostgreSQL)

Tạo database:

```sql
CREATE DATABASE smart_butler;
```

Chạy migration (nếu có):

```bash
alembic upgrade head
```

---

## 📂 Cấu trúc thư mục

```bash
smart-planner/
│── client/              # ReactJS frontend
│   ├── src/
│   └── public/
│
│── server/              # FastAPI backend
│   ├── app/
│   │   ├── models/      # SQLAlchemy models
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # AI & business logic
│   │   └── main.py      # Entry point
│   └── requirements.txt
│
│── docs/                # Tài liệu & thiết kế
│── README.md
```

---

## 📌 Ghi chú

* FE & BE phát triển song song theo module → test ngay sau mỗi bước.
* AI module có thể mở rộng theo dữ liệu thực tế.
* Có thể deploy trên **Heroku / Vercel (FE)** và **Railway / Render (BE)**.

---

