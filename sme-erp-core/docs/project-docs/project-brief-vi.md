**Đề bài Dự án:** Xây dựng Hệ thống Quản trị & Điều hành Doanh nghiệp Bán lẻ Đa kênh (SME Enterprise Resource Planning - ERP Lite)

---

### 1. Bối cảnh & Bài toán Doanh nghiệp

Một công ty thương mại vừa và nhỏ (SME) chuyên kinh doanh các sản phẩm công nghệ/thiết bị điện tử hiện đang bán hàng qua nhiều kênh: **Showroom trực tiếp**, **Website E-commerce**, và **Sàn Thương mại Điện tử (Shopee, Lazada)**.

Hiện tại, việc quản lý nhân sự, kho hàng, tài chính và đơn hàng đang diễn ra rời rạc trên Excel và các phần mềm lẻ tẻ. Điều này dẫn đến các vấn đề:

* Thất thoát hàng hóa do không đồng bộ tồn kho realtime giữa các kênh.
* Chậm trễ trong việc duyệt chi và đối soát doanh thu.
* Không đánh giá chính xác hiệu suất làm việc (KPI) của nhân viên sales và tư vấn.

---

### 2. Yêu cầu Hệ thống (System Requirements)

Hệ thống cần giải quyết 4 phân hệ cốt lõi sau:

#### Phân hệ 1: Quản lý Kho & Chuỗi cung ứng (Inventory Management)

* **Quản lý Sản phẩm:** Danh mục, thuộc tính (màu sắc, cấu hình), mã SKU, mã vạch (Barcode/QR code), quản lý IMEI/Serial Number cho đồ công nghệ.
* **Nghiệp vụ Kho:** Nhập kho (từ nhà cung cấp), Xuất kho (bán hàng/chuyển kho), Kiểm kê kho định kỳ, Cảnh báo tự động khi tồn kho dưới ngưỡng tối thiểu (Safety Stock).
* **Đồng bộ Tồn kho:** Khi có đơn hàng từ Website hoặc Kho thực tế, số lượng tồn kho tổng phải lập tức trừ theo thời gian thực (Realtime).

#### Phân hệ 2: Quản lý Bán hàng & Khách hàng (Sales & CRM)

* **Bán hàng tại điểm (POS):** Tạo hóa đơn nhanh, quét mã vạch, chọn phương thức thanh toán (Tiền mặt, VNPay/MOMO, Chuyển khoản), in hóa đơn.
* **Quản lý Khách hàng:** Lưu lịch sử mua hàng, tích điểm thành viên, phân hạng khách hàng (Đồng, Bạc, Vàng, Kim Cương).
* **Quản lý Đơn hàng (OMS):** Luồng trạng thái đơn: `Mới tạo` $\rightarrow$ `Đã xác nhận` $\rightarrow$ `Đang đóng gói` $\rightarrow$ `Đang giao` $\rightarrow$ `Thành công` / `Hủy đơn` / `Hoàn trả`.

#### Phân hệ 3: Quản lý Nhân sự & Phân quyền (HRM & RBAC)

* **Hồ sơ Nhân viên:** Lương cơ bản, phụ cấp, phòng ban, chức vụ.
* **Phân quyền truy cập (RBAC - Role-Based Access Control):**
* *Admin:* Toàn quyền hệ thống.
* *Quản lý Kho:* Chỉ có quyền Phân hệ Kho (xem, nhập, xuất, kiểm kho).
* *Thu ngân/Sales:* Chỉ có quyền Phân hệ POS và CRM.
* *Kế toán:* Xem báo cáo tài chính, duyệt thu/chi.


* **Chấm công & KPI:** Ghi nhận doanh số bán được của từng sales để tính hoa hồng động (% commission).

#### Phân hệ 4: Báo cáo & Phân tích (Business Intelligence Dashboard)

* **Báo cáo Doanh thu & Tỷ suất lợi nhuận:** Theo ngày/tuần/tháng, so sánh tăng trưởng giữa các kỳ.
* **Top Sản phẩm Bán chạy:** Báo cáo mặt hàng mang lại doanh thu/lợi nhuận cao nhất.
* **Báo cáo Công nợ:** Công nợ phải thu của khách hàng và công nợ phải trả cho Nhà cung cấp.

---

### 3. Yêu cầu Kỹ thuật Cần Đạt (Technical Deliverables)

Hệ thống của bạn phải đáp ứng các tiêu chuẩn kỹ thuật thực tế sau:

#### Architecture & Backend

* **Database Design:** Thiết kế Schema cơ sở dữ liệu chuẩn hóa (tối thiểu 12–15 bảng có quan hệ FK rõ ràng: `Users`, `Roles`, `Products`, `Categories`, `Inventories`, `StockMovements`, `Orders`, `OrderItems`, `Customers`, `Transactions`, v.v.).
* **RESTful API hoặc GraphQL:** Xây dựng bộ API đầy đủ CRUD, áp dụng Authentication (JWT, Refresh Token) & Authorization (Phân quyền theo Role/Permission).
* **Transaction Safety:** Đảm bảo tính toàn vẹn dữ liệu (ACID) khi thực hiện nghiệp vụ thanh toán và trừ kho (dùng Database Transactions, tránh tình trạng race condition khi 2 khách hàng mua cùng 1 sản phẩm cuối cùng).

#### Frontend / UI-UX

* **Admin Dashboard:** Giao diện quản trị phản hồi nhanh (Responsive), bảng dữ liệu hỗ trợ Phân trang (Pagination), Lọc (Filter), Tìm kiếm (Search), Xuất File (Excel/PDF).
* **POS Interface:** Giao diện bán hàng tối ưu thao tác bàn phím, tốc độ xử lý dưới 1 giây/thao tác.

#### Nâng cao (Optional/Bonus)

* Integration: Tích hợp Payment Gateway (VNPAY sandbox / Momo test environment).
* Realtime: Dùng WebSockets để thông báo đơn hàng mới hoặc cảnh báo hết hàng ngay lập tức trên màn hình Admin.

---

### 4. Lộ trình Triển khai Gợi ý (4 Sprints / 4 Phân đoạn)

| Sprint | Mục tiêu | Sản phẩm đầu ra (Deliverable) |
| --- | --- | --- |
| **Sprint 1** | Database & Authentication | DB Schema (ERD), API Auth (Login/Register/JWT), Middleware phân quyền RBAC. |
| **Sprint 2** | Quản lý Kho & Sản phẩm | API & UI CRUD Sản phẩm, Nhập/Xuất kho, tính toán tồn kho tự động. |
| **Sprint 3** | Bán hàng (POS/OMS) & Khách hàng | Giao diện POS, Luồng xử lý đơn hàng, Trừ tồn kho có Transaction, Tích điểm CRM. |
| **Sprint 4** | Dashboard, Báo cáo & Polish | Biểu đồ doanh thu (Chart.js/Recharts), Xuất báo cáo Excel, Đóng gói Docker & Deploy. |

---

### 5. Tiêu chí Đánh giá Dự án Hoàn thành

1. **Tính đúng đắn Nghiệp vụ:** Chạy đúng luồng `Nhập hàng` $\rightarrow$ `Bán hàng` $\rightarrow$ `Trừ kho` $\rightarrow$ `Ghi nhận doanh thu` $\rightarrow$ `Tính hoa hồng`.
2. **Tính Bảo mật:** Người dùng không đúng quyền sẽ bị chặn API (`403 Forbidden`).
3. **Chất lượng Mã nguồn:** Code tổ chức sạch theo mô hình Clean Architecture/MVC, có handle lỗi cẩn thận, DB được đánh Index phù hợp cho các truy vấn báo cáo.