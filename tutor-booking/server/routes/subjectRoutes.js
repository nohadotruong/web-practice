// Import thư viện express
const express = require("express");
// Khởi tạo router
const router = express.Router();

// Import repository xử lý dữ liệu môn học
const SubjectRepository = require("../repositories/SubjectRepository");

// 🔵 Lấy tất cả các môn học
router.get("/", async (req, res) => {
  try {
    // Gọi hàm lấy danh sách môn học từ repository
    const subjects =
      await SubjectRepository.getAllSubjects();
    // Trả về dữ liệu dạng JSON
    res.json(subjects);
  } catch (err) {
    // Nếu có lỗi, ghi log và trả lỗi server
    console.error("Failed to get subjects:", err);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
});

// 🔵 Lấy thông tin môn học theo ID
router.get("/:id", async (req, res) => {
  try {
    // Lấy môn học theo ID (truyền từ URL param)
    const subject = await SubjectRepository.getSubjectById(
      req.params.id
    );

    // Nếu không tìm thấy môn học, trả về 404
    if (!subject) {
      return res
        .status(404)
        .json({ error: "Subject not found" });
    }

    // Trả về môn học tìm được
    res.json(subject);
  } catch (err) {
    console.error("Failed to get subject by ID:", err);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
});

// 🟢 Tạo mới một môn học
router.post("/", async (req, res) => {
  const { name } = req.body;

  // Kiểm tra xem có nhập tên môn học hay không
  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Subject name is required" });
  }

  try {
    // Gọi hàm tạo môn học trong repository
    const newSubject =
      await SubjectRepository.createSubject(name);
    // Trả về dữ liệu môn học vừa tạo với mã 201
    res.status(201).json(newSubject);
  } catch (err) {
    console.error("Failed to create subject:", err);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
});

// 🟡 Cập nhật tên môn học theo ID
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  // Kiểm tra hợp lệ tên mới
  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "Subject name is required" });
  }

  try {
    // Gọi hàm cập nhật môn học theo ID
    const updatedSubject =
      await SubjectRepository.updateSubjectById(
        req.params.id,
        name
      );

    // Nếu không tìm thấy môn học cần cập nhật, trả về 404
    if (!updatedSubject) {
      return res
        .status(404)
        .json({ error: "Subject not found" });
    }

    // Trả về môn học sau khi cập nhật
    res.json(updatedSubject);
  } catch (err) {
    console.error("Failed to update subject:", err);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
});

// 🔴 Xoá môn học theo ID
router.delete("/:id", async (req, res) => {
  try {
    // Kiểm tra môn học có tồn tại hay không
    const subject = await SubjectRepository.getSubjectById(
      req.params.id
    );
    if (!subject) {
      return res
        .status(404)
        .json({ error: "Subject not found" });
    }

    // Gọi hàm xoá môn học trong repository
    await SubjectRepository.deleteSubjectById(
      req.params.id
    );
    // Trả về thông báo xoá thành công
    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    console.error("Failed to delete subject:", err);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
});

// Export router để sử dụng trong ứng dụng
module.exports = router;
