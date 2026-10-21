// Import các hook từ React
import React, { useEffect, useState } from "react";

// Import hàm gọi API để lấy danh sách ghi chú từ server
import { fetchNotes } from "../../api/notes";

// Import các component con dùng trong Home
import NoteForm from "../../components/NoteForm/NoteForm";
import NoteTable from "../../components/NoteTable/NoteTable";

// Import CSS riêng cho trang Home
import "./Home.css";

// Component chính cho trang chủ của ứng dụng Note
export default function Home() {
  // State dùng để điều khiển việc hiển thị hoặc ẩn form tạo mới ghi chú
  const [isFormOpen, setFormOpen] = useState(false);

  // State lưu danh sách tất cả các ghi chú
  const [notes, setNotes] = useState([]);

  // Hàm bất đồng bộ để gọi API lấy danh sách ghi chú từ server
  const loadNotes = async () => {
    const data = await fetchNotes(); // Gọi API lấy dữ liệu
    if (data) setNotes(data); // Cập nhật state nếu có dữ liệu
  };

  // useEffect chỉ chạy 1 lần khi component được mount vào DOM
  useEffect(() => {
    loadNotes(); // Gọi hàm để tải dữ liệu ghi chú
  }, []); // [] nghĩa là chỉ chạy 1 lần duy nhất

  // Hàm để toggle trạng thái hiển thị form (mở hoặc đóng form)
  function toggleForm() {
    setFormOpen((prev) => !prev); // Đảo ngược giá trị boolean
  }

  // Trả về giao diện UI của component
  return (
    <div className="container app__container w-100">
      {/* Phần tiêu đề đầu trang */}
      <div className="app__header p-3 d-flex align-items-center justify-content-center">
        <h1 className="m-0 p-0">Note App</h1>
      </div>

      {/* Form thêm ghi chú mới, chỉ hiển thị khi isFormOpen = true */}
      {isFormOpen && (
        <NoteForm
          isFormOpen={isFormOpen} // Truyền trạng thái form
          setFormOpen={setFormOpen} // Truyền hàm để đóng form sau khi thêm
          onNoteCreated={loadNotes} // Gọi lại loadNotes sau khi tạo thành công
        />
      )}

      {/* Hiển thị danh sách các ghi chú dưới dạng bảng */}
      <NoteTable
        notes={notes} // Truyền dữ liệu ghi chú vào bảng
        onDeleteSuccess={loadNotes} // Gọi lại loadNotes sau khi xoá ghi chú
      />

      {/* Nút hình dấu "+" để mở form tạo ghi chú mới */}
      <div className="add__button">
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center"
          onClick={toggleForm} // Khi bấm thì mở hoặc đóng form
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
}
