# PROJECT CONCEPT: CINEMA TICKETING SYSTEM (HỆ THỐNG ĐẶT VÉ RẠP PHIM CONCURRENCY CAO)

---

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

* **Tên dự án:** Cinema Ticketing System
* **Bối cảnh:** Xây dựng hệ thống đặt vé xem phim trực tuyến (Online Cinema Booking System) có khả năng xử lý truy cập lớn, chống xung đột dữ liệu (Concurrency) khi hàng ngàn khách hàng cùng lúc tranh mua vé cho các suất chiếu hot/phim bom tấn.
* **Vai trò phát triển:** 
  * **Người dùng (User):** Đóng vai BA (Chuyên viên phân tích nghiệp vụ), PO (Chủ sản xuất) và Software Architect (Kiến trúc sư phần mềm) để định hình toàn bộ yêu cầu và thiết kế kỹ thuật.
  * **AI Agent (Developer):** Thực thi viết code dựa trên các bản Specification đã được chuẩn hóa.

---

## 2. BÀI TOÁN KINH DOANH & THÁCH THỨC KỸ THUẬT (BUSINESS & TECH CHALLENGES)

### a. Thách thức Kinh doanh (Business Pain Points)
* **Thất thoát doanh thu do giữ ghế ảo (Scalper/Bot Attack):** Người dùng hoặc bot gom giữ quá nhiều ghế mà không thanh toán, làm rạp lãng phí cơ hội bán vé.
* **Trải nghiệm người dùng tệ (Bad UX):** Màn hình chọn ghế bị chậm, phải tải lại (reload) liên tục, hoặc đặt thành công nhưng lại bị báo hủy do người khác nhanh tay hơn.

### b. Thách thức Kỹ thuật (Technical Challenges)
* **Xung đột giữ ghế (Race Condition):** Hàng trăm request bấm chọn cùng 1 vị trí ghế $G12$ trong cùng 1 millisecond.
* **Hạ tầng quá tải (High Concurrency Traffic):** Lượng truy cập tăng đột biến (Spike Traffic) vào các khung giờ mở bán phim mới.
* **Đồng bộ trạng thái Real-time:** Cập nhật ngay lập tức sơ đồ ghế cho hàng ngàn người dùng đang xem chung một phòng chiếu mà không làm treo hệ thống.

---

## 3. MỤC TIÊU HỆ THỐNG (SYSTEM GOALS)

1. **Tính Toàn vẹn Dữ liệu (Data Consistency):** Đảm bảo tuyệt đối **không bao giờ có 2 khách hàng đặt trùng 1 ghế** trong cùng một suất chiếu (Zero Double-booking).
2. **Hiệu năng Cao (High Performance):**
   * Thời gian phản hồi API giữ ghế < 100ms.
   * Cập nhật sơ đồ ghế real-time tới client dưới 200ms.
3. **Cơ chế Giữ ghế Thông minh (Smart Hold TTL):** Áp dụng cơ chế khóa 2 cấp độ (Soft Hold 10m & Hard Hold 10m) giúp tự động nhả ghế khi quá thời gian, tối ưu tỷ lệ lấp đầy phòng chiếu.

---

## 4. PHẠM VI HỆ THỐNG (PROJECT SCOPE)

### In-Scope (Các tính năng phát triển trong dự án):
* **Quản lý Lịch chiếu & Phim:** Tra cứu danh sách phim, suất chiếu, phòng chiếu.
* **Đặt ghế Real-time (Core Feature):** Chọn ghế trên sơ đồ, giữ ghế tạm thời (Soft Hold) với đếm ngược 10 phút, đồng bộ trạng thái qua SSE.
* **Dịch vụ Bỏn/Nước (Add-ons):** Chọn combo đồ ăn/nước uống đi kèm đơn hàng.
* **Thanh toán & Xuất vé (Checkout & Ticket Generation):** Khóa thanh toán (Hard Hold), giả lập cổng thanh toán, chốt đơn hàng vào PostgreSQL và phát hành vé.
* **Tự động nhả ghế (Async Expiration Worker):** Hủy phiên và giải phóng ghế trong Redis/Postgres khi người dùng bỏ dở hoặc hết hạn đếm ngược.

### Out-of-Scope (Chưa phát triển ở giai đoạn MVP):
* Tích hợp cổng thanh toán thực tế (VNPay/Momo sandbox) — Chỉ giả lập status thanh toán thành công/thất bại.
* Hệ thống Loyalty / Tích điểm thành viên phức tạp.
* Chọn vị trí rạp theo GPS/Bản đồ địa lý.

---

## 5. HẠ TẦNG KỸ THUẬT MỤC TIÊU (TARGET ARCHITECTURE STACK)

* **Primary Database:** PostgreSQL (Lưu trữ dữ liệu Phim, Suất chiếu, Đơn hàng, Vé chính thức).
* **In-Memory Cache & Lock:** Redis (Lưu Distributed Lock `SETNX` giữ ghế tạm và bộ đếm thời gian TTL).
* **Message Broker / Async Workers:** RabbitMQ (Xử lý hàng đợi hủy ghế tự động, gửi email/xuất vé bất đồng bộ).
* **Search Engine:** Meilisearch (Tìm kiếm phim, diễn viên, suất chiếu siêu tốc).
* **Reverse Proxy & Gateway:** Nginx / Traefik (Cân bằng tải, SSL Termination, Routing).
* **Backend Application Services:** FastAPI (Python) hoặc Node.js (REST APIs, SSE Endpoints).