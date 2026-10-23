# FEATURE 01: HOLD SEAT (GIỮ GHẾ TẠM THỜI)

---

## 1. USER STORY & ACCEPTANCE CRITERIA (PO DELIVERABLE)

### User Story:

*Là Khách mua vé online, tôi muốn có tính năng giữ ghế tạm thời để có thể giữ được lựa chọn của mình cho tới khi thanh toán mà không bị xung đột với khách hàng khác.*

---

### Acceptance Criteria (AC):

#### **AC 1: Chọn ghế thành công (Soft Hold)**
* **Given:** Khách A đang ở màn hình chọn ghế của Suất chiếu X và ghế `G12` đang có trạng thái Trống (Màu trắng).
* **When:** Khách A click chọn ghế `G12`.
* **Then:**
1. Ghế `G12` trên màn hình Khách A chuyển sang màu Xanh (Đã chọn).
2. Đồng hồ đếm ngược $10$ phút bắt đầu chạy.
3. Trạng thái ghế `G12` trên hệ thống chuyển sang **Soft Hold** (Tạm khóa).
4. Màn hình của các khách hàng khác (Khách B, C...) lập tức cập nhật ghế `G12` sang màu Xám/Đỏ nhạt (Không thể click).


#### **AC 2: Xử lý xung đột khi chọn trùng ghế (Race Condition Handling)**
* **Given:** Ghế `G12` đã được Khách A bấm chọn trước ($1/1000$ giây) và đang ở trạng thái Soft Hold.
* **When:** Khách B cố gắng click vào ghế `G12`.
* **Then:** Hệ thống hiển thị thông báo popup nhẹ nhàng: *"Rất tiếc, ghế G12 vừa được một khách hàng khác nhanh tay chọn giữ chỗ. Bạn vui lòng chọn vị trí ghế khác nhé!"* và giữ nguyên màn hình của Khách B.


#### **AC 3: Hết thời gian Tạm khóa (Soft Hold Timeout)**
* **Given:** Khách A đang giữ ghế `G12` ở bước Tạm khóa và đồng hồ đếm ngược trôi về `00:00`.
* **When:** Thời gian $10$ phút kết thúc mà Khách A chưa bấm nút "Tiến hành thanh toán".
* **Then:**
1. Hệ thống hiển thị thông báo: *"Đã hết thời gian giữ ghế quy định. Hệ thống xin phép đưa bạn về trang Lịch chiếu để thực hiện lại thao tác."*
2. Ghế `G12` lập tức được nhả tự do trên hệ thống (Chuyển về Màu trắng / Trạng thái Available cho mọi người).
3. Tự động điều hướng Khách A về màn hình Danh sách Phim/Suất chiếu.

## 2. TECHNICAL SPECIFICATION: FEATURE HOLD SEAT

### Data Schema (Redis):
   - Key format: `lock:showtime:{showtime_id}:seat:{seat_code}`
   - Value: `{user_id}`
   - TTL (Time To Live): 600 seconds (10 phút)
   - Atomic Command: Sử dụng `SET key value NX EX 600` (Chỉ set nếu Key chưa tồn tại).

### API Contract:
   - Endpoint: POST `/api/v1/showtimes/{showtime_id}/hold-seat`
   - Headers: `Authorization: Bearer <user_token>`
   - Request Body:
     {
       "seat_code": "G12"
     }
   - Response Status Codes:
     * 200 OK (Thành công): 
       { "status": "SUCCESS", "seat_code": "G12", "expires_in": 600 }
     * 409 CONFLICT (Xung đột - Đã có người giữ): 
       { "status": "FAILED", "message": "Ghế đã được người khác giữ" }

### Realtime Event (SSE)
* Channel name & Payload format

### Logic Execution Steps:
   - Step 1: Nhận request từ Client, lấy `user_id` từ token.
   - Step 2: Thử thực hiện lệnh Redis `SET lock:showtime:{showtime_id}:seat:{seat_code} {user_id} NX EX 600`.
   - Step 3: Nếu Redis trả về `OK` -> Tiếp tục. Nếu Redis trả về `Nil` (không gán được do đã có key) -> Return HTTP 409 Conflict.
   - Step 4: Bắn sự kiện Realtime qua WebSocket/SSE (hoặc cập nhật state) tới các Clients đang xem chung phòng chiếu.
   - Step 5: Trả về HTTP 200 cho Client.