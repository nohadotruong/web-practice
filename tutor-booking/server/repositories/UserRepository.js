const db = require("../db");
const bcrypt = require("bcrypt"); // Thư viện để mã hóa và so sánh mật khẩu

const UserRepository = {
  // Hàm đăng nhập người dùng
  async signInUser({ username, password }) {
    const res = await db.query(
      "SELECT id, password FROM users WHERE username = $1",
      [username]
    );

    // Nếu không tìm thấy người dùng
    if (res.rowCount === 0) {
      return { success: false, message: "No user found!" };
    }

    const storedPw = res.rows[0].password;

    // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB
    const isMatch = await bcrypt.compare(
      password,
      storedPw
    );
    if (!isMatch) {
      return {
        success: false,
        message: "Incorrect password!",
      };
    }

    // Đăng nhập thành công, trả về userId
    return { success: true, userId: res.rows[0].id };
  },

  // Hàm đăng ký người dùng mới
  async signUpUser({
    username,
    password,
    fullname,
    phone,
    role,
    subject_id,
  }) {
    try {
      // Mã hóa mật khẩu trước khi lưu vào database
      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      const res = await db.query(
        `INSERT INTO users 
        (username, password, fullname, phone, role, subject_id) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
          username,
          hashedPassword,
          fullname,
          phone,
          role,
          subject_id,
        ]
      );

      // Trả về thông tin người dùng vừa tạo
      return res.rows[0];
    } catch (err) {
      // Nếu username đã tồn tại (lỗi mã 23505 của PostgreSQL)
      if (err.code === "23505") {
        return {
          code: 1001,
          error: "Username already exists",
        };
      }

      // Lỗi không xác định khác
      return {
        code: 1000,
        error: "Internal Server Error",
      };
    }
  },

  // Lấy người dùng theo ID
  async getUserById(id) {
    const res = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },

  // Lấy danh sách người dùng theo vai trò (role: student, tutor, admin,...)
  async getUserByRole(role) {
    const res = await db.query(
      "SELECT * FROM users WHERE role = $1 ORDER BY id ASC",
      [role]
    );
    return res.rows;
  },

  // Lấy danh sách người dùng theo môn học phụ trách
  async getUserBySubjectId(subject_id) {
    const res = await db.query(
      "SELECT * FROM users WHERE subject_id = $1 ORDER BY id ASC",
      [subject_id]
    );
    return res.rows;
  },

  // Lấy tất cả người dùng
  async getAllUsers() {
    const res = await db.query(
      "SELECT * FROM users ORDER BY id ASC"
    );
    return res.rows;
  },

  // Cập nhật thông tin người dùng theo ID
  async updateUserById(id, data) {
    // Nếu có mật khẩu mới thì mã hóa, nếu không thì giữ nguyên mật khẩu cũ
    let hashedPassword = data.password;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const res = await db.query(
      `UPDATE users 
       SET username = $1, password = $2, fullname = $3, phone = $4, role = $5, subject_id = $6 
       WHERE id = $7 
       RETURNING *`,
      [
        data.username,
        hashedPassword,
        data.fullname,
        data.phone,
        data.role,
        data.subject_id || null,
        id,
      ]
    );

    return res.rows[0];
  },

  // Xóa người dùng theo ID
  async deleteUserById(id) {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
  },
};

module.exports = UserRepository;
