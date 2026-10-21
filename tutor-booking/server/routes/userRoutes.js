const express = require("express");
const router = express.Router();

// Import lớp xử lý logic nghiệp vụ liên quan đến người dùng
const UserRepository = require("../repositories/UserRepository");

// Middleware xác thực người dùng (kiểm tra token, lấy thông tin user từ token)
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * 🔵 [GET] /users
 * - Dùng cho Admin để lấy danh sách tất cả user
 * - Có thể lọc theo role: /users?role=tutor hoặc /users?role=student
 * - Phải xác thực token + kiểm tra quyền admin
 */
router.get("/", async (req, res) => {
  // Nếu không phải admin → chặn truy cập

  try {
    const { role } = req.query;
    const users = role
      ? await UserRepository.getUserByRole(role) // Lọc theo vai trò
      : await UserRepository.getAllUsers(); // Lấy tất cả
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users" });
  }
});

/**
 * 🔵 [GET] /users/me
 * - Lấy thông tin cá nhân của user đang đăng nhập
 */
router.get("/me", async (req, res) => {
  try {
    const user = await UserRepository.getUserById(
      req.user.id
    );

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching current user:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch current user" });
  }
});

/**
 * 🟢 [POST] /users
 * - Đăng ký tài khoản người dùng mới
 * - Không cần xác thực
 */
router.post("/", async (req, res) => {
  const {
    username,
    password,
    fullname,
    phone,
    role,
    subject_id, // chỉ cần với tutor
  } = req.body;

  try {
    const newUser = await UserRepository.signUpUser({
      username,
      password,
      fullname,
      phone,
      role,
      subject_id,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Sign up failed! ", err);
    res
      .status(500)
      .json({ error: "Internal server error!" });
  }
});

/**
 * 🟡 [PUT] /users/me
 * - Cập nhật thông tin cá nhân của user hiện tại
 * - Cần xác thực token
 */
router.put("/me", async (req, res) => {
  try {
    const currentUser = req.user;

    const updatedUser = await UserRepository.updateUserById(
      currentUser.id,
      req.body
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(500)
      .json({ error: "Failed to update user" });
  }
});

/**
 * 🔴 [DELETE] /users/:id
 * - Xóa user theo ID
 * - Chỉ admin được phép xóa
 */
router.delete("/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Access denied. Admins only." });
  }

  try {
    await UserRepository.deleteUserById(req.params.id);
    res.json({ message: "User deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete user." });
  }
});

module.exports = router;
