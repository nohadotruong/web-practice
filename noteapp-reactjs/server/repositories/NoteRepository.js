// Import kết nối cơ sở dữ liệu từ thư mục db (đã config trong db/index.js)
const db = require("../db");

// Khởi tạo đối tượng NoteRepository để quản lý các thao tác với bảng "notes"
const NoteRepository = {
  // ✅ LẤY TOÀN BỘ GHI CHÚ
  async getAll() {
    // Thực hiện truy vấn SQL để lấy tất cả bản ghi trong bảng notes, sắp xếp theo ID tăng dần
    const res = await db.query(
      "SELECT * FROM notes ORDER BY id ASC"
    );
    // Trả về mảng các bản ghi (res.rows chứa nhiều dòng)
    return res.rows;
  },

  // ✅ LẤY GHI CHÚ THEO ID
  async getById(id) {
    // Thực hiện truy vấn SQL có tham số để tránh SQL injection
    const res = await db.query(
      "SELECT * FROM notes WHERE id = $1",
      [id]
    );
    // Trả về dòng đầu tiên (vì ID là duy nhất)
    return res.rows[0];
  },

  // ✅ TẠO GHI CHÚ MỚI
  async create({ title, content }) {
    // Chèn bản ghi mới vào bảng notes với dữ liệu title và content
    // RETURNING * để trả về bản ghi vừa chèn
    const res = await db.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    return res.rows[0]; // Trả về bản ghi mới vừa thêm
  },

  // ✅ CẬP NHẬT GHI CHÚ THEO ID
  async update(id, note) {
    // Cập nhật bản ghi có ID tương ứng với nội dung mới (title + content)
    const result = await db.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [note.title, note.content, id]
    );
    return result.rows[0]; // Trả về bản ghi sau khi cập nhật
  },

  // ✅ XÓA GHI CHÚ THEO ID
  async delete(id) {
    // Xóa bản ghi có ID tương ứng
    await db.query("DELETE FROM notes WHERE id = $1", [id]);
    // Không trả về gì vì chỉ cần xóa là đủ
  },
};

// Xuất module NoteRepository để có thể sử dụng ở file routes hoặc controller
module.exports = NoteRepository;
