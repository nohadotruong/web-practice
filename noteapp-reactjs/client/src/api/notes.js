// Định nghĩa hàm bất đồng bộ để lấy toàn bộ ghi chú từ server
export async function fetchNotes() {
  try {
    // Gửi yêu cầu HTTP GET đến API endpoint để lấy danh sách ghi chú
    const res = await fetch(
      "http://localhost:5000/api/notes"
    );

    // Nếu mã phản hồi không nằm trong khoảng 200-299, xem là lỗi
    if (!res.ok) {
      console.error("Lỗi khi fetch notes:", res.status); // Ghi log lỗi
      return null; // Trả về null nếu lỗi
    }

    // Chuyển đổi phản hồi JSON thành đối tượng/mảng JavaScript
    const data = await res.json();
    return data; // Trả về mảng ghi chú
  } catch (error) {
    // Bắt lỗi mạng hoặc lỗi không xác định
    console.error("Lỗi mạng khi fetch notes:", error);
    return null; // Trả về null nếu lỗi
  }
}

// Lấy ghi chú theo ID cụ thể từ server
export async function getNoteById(id) {
  try {
    // Gửi yêu cầu HTTP GET đến API endpoint có chứa id
    const res = await fetch(
      `http://localhost:5000/api/notes/${id}`
    );

    // Nếu phản hồi lỗi
    if (!res.ok) {
      console.error("Lỗi khi fetch ghi chú:", res.status);
      return null;
    }

    // Trả về dữ liệu ghi chú sau khi parse JSON
    return await res.json();
  } catch (err) {
    console.error("Lỗi mạng:", err);
    return null; // Trả về null nếu lỗi
  }
}

// Tạo ghi chú mới
export async function createNote(noteData) {
  try {
    // Gửi yêu cầu POST đến server để tạo ghi chú
    const res = await fetch(
      "http://localhost:5000/api/notes",
      {
        method: "POST", // Sử dụng phương thức POST
        headers: {
          "Content-Type": "application/json", // Định dạng dữ liệu gửi là JSON
        },
        body: JSON.stringify(noteData), // Chuyển object ghi chú thành chuỗi JSON
      }
    );

    // Kiểm tra nếu có lỗi từ phía server
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Lỗi khi tạo note:", errorData);
      // Có thể throw error nếu muốn xử lý ngoài component
    }

    // Trả về ghi chú đã tạo
    const data = await res.json();
    return data;
  } catch (error) {
    // Bắt lỗi mạng hoặc lỗi hệ thống
    console.error("Lỗi mạng hoặc hệ thống:", error.message);
    // Có thể throw error ra ngoài nếu cần xử lý riêng
  }
}

// Cập nhật ghi chú theo ID
export async function updateNoteById(id, noteData) {
  try {
    // Gửi yêu cầu PUT đến server để cập nhật ghi chú
    const res = await fetch(
      `http://localhost:5000/api/notes/${id}`,
      {
        method: "PUT", // Sử dụng phương thức PUT để cập nhật
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData), // Dữ liệu cập nhật được chuyển thành JSON
      }
    );

    // Nếu server phản hồi không thành công
    if (!res.ok) throw new Error("Update failed");

    // Trả về ghi chú đã cập nhật
    return res.json();
  } catch (error) {
    console.error("Lỗi cập nhật ghi chú:", error);
    return null; // Trả về null nếu lỗi
  }
}

// Xoá ghi chú theo ID
export async function deleteNoteById(id) {
  try {
    // Gửi yêu cầu DELETE đến server
    const res = await fetch(
      `http://localhost:5000/api/notes/${id}`,
      {
        method: "DELETE",
      }
    );

    // Kiểm tra nếu xoá không thành công
    if (!res.ok) {
      console.error("Lỗi khi xoá ghi chú:", res.status);
      return false; // Trả về false để biết là thất bại
    }

    return true; // Trả về true nếu xoá thành công
  } catch (error) {
    console.error("Lỗi mạng khi xoá ghi chú:", error);
    return false; // Trả về false nếu lỗi
  }
}
