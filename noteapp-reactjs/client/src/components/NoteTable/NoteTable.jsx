// Import React để tạo component
import React from "react";
// Import Link để chuyển trang nội bộ, useNavigate để điều hướng (chưa dùng ở đây)
import { Link, useNavigate } from "react-router-dom";
// Import hàm xoá ghi chú theo ID từ API
import { deleteNoteById } from "../../api/notes";

// Import CSS riêng cho bảng ghi chú
import "./NoteTable.css";

// Component NoteTable nhận props từ component cha:
// - notes: danh sách ghi chú để hiển thị
// - onDeleteSuccess: hàm callback để reload lại danh sách sau khi xoá thành công
export default function NoteTable({
  notes,
  onDeleteSuccess,
}) {
  // Hàm xử lý xoá ghi chú
  async function deleteNote(id) {
    // Hỏi người dùng có chắc muốn xoá không
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xoá ghi chú này?"
    );
    if (!confirm) return; // Nếu người dùng không đồng ý thì thoát luôn

    // Gọi API xoá ghi chú
    const success = await deleteNoteById(id);
    if (success) {
      alert("Đã xoá ghi chú.");
      // Nếu xoá thành công → gọi callback từ cha để reload lại danh sách
      onDeleteSuccess?.(); // optional chaining (nếu có thì gọi)
    } else {
      alert("Xoá thất bại.");
    }
  }

  return (
    // Vùng chứa bảng ghi chú, có padding và full chiều rộng
    <div className="note__section m-0 p-3 w-100">
      {/* Bảng hiển thị danh sách các ghi chú */}
      <table className="table table-hover align-middle text-center table-striped note__table">
        {/* Phần đầu bảng */}
        <thead>
          <tr>
            <th scope="col">#</th> {/* Số thứ tự */}
            <th scope="col">Title</th> {/* Cột tiêu đề */}
            <th scope="col">Content</th>{" "}
            {/* Cột nội dung */}
            <th scope="col">Option</th>{" "}
            {/* Cột chứa nút xem/xoá */}
          </tr>
        </thead>

        {/* Phần thân bảng */}
        <tbody className="table-group-divider">
          {/* Nếu có ghi chú → duyệt qua và render từng dòng */}
          {notes && notes.length > 0 ? (
            notes.map((note, index) => (
              <tr key={note.id}>
                {" "}
                {/* Mỗi dòng tương ứng với một ghi chú */}
                <th scope="row">{index + 1}</th>{" "}
                {/* STT bắt đầu từ 1 */}
                {/* Cột tiêu đề */}
                <td>{note.title}</td>
                {/* Cột nội dung: giới hạn chiều rộng, nếu dài quá sẽ bị cắt và hiển thị dấu "..." */}
                <td
                  className="text-truncate"
                  style={{ maxWidth: "100px" }}
                >
                  {note.content}
                </td>
                {/* Cột tuỳ chọn: chứa các nút hành động */}
                <td>
                  {/* Nút xem chi tiết, dùng Link để điều hướng đến trang /detail/:id */}
                  <Link
                    className="btn btn-primary"
                    to={`/detail/${note.id}`}
                    title="View note"
                  >
                    <i className="bi bi-eye"></i>{" "}
                    {/* Icon hình con mắt */}
                  </Link>

                  {/* Nút xoá ghi chú */}
                  <button
                    className="btn btn-danger m-1"
                    title="Delete note"
                    onClick={() => deleteNote(note.id)} // Gọi hàm deleteNote khi bấm
                  >
                    <i className="bi bi-trash"></i>{" "}
                    {/* Icon thùng rác */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // Nếu không có ghi chú nào thì hiển thị dòng "No data"
            <tr>
              <td colSpan={4}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
