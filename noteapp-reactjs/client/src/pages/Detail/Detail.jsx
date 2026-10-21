// Import React và các hook cần thiết từ thư viện react
import React, { useEffect, useState } from "react";
import {
  useParams, // Dùng để lấy tham số từ URL (ví dụ: id của note)
  Link, // Dùng để điều hướng nội bộ trong app
  useNavigate, // Dùng để chuyển trang (navigate programmatically)
} from "react-router-dom";
import {
  getNoteById, // Hàm gọi API lấy ghi chú theo ID
  deleteNoteById, // Hàm gọi API để xoá ghi chú theo ID
} from "../../api/notes";

// Import component NoteForm để chỉnh sửa ghi chú
import NoteForm from "../../components/NoteForm/NoteForm";

// Import CSS riêng cho trang Detail
import "./Detail.css";

export default function Detail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [note, setNote] = useState(null); // State lưu thông tin ghi chú
  const [isFormOpen, setFormOpen] = useState(false); // State kiểm soát hiển thị form sửa
  const navigate = useNavigate(); // Dùng để điều hướng

  // useEffect gọi API khi component được mount hoặc khi id thay đổi
  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNoteById(id); // Gọi API lấy dữ liệu
      setNote(data); // Lưu vào state
    };

    fetchNote();
  }, [id]);

  // Hàm xử lý xoá ghi chú
  async function deleteNote(id) {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xoá ghi chú này?"
    );
    if (!confirm) return; // Nếu người dùng không đồng ý thì thoát

    const success = await deleteNoteById(id); // Gọi API xoá
    if (success) {
      alert("Đã xoá ghi chú.");
      navigate("/"); // ✅ Quay về trang chủ nếu xoá thành công
    } else {
      alert("Xoá thất bại.");
    }
  }

  // Nếu note chưa load xong thì hiển thị đang tải
  if (!note) return <div>Đang tải ghi chú...</div>;

  // Hàm để toggle (ẩn/hiện) form chỉnh sửa
  function toggleForm() {
    setFormOpen((prev) => !prev);
  }

  return (
    <div className="container d-flex flex-column detail__container p-4 d-flex align-items-center justify-content-center">
      {/* Component form để chỉnh sửa ghi chú */}
      <NoteForm
        isFormOpen={isFormOpen}
        setFormOpen={setFormOpen}
        initialData={note} // Dữ liệu ban đầu để điền vào form
        onNoteUpdated={async () => {
          const updated = await getNoteById(id); // Sau khi cập nhật, reload dữ liệu
          setNote(updated);
        }}
      />

      {/* Nội dung ghi chú được hiển thị tại đây */}
      <div className="detail__content w-100 p-3">
        <h2>Title: {note.title}</h2>
        <p>
          <b>Note:</b> {note.content}
        </p>

        {/* Các nút chức năng: sửa, xoá, quay lại */}
        <div className="button__section d-flex flex-column">
          <button
            className="btn btn-warning mb-1 w-100"
            onClick={toggleForm} // Mở form sửa
          >
            Edit note
            <i className="bi bi-pencil-square ms-2"></i>
          </button>

          <button
            className="btn btn-danger mb-1 w-100"
            title="Delete note"
            onClick={() => deleteNote(note.id)} // Xoá ghi chú
          >
            Delete note
            <i className="bi bi-trash ms-2"></i>
          </button>

          <Link
            to="/"
            className="btn btn-secondary mb-1 w-100"
          >
            Return Home <i className="bi bi-house"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
