const db = require("../db"); // Kết nối tới database thông qua module db

const SubjectRepository = {
  // 🟢 Tạo mới môn học
  async createSubject(name) {
    // Thực hiện truy vấn để thêm môn học mới vào bảng "subjects"
    const res = await db.query(
      "INSERT INTO subjects (name) VALUES ($1) RETURNING *",
      [name]
    );

    // Trả về môn học vừa được tạo (bao gồm cả id)
    return res.rows[0];
  },

  // 🔵 Lấy tất cả môn học
  async getAllSubjects() {
    // Lấy tất cả các bản ghi trong bảng "subjects", sắp xếp theo id tăng dần
    const res = await db.query(
      "SELECT * FROM subjects ORDER BY id ASC"
    );

    // Trả về mảng các môn học
    return res.rows;
  },

  // 🔵 Lấy môn học theo ID
  async getSubjectById(id) {
    // Truy vấn tìm môn học theo id
    const res = await db.query(
      "SELECT * FROM subjects WHERE id = $1",
      [id]
    );

    // Trả về môn học đầu tiên (nếu tìm thấy)
    return res.rows[0];
  },

  // 🟡 Cập nhật tên môn học
  async updateSubjectById(id, name) {
    // Cập nhật tên môn học theo id, trả về dòng đã được cập nhật
    const res = await db.query(
      "UPDATE subjects SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    // Trả về thông tin môn học sau khi đã cập nhật
    return res.rows[0];
  },

  // 🔴 Xoá môn học
  async deleteSubjectById(id) {
    // Xoá môn học theo id khỏi bảng "subjects"
    await db.query("DELETE FROM subjects WHERE id = $1", [
      id,
    ]);
    // Không cần trả về gì
  },
};

// Export module để sử dụng ở các nơi khác trong dự án
module.exports = SubjectRepository;
