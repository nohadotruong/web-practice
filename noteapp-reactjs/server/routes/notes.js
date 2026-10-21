// Import Express để tạo route
const express = require("express");

// Khởi tạo đối tượng router để định nghĩa các đường dẫn liên quan đến /api/notes
const router = express.Router();

// Import NoteRepository để gọi các hàm thao tác với CSDL (PostgreSQL)
const NoteRepository = require("../repositories/NoteRepository");

// Route GET /api/notes → Trả về toàn bộ danh sách ghi chú
router.get("/", async (req, res) => {
  // Gọi hàm lấy toàn bộ ghi chú từ NoteRepository
  const notes = await NoteRepository.getAll();
  // Trả về kết quả dưới dạng JSON
  res.json(notes);
});

// Route GET /api/notes/:id → Trả về ghi chú có ID tương ứng
router.get("/:id", async (req, res) => {
  // Lấy ghi chú theo ID từ repository (req.params.id lấy từ URL)
  const note = await NoteRepository.getById(req.params.id);

  // Nếu tìm thấy ghi chú, trả về ghi chú đó
  if (note) res.json(note);
  // Nếu không tìm thấy, trả về lỗi 404
  else res.status(404).json({ errors: "Not found" });
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = await NoteRepository.create({
      title,
      content,
    });
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Error creating note:", err);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const updated = await NoteRepository.update(
    req.params.id,
    req.body
  );
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await NoteRepository.delete(req.params.id);
  res.status(204).end();
});

// Xuất router để sử dụng trong server chính (index.js)
module.exports = router;
