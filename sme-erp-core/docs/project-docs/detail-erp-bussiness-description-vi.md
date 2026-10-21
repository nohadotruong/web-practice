Dưới đây là bản mô tả chi tiết nghiệp vụ ERP dưới góc nhìn của **Chủ doanh nghiệp / Nhà quản trị**. Bản tả này tập trung vào: **Chúng ta lưu trữ những gì? Luồng xử lý ra sao? Các quy tắc kinh doanh (Business Rules) bắt buộc phải tuân thủ để tránh thất thoát, gian lận và vận hành mượt mà.**

---

## PHÂN HỆ 1: QUẢN LÝ KHO & CHUỖI CUNG ỨNG

### 1. Dữ liệu Quản lý (Doanh nghiệp lưu giữ thông tin gì?)

* **Thông tin Sản phẩm Master:**
* *Mã định danh:* Mã SKU (Doanh nghiệp tự quy định), Mã Barcode/EAN, Mã Serial/IMEI (đối với hàng công nghệ để theo dõi bảo hành).
* *Phân loại:* Danh mục (Điện thoại, Phụ kiện...), Thương hiệu, Nhà cung cấp mặc định.
* *Thuộc tính chi tiết:* Màu sắc, dung lượng, trọng lượng, kích thước đóng gói.
* *Chính sách giá gốc:* Giá nhập gần nhất, Giá nhập trung bình, Giá bán lẻ niêm yết, Giá bán sỉ, Giá sàn (giá tối thiểu sales được phép chiết khấu).


* **Thông tin Nhà cung cấp (Vendor):**
* Tên công ty, Mã số thuế, Nguồn hàng (Chính hãng / Mua lại), Đánh giá uy tín (1-5 sao).
* Thông tin liên hệ người đại diện, Hạn mức công nợ được nợ, Thời hạn thanh toán (ví dụ: gối đầu 30 ngày).


* **Thông tin Thẻ kho & Lịch sử giao dịch (Stock Card):**
* Mỗi SKU tại từng kho sẽ có: Tồn thực tế (Physical Stock), Tồn khả dụng (Available Stock - đã trừ đi số hàng khách đặt nhưng chưa giao), Tồn tối thiểu (Safety Stock), Tồn tối đa.



### 2. Quy tắc Nghiệp vụ & Ràng buộc (Business Rules)

* **Quy tắc "Không tồn âm" (Strict Non-negative Inventory):** Hệ thống tuyệt đối không cho phép xuất kho hoặc bán đơn POS nếu Tồn khả dụng bằng 0. Nếu thực tế có hàng mà hệ thống báo bằng 0, nhân viên phải làm thủ tục "Kiểm kê / Điều chỉnh kho" trước khi xuất.
* **Quy tắc Bán theo Serial/IMEI:** Với thiết bị đắt tiền, một mã SKU có thể có 10 sản phẩm trong kho, nhưng khi xuất bán **bắt buộc phải chọn chính xác mã IMEI nào rời khỏi kho**. Điều này tránh việc tráo đổi hàng cũ/mới khi khách đổi trả.
* **Quy tắc Khóa sổ Kiểm kê (Stocktake Locking):** Khi Quản lý Kho mở một "Phiếu kiểm kê" cho một nhóm hàng/chi nhánh, toàn bộ hoạt động Nhập - Xuất - Bán hàng liên quan đến nhóm hàng đó tại chi nhánh đó sẽ bị **tạm khóa** cho đến khi duyệt xong biên bản kiểm kê, tránh việc vừa bán vừa đếm gây sai lệch.
* **Chênh lệch Kiểm kê:** Nếu số lượng thực tế nhỏ hơn số lượng trên hệ thống, hệ thống bắt buộc yêu cầu chọn "Lý do hỏng/mất" và quy trách nhiệm cá nhân (Nhân viên đền hay Bỏ vào chi phí hao hụt doanh nghiệp).

---

## PHÂN HỆ 2: BÁN HÀNG (POS), CRM & ĐƠN HÀNG (OMS)

### 1. Dữ liệu Quản lý

* **Hồ sơ Khách hàng (CRM Profile):**
* *Thông tin cơ bản:* Họ tên, Số điện thoại (Dùng làm ID duy nhất), Email, Ngày sinh (để tặng quà), Địa chỉ giao hàng mặc định.
* *Phân hạng & Tích điểm:* Hạng thẻ (Đồng/Bạc/Vàng/Kim Cương), Số điểm hiện có, Tổng tiền đã tích lũy trọn đời (Lifetime Value - LTV).
* *Lịch sử tương tác:* Danh sách đơn hàng đã mua, Lịch sử bảo hành/đổi trả, Ghi chú sở thích khách hàng.


* **Đơn hàng (Order Data):**
* Mã đơn hàng, Kênh bán (POS/Website/Shopee/Lazada), Nhân viên bán hàng (Sales ID), Thu ngân thu tiền (Cashier ID).
* Chi tiết mặt hàng, Giá niêm yết, Chiết khấu/Voucher áp dụng, Giá bán cuối cùng.
* Trạng thái thanh toán (Chưa thu / Đã thu một phần / Đã thu đủ / Đã hoàn tiền), Trạng thái giao hàng.



### 2. Quy tắc Nghiệp vụ & Ràng buộc

* **Quy tắc Duyệt Chiết khấu (Discount Policy):**
* Thu ngân/Sales chỉ được phép giảm giá tối đa **X%** (ví dụ: 5%).
* Nếu chiết khấu từ **X+1% đến Y%**, phải có **Mã OTP/Xác nhận của Cửa hàng trưởng**.
* Giảm giá không được đưa giá bán vượt xuống dưới **Giá sàn** của sản phẩm.


* **Vòng đời Trạng thái Đơn hàng (Order State Machine):**
Đơn hàng chỉ được chuyển trạng thái theo đúng một chiều nghiêm ngặt:

$$\text{Mới tạo} \longrightarrow \text{Đã xác nhận (Khóa tồn kho)} \longrightarrow \text{Đang đóng gói} \longrightarrow \text{Đã xuất kho} \longrightarrow \text{Đang giao} \longrightarrow \text{Thành công}$$



*Ràng buộc:* Không thể Hủy đơn nếu đơn đã ở trạng thái "Đã xuất kho" trừ khi tạo một "Phiếu Yêu cầu Hoàn trả/Trả hàng" riêng biệt.
* **Tích điểm & Bán hàng:** Điểm thưởng chỉ được cộng vào tài khoản khách hàng khi đơn hàng đạt trạng thái **"Thành công"** (đã thu đủ tiền và khách không hoàn trả sau $N$ ngày quy định).

---

## PHÂN HỆ 3: QUẢN LÝ NHÂN SỰ (HRM), HOA HỒNG & PHÂN QUYỀN (RBAC)

### 1. Dữ liệu Quản lý

* **Hồ sơ Nhân sự:**
* Thông tin cá nhân, Hợp đồng lao động, Lương thỏa thuận, Phòng ban/Chi nhánh làm việc.
* Chức danh và Cấp bậc (Level).


* **Cấu hình Phân quyền (RBAC Master):**
* *Nhóm quyền (Roles):* Giám đốc, Cửa hàng trưởng, Sales, Quản lý kho, Kế toán.
* *Quyền hạn chi tiết (Permissions):* Cho phép Xem (Read), Thêm (Create), Sửa (Update), Xóa (Delete), Duyệt (Approve) trên từng màn hình cụ thể.


* **Bảng tính Hoa hồng (Commission Matrix):**
* Quy tắc tính hoa hồng: Theo % Doanh thu đơn hàng, hoặc theo Số tiền cố định/mỗi sản phẩm (Ví dụ: Bán 1 iPhone được 200k, bán 1 ốp lưng được 10% giá trị).



### 2. Quy tắc Nghiệp vụ & Ràng buộc

* **Quy tắc Phân quyền Theo Chi nhánh (Data Isolation):** Nhân viên cửa hàng A chỉ nhìn thấy đơn hàng và tồn kho của Cửa hàng A. Chỉ Quản lý khu vực hoặc Giám đốc mới có quyền xem dữ liệu toàn bộ các Chi nhánh.
* **Chống Gian lận Doanh số (Commission Fraud Prevention):**
* Doanh số tính hoa hồng cho Sales chỉ được ghi nhận dựa trên **Số thực thu** (sau khi trừ tất cả khuyến mãi, voucher và chi phí trả hàng).
* Nếu đơn hàng bị Trả lại trong vòng 14 ngày, khoản Hoa hồng đã tạm tính cho đơn đó sẽ tự động bị **Khấu trừ (Clawback)** vào kỳ lương tiếp theo của nhân viên.


* **Bảo mật dữ liệu nhạy cảm:** Nhân viên Sales/Kho không thể xem được Giá nhập gốc (COGS) của sản phẩm hay Tổng doanh thu/Lợi nhuận của công ty. Chỉ vai trò *Kế toán* và *Admin* mới mở được các chỉ số này.

---

## PHÂN HỆ 4: TÀI CHÍNH, BÁO CÁO & ĐỐI SOÁT (BI & FINANCE)

### 1. Dữ liệu Quản lý

* **Sổ quỹ & Tài khoản Ngân hàng:** Quản lý dòng tiền mặt tại két cửa hàng và tiền trong các tài khoản ngân hàng/ví điện tử.
* **Phiếu Thu / Phiếu Chi:**
* Mã phiếu, Loại thu/chi (Thu tiền bán hàng, Chi tiền điện nước, Chi nhập hàng, Chi trả lương...), Số tiền, Đối tượng (Khách hàng / Nhà cung cấp / Nhân viên).
* Chứng từ đi kèm (Ảnh hóa đơn VAT, Ảnh biên nhận).


* **Báo cáo Lợi nhuận gộp (Gross Profit):**

$$\text{Lợi nhuận gộp} = \text{Doanh thu thực thu} - \text{Giá vốn hàng bán (COGS)}$$



### 2. Quy tắc Nghiệp vụ & Ràng buộc

* **Quy tắc Bất biến của Chứng từ Tài chính (Immutability):** Các Phiếu Thu / Phiếu Chi khi đã ở trạng thái **"Đã Duyệt/Đã Thu Money"** thì **không bao giờ được phép Sửa hoặc Xóa**.
* *Trường hợp sai sót:* Bắt buộc phải lập một **"Phiếu Điều chỉnh"** hoặc **"Phiếu Thu/Chi Ngược"** có lý do rõ ràng để ghi nhận chênh lệch, nhằm giữ nguyên vết dòng tiền (Audit Trail).


* **Quy tắc Khóa sổ Kế toán (Period Closing):** Cuối mỗi tháng, Kế toán trưởng thực hiện "Khóa sổ". Sau khi khóa sổ, toàn bộ dữ liệu giao dịch, xuất nhập kho, bán hàng của tháng đó sẽ bị đóng băng. Không ai (kể cả Admin) được thay đổi dữ liệu của kỳ đã khóa để đảm bảo tính pháp lý của Báo cáo tài chính.
* **Đối soát Thu ngân Cuối ngày (End-of-Day Reconciliation):** Cuối ca làm việc, Thu ngân phải thực hiện chốt ca:

$$\text{Tiền mặt kiểm đếm thực tế} = \text{Tiền quỹ đầu ca} + \text{Các đơn thu tiền mặt} - \text{Các phiếu chi tiền mặt trong ca}$$



Nếu có lệch (Thừa/Thiếu), hệ thống yêu cầu Thu ngân ghi giải trình trước khi Bàn giao ca cho người sau.

---

## TỔNG KẾT LUỒNG DỮ LIỆU LIÊN PHÂN HỆ (CROSS-FUNCTIONAL FLOW)

Để dung hòa 4 phân hệ trên, một quy trình vận hành thực tế sẽ diễn ra như sau:

1. **Nhà cung cấp giao hàng đến Kho:** Quản lý kho tạo *Phiếu Nhập Kho* $\rightarrow$ Tồn kho tăng $\rightarrow$ Phát sinh *Công nợ phải trả Nhà cung cấp*.
2. **Khách mua tại POS:** Thu ngân quét Barcode $\rightarrow$ Hệ thống kiểm tra *Tồn khả dụng > 0* $\rightarrow$ Áp dụng hạng *CRM* giảm giá $\rightarrow$ Thu tiền và In hóa đơn.
3. **Hệ thống xử lý ngầm (Automated Engine):**
* Hàng tồn kho tự động trừ $1$.
* Ghi nhận $1$ *Phiếu Thu* vào Sổ quỹ tiền mặt/ngân hàng.
* Cộng *Điểm thưởng* cho Khách hàng.
* Tạm tính *Hoa hồng* cho Nhân viên Sales.
* Cập nhật Biểu đồ *Doanh thu & Lợi nhuận* realtime trên Dashboard của Giám đốc.