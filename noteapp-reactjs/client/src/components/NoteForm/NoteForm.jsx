import React, { useState, useEffect } from "react";
// Import hàm tạo và cập nhật ghi chú từ file API
import {
  createNote,
  updateNoteById,
} from "../../api/notes";

// Import file CSS riêng cho NoteForm
import "./NoteForm.css";

// Component NoteForm để thêm hoặc sửa ghi chú
export default function NoteForm({
  isFormOpen, // ✅ Trạng thái mở/đóng form
  setFormOpen, // ✅ Hàm để thay đổi trạng thái form
  onNoteCreated, // ✅ Callback sau khi tạo ghi chú thành công
  onNoteUpdated, // ✅ Callback sau khi cập nhật ghi chú thành công
  initialData, // ✅ Dữ liệu ghi chú ban đầu (nếu đang sửa)
}) {
  // State lưu tiêu đề và nội dung ghi chú
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ✅ Khi có initialData (đang ở chế độ sửa), điền sẵn vào form
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  // Hàm để ẩn form khi bấm nút đóng
  function toggleForm() {
    setFormOpen((prev) => !prev);
  }

  // ✅ Nếu form chưa được mở thì không hiển thị gì cả
  if (!isFormOpen) return null;

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Ngăn reload trang mặc định

    try {
      if (initialData) {
        // Nếu đang sửa → gọi API cập nhật
        const res = await updateNoteById(initialData.id, {
          title,
          content,
        });

        // Nếu cập nhật thành công → gọi callback
        if (res && onNoteUpdated) onNoteUpdated();
      } else {
        // Nếu đang tạo mới → gọi API tạo ghi chú
        const res = await createNote({ title, content });

        // Nếu tạo thành công → gọi callback
        if (res && onNoteCreated) onNoteCreated();
      }

      // Sau khi thành công → reset form và đóng lại
      setTitle("");
      setContent("");
      setFormOpen(false);
    } catch (err) {
      console.error("Lỗi xử lý ghi chú:", err);
    }
  };

  // Giao diện form
  return (
    <div className="add-note__section mb-3 p-3 w-100 d-flex flex-column">
      {/* Nút đóng form */}
      <button
        className="btn btn-secondary ms-auto mb-3"
        onClick={toggleForm}
      >
        <i className="bi bi-x-lg"></i> {/* Icon đóng */}
      </button>

      {/* Form nhập ghi chú */}
      <form
        className="add__form w-100"
        onSubmit={handleSubmit}
      >
        {/* Ô nhập tiêu đề */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Ô nhập nội dung */}
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Nút Add/Update và Reset */}
        <div className="form__button d-flex">
          <button
            type="submit"
            className="btn btn-success w-100 me-1"
          >
            {initialData ? "Update" : "Add"}{" "}
            {/* Thay đổi theo chế độ */}
          </button>
          <button
            type="button"
            className="btn btn-warning w-100 ms-1"
            onClick={() => {
              setTitle("");
              setContent(""); // Reset form
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
