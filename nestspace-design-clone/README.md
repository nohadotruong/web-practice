# NestSpace Design - Homepage Clone

Đây là dự án **clone trang chủ** của website [NestSpace Design](https://www.nestspacedesign.com/). Mục tiêu của dự án là học tập và thực hành HTML, CSS, JavaScript, jQuery, Bootstrap, và các thư viện biểu tượng như Bootstrap Icons và FontAwesome.

---

## Công nghệ sử dụng

- **HTML5**: Cấu trúc nội dung trang web.
- **CSS3**: Tạo kiểu dáng, layout và responsive design.
- **JavaScript (ES6+)**: Thêm tương tác cho trang web.
- **jQuery**: Hỗ trợ thao tác DOM, animation và event.
- **Bootstrap 5**: Framework CSS để thiết kế layout và responsive.
- **Bootstrap Icons & FontAwesome**: Thêm biểu tượng cho giao diện.
- **LocalStorage**: Lưu trữ dữ liệu cục bộ (localStorage) cho tính năng đăng nhập/đăng ký và trạng thái người dùng.

---

## Tính năng

- Giao diện clone gần giống trang chủ gốc của NestSpace Design.
- Responsive, hiển thị tốt trên desktop, tablet và mobile.
- Menu, carousel và các hiệu ứng hover được mô phỏng bằng jQuery + Bootstrap.
- **Đăng ký tài khoản**: Người dùng có thể tạo tài khoản mới, dữ liệu được lưu vào **LocalStorage**.
- **Đăng nhập / Đăng xuất**: Kiểm tra thông tin người dùng từ LocalStorage, hiển thị thông tin người dùng sau khi đăng nhập.
- Dữ liệu người dùng được lưu tạm thời trên trình duyệt bằng **LocalStorage**.

---

## Cấu trúc dự án

```

project-root/
│
├─ css/
│  ├─ index.html         # CSS Trang chủ
│  └─ form.css           # CSS Trang đăng nhập/đăng ký
│
├─ js/
│  ├─ index.js           # JavaScript cho trang chủ
│  └─ signIn.js          # JavaScript cho đăng nhập
│  └─ signUp.js          # JavaScript cho đăng ký
│
├─ pages/
│  ├─ signIn.html        # Trang đăng nhập
│  └─ signUp.html        # Trang đăng ký
│
└─ index.html            # Trang chủ

```

---

## Hướng dẫn sử dụng

1. Clone hoặc tải dự án về máy:

```bash
git clone https://github.com/LongTruongPhamHai/nestspace-design-clone
```

2. Mở file `index.html` bằng trình duyệt để xem trang chủ.

3. Truy cập `/pages/signUp.html` để tạo tài khoản mới.

4. Truy cập `/pages/signIn.html` để đăng nhập vào trang web.

5. Thông tin người dùng sẽ được lưu tạm thời trong **LocalStorage**, đăng xuất sẽ xóa trạng thái đăng nhập.

