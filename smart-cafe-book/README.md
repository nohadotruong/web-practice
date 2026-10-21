# Hệ thống Quản lý Café Sách Thông Minh

## 1. Giới thiệu

Ngày nay, café sách không chỉ là nơi thưởng thức đồ uống mà còn là không gian đọc sách, học tập và giao lưu. Tuy nhiên, việc quản lý sách, order đồ uống, theo dõi hàng đợi, mượn – trả sách, bán sách và chăm sóc khách hàng thường gặp khó khăn khi thực hiện thủ công.

Đề tài này xây dựng một hệ thống quản lý café sách toàn diện, giúp số hóa toàn bộ quy trình và áp dụng AI/ML để gợi ý sách phù hợp với từng khách hàng.

## 2. Mục tiêu

- **Quản lý order đồ uống với cơ chế hàng đợi thông minh:** khách hàng sẽ nhận thông báo khi đến lượt lấy đồ.
- **Quản lý kho sách:** thêm, sửa, xoá sách; thống kê số lượng; phân loại theo thể loại.
- **Quản lý mượn – trả sách:** ghi nhận lịch sử mượn, trả, phạt trễ hạn.
- **Hỗ trợ bán sách** như một kênh thương mại điện tử nhỏ.
- **Áp dụng AI/ML** để:
  - Gợi ý sách dựa trên lịch sử đọc/mượn/mua.
  - Dự đoán sách xu hướng.
- **Hỗ trợ quản trị hệ thống:** báo cáo doanh thu, thống kê số lượt mượn sách, số order.

## 3. Đối tượng sử dụng

### Khách hàng:

- Đăng ký, đăng nhập.
- Order đồ uống → nhận số thứ tự → nhận thông báo khi đến lượt.
- Mượn – trả sách, mua sách.
- Xem gợi ý sách cá nhân hóa.

### Admin / Quản lý:

- Quản lý kho sách (CRUD).
- Quản lý order, giám sát hàng đợi.
- Quản lý hoạt động mượn – trả, bán sách.
- Xem báo cáo thống kê, doanh thu.

## 4. Phạm vi chức năng

### Hệ thống người dùng

- Đăng ký/Đăng nhập (JWT).
- Phân quyền (Admin / Khách hàng).

### Quản lý sách

- CRUD sách.
- Tra cứu, tìm kiếm theo tên/tác giả/thể loại.

### Quản lý order & hàng đợi

- Đặt đồ uống online.
- Xếp hàng đợi (queue).
- Thông báo khi đến lượt.

### Mượn – trả sách

- Đăng ký mượn.
- Theo dõi hạn trả.
- Tính phí trễ hạn (nếu có).

### Bán sách

- Danh mục sách bán.
- Giỏ hàng, thanh toán (giả lập).
- Lịch sử mua sách.

### AI/ML

- Gợi ý sách (content-based + collaborative filtering).
- Phân tích thói quen đọc/mua sách.

### Quản trị hệ thống

- Dashboard thống kê: số order/ngày, số sách mượn/trả, doanh thu bán sách.
- Báo cáo tổng hợp.

## 5. Công nghệ sử dụng

- **Frontend:** Next.js (React) + Tailwind CSS.
- **Backend:** ExpressJS (Node.js).
- **Database:** PostgreSQL.
- **AI/ML:** Python (scikit-learn) hoặc TensorFlow.js.
- **Realtime Queue:** WebSocket hoặc polling.
- **Triển khai:** Docker (tùy chọn).

## 6. Điểm nổi bật (Innovation)

- Order đồ uống theo hàng đợi realtime → khách chủ động theo dõi, giảm tình trạng chờ.
- Hệ thống vừa là quản lý dịch vụ (café) vừa là quản lý tri thức (sách).
- Tích hợp AI gợi ý sách, mang tính cá nhân hóa.
- Có thể mở rộng thành cộng đồng đọc sách online trong tương lai.
