// Kết nối đến cơ sở dữ liệu PostgreSQL từ file db.js
const db = require("../db");

// Đối tượng chứa các hàm thao tác với bảng bookings
const BookingRepository = {
  // Tạo một lịch học mới (booking)
  async createBooking(data) {
    const res = await db.query(
      `INSERT INTO bookings 
       (student_id, tutor_id, subject_id, start_date, end_date, study_time, study_days, duration, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`, // Trả về dòng dữ liệu vừa thêm
      [
        data.student_id, // ID học sinh
        data.tutor_id, // ID gia sư
        data.subject_id, // ID môn học
        data.start_date, // Ngày bắt đầu
        data.end_date, // Ngày kết thúc
        data.study_time, // Giờ học mỗi buổi
        data.study_days, // Mảng ngày học (Mon, Wed,...)
        data.duration, // Thời lượng mỗi buổi
        data.status, // Trạng thái booking ('pending', 'confirmed', 'cancelled')
      ]
    );
    return res.rows[0]; // Trả về dòng dữ liệu đầu tiên
  },

  // Lấy thông tin lịch học theo ID
  async getBookingById(id) {
    const res = await db.query(
      "SELECT * FROM bookings WHERE id = $1", // Truy vấn theo ID
      [id]
    );
    return res.rows[0]; // Trả về kết quả đầu tiên (nếu có)
  },

  // Lấy danh sách các lịch học theo tutor_id (gia sư)
  async getBookingsByTutorId(tutor_id) {
    const res = await db.query(
      "SELECT * FROM bookings WHERE tutor_id = $1 ORDER BY id ASC", // Lấy theo gia sư
      [tutor_id]
    );
    return res.rows; // Trả về mảng các kết quả
  },

  // Lấy danh sách lịch học theo student_id (học sinh)
  async getBookingsByStudentId(student_id) {
    const res = await db.query(
      "SELECT * FROM bookings WHERE student_id = $1 ORDER BY id ASC", // Lấy theo học sinh
      [student_id]
    );
    return res.rows; // Trả về danh sách kết quả
  },

  // Lấy toàn bộ danh sách lịch học
  async getAllBookings() {
    const res = await db.query(
      "SELECT * FROM bookings ORDER BY id ASC" // Lấy tất cả, sắp xếp theo ID
    );
    return res.rows;
  },

  // Cập nhật thông tin lịch học theo ID
  async updateBookingById(id, data) {
    const res = await db.query(
      `UPDATE bookings 
       SET student_id = $1, tutor_id = $2, subject_id = $3, start_date = $4, 
           end_date = $5, study_time = $6, study_days = $7, duration = $8, status = $9
       WHERE id = $10
       RETURNING *`, // Trả về dòng đã cập nhật
      [
        data.student_id, // ID học sinh mới
        data.tutor_id, // ID gia sư mới
        data.subject_id, // Môn học mới
        data.start_date, // Ngày bắt đầu mới
        data.end_date, // Ngày kết thúc mới
        data.study_time, // Giờ học mới
        data.study_days, // Ngày học mới
        data.duration, // Thời lượng mới
        data.status, // Trạng thái mới
        id, // ID booking cần cập nhật
      ]
    );
    return res.rows[0]; // Trả về kết quả cập nhật
  },

  // Xóa lịch học theo ID
  async deleteBookingById(id) {
    await db.query(
      "DELETE FROM bookings WHERE id = $1", // Xóa theo ID
      [id]
    );
    // Không trả về gì vì chỉ xóa
  },
};

// Xuất module để sử dụng ở nơi khác (controller, route, ...)
module.exports = BookingRepository;
