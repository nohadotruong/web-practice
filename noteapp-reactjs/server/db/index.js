// Import Pool từ thư viện 'pg' để tạo kết nối tới PostgreSQL
const { Pool } = require("pg");

// Load các biến môi trường từ file .env (ví dụ: DB_USER, DB_PASS...)
require("dotenv").config();

// Tạo một pool kết nối mới với cấu hình từ biến môi trường
const pool = new Pool({
  user: process.env.DB_USER, // Tên người dùng PostgreSQL (ví dụ: postgres)
  host: process.env.DB_HOST, // Địa chỉ host (thường là localhost hoặc 127.0.0.1)
  database: process.env.DB_NAME, // Tên cơ sở dữ liệu (ví dụ: notes_db)
  password: process.env.DB_PASS, // Mật khẩu của người dùng PostgreSQL
  port: process.env.DB_PORT, // Cổng kết nối (mặc định của PostgreSQL là 5432)
});

// Export pool ra để sử dụng trong các file khác (ví dụ: repository)
module.exports = pool;
