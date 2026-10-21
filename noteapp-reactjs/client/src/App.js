// Import React
import React from "react";

// Import các thành phần cần thiết từ thư viện react-router-dom để xử lý routing
import { Routes, Route, Router } from "react-router-dom";

// Import các trang (pages) cần điều hướng
import Home from "./pages/Home/Home"; // Trang chính
import Detail from "./pages/Detail/Detail"; // Trang chi tiết ghi chú

// Component App là nơi định nghĩa toàn bộ hệ thống route của ứng dụng
function App() {
  return (
    // Routes là nơi chứa tất cả các Route con
    <Routes>
      {/* Route cho trang chủ (/) → sẽ render component Home */}
      <Route path="/" element={<Home />} />

      {/* Route cho trang chi tiết (/note) → sẽ render component Detail */}
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}

// Xuất component App để sử dụng trong file main.jsx
export default App;
