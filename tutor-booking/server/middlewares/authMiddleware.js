const jwt = require("jsonwebtoken"); // Thư viện dùng để xử lý JWT
const jwtSecret = process.env.JWT_SECRET; // Lấy secret key từ biến môi trường

// Middleware để xác thực người dùng qua JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Lấy header Authorization từ request

  // Nếu không có header hoặc không bắt đầu bằng "Bearer ", từ chối truy cập
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" }); // 401 = chưa đăng nhập
  }

  const token = authHeader.split(" ")[1]; // Tách token ra từ chuỗi "Bearer <token>"

  try {
    const decode = jwt.verify(token, jwtSecret); // Xác minh token bằng secret key
    req.user = decode; // Gắn thông tin user đã giải mã vào req để các route sau sử dụng
    next(); // Cho phép đi tiếp sang middleware hoặc route handler tiếp theo
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" }); // Token không hợp lệ
  }
};

module.exports = authMiddleware; // Export middleware để sử dụng ở các route
