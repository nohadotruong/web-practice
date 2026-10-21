// Import thư viện Express để tạo server
const express = require("express");

// Import middleware CORS để cho phép truy cập từ domain khác
const cors = require("cors");

// Load biến môi trường từ file .env
require("dotenv").config();

// Khởi tạo ứng dụng Express
const app = express();

// Kích hoạt CORS cho toàn bộ ứng dụng
app.use(cors());

// Middleware để parse JSON trong body request
app.use(express.json());

// Import các route chính của ứng dụng
const usersRoute = require("./routes/userRoutes");
const subjectsRoute = require("./routes/subjectRoutes");
const bookingsRoute = require("./routes/bookingRoutes");

// Ánh xạ các route với prefix /api/...
app.use("/api/users", usersRoute); // Các route liên quan đến người dùng
app.use("/api/subjects", subjectsRoute); // Các route liên quan đến môn học
app.use("/api/bookings", bookingsRoute); // Các route liên quan đến đặt lịch học

// Khai báo cổng chạy server từ biến môi trường hoặc mặc định là 5000
const PORT = process.env.PORT || 5000;

// Khởi động server và lắng nghe trên cổng đã chỉ định
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
