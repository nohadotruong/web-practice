// Import thư viện Express để tạo server
const express = require("express");

// Import CORS để cho phép frontend truy cập từ domain khác (ví dụ: localhost:3000 ↔ localhost:5000)
const cors = require("cors");

// Nạp biến môi trường từ file .env (ví dụ: PORT, DB_URL...)
require("dotenv").config();

// Khởi tạo ứng dụng Express
const app = express();

// Kích hoạt middleware CORS cho tất cả route
app.use(cors());

// Kích hoạt middleware cho phép đọc JSON từ request body
app.use(express.json());

// Import routes xử lý cho tài nguyên notes
const notesRoute = require("./routes/notes");

// Gắn route `/api/notes` vào route xử lý, nghĩa là tất cả các route trong file notes sẽ có tiền tố /api/notes
app.use("/api/notes", notesRoute);

// Thiết lập cổng từ biến môi trường hoặc mặc định là 5000
const PORT = process.env.PORT || 5000;

// Khởi động server, lắng nghe ở PORT đã chọn
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
