# ⚽ Football Store

**Football Store** là một ứng dụng web bán hàng chuyên về các sản phẩm thể thao, đặc biệt là bóng đá. Dự án được phát triển với giao diện hiện đại, dễ sử dụng nhằm phục vụ nhu cầu mua sắm trực tuyến cho người yêu thể thao.

## 🛠 Công nghệ sử dụng

- **ReactJS**: Thư viện JavaScript mạnh mẽ để xây dựng giao diện người dùng.
- **Bootstrap**: Framework CSS phổ biến giúp thiết kế giao diện responsive nhanh chóng.
- **Cloudinary**: Dịch vụ lưu trữ & tối ưu hóa hình ảnh, video.

## 🚀 Tính năng dự kiến

- Xem danh sách sản phẩm (quần áo, giày, phụ kiện bóng đá)
- Xem chi tiết sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Tìm kiếm và lọc theo thương hiệu (Adidas, Nike, Puma, v.v.)
- **Quản lý sản phẩm** (thêm / sửa / xoá – dành cho admin)
- Thanh toán (sẽ cập nhật sau)

## 🎨 Giao diện & Thiết kế

- Font chữ: [Exo 2](https://fonts.google.com/specimen/Exo+2) từ Google Fonts
- Giao diện responsive nhờ sử dụng **Bootstrap**
- Thiết kế đơn giản, hiện đại phù hợp với lĩnh vực thể thao

## 📁 Cấu trúc thư mục (sẽ cập nhật thêm)

```markdown
football-store/
├── public/
│ └── index.html
│
├── src/
│ ├── assets/
│ │
│ ├── components/
│ │ ├── HeaderBar/
│ │ ├── FooterBar/
│ │ └── ProtectedRoute.jsx
│ │
│ ├── contexts/
│ │ └── UserContext.jsx
│ │
│ ├── data/
│ │
│ ├── features/
│ │ ├── auth/
│ │ │ ├── AccountMenu/
│ │ │ └── AuthForm/
│ │ │
│ │ ├── products/
│ │ │ ├── CategoryMenu/
│ │ │ ├── FilterMenu/
│ │ │ ├── ProductImageSlide/
│ │ │ ├── ProductInfo/
│ │ │ └── SearchBar/
│ │ │
│ │ └── ...
│ │
│ ├── layouts/
│ │ └── MainLayout/
│ │
│ ├── pages/
│ │ ├── account/
│ │ │ ├── Authentication/
│ │ │ ├── Cart/
│ │ │ ├── Order/
│ │ │ └── Profile/
│ │ │
│ │ ├── admin/
│ │ │ └── ProductManagement/
│ │ │
│ │ ├── public/
│ │ │ ├── LandingPage/
│ │ │ ├── Product/
│ │ │ └── Store/
│ │ │
│ │ └── ...
│ │
│ ├── App.jsx
│ ├── index.jsx
│ └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 📦 Cài đặt và chạy dự án

### Cài đặt các thư viện phụ thuộc

npm install

### Chạy project ở chế độ development

npm start

📌 Ghi chú
Đây là phiên bản đang phát triển. Các tính năng nâng cao và backend sẽ được cập nhật trong tương lai.
