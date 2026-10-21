// Import React để sử dụng JSX và các API liên quan
import React from "react";

// Import ReactDOM để render React App vào DOM thực tế của HTML
import ReactDOM from "react-dom/client";

// Import component gốc của ứng dụng
import App from "./App";

// Import file CSS chung cho toàn ứng dụng
import "./index.css";

// Import CSS từ thư viện Bootstrap (dành cho layout, button, grid system,…)
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Import icon từ thư viện Bootstrap Icons (dùng các class như `bi bi-plus`, `bi bi-pencil`,…)
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";

// Import BrowserRouter để bao bọc ứng dụng và kích hoạt routing (định tuyến)
import { BrowserRouter } from "react-router-dom";

// Tạo root DOM tại phần tử có id "root" trong file index.html
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Render ứng dụng React vào trong DOM
root.render(
  // Bọc App bên trong BrowserRouter để sử dụng các Route (định tuyến URL)
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Nếu muốn đo hiệu suất của ứng dụng (performance), bạn có thể truyền một hàm để ghi log
// hoặc gửi dữ liệu lên server phân tích (analytics). Tùy chọn, không bắt buộc.
// Learn more: https://bit.ly/CRA-vitals
