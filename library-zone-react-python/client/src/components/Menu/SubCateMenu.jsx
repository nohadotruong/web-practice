import { ArrowLeft } from "lucide-react";
import React from "react";

export default function SubCateMenu({
  subMenu,
  setSubMenu,
}) {
  const subCategories = {
    1: [
      "Sách giáo khoa Tiểu học",
      "Sách giáo khoa THCS",
      "Sách giáo khoa THPT",
      "Sách tham khảo Toán",
      "Sách tham khảo Ngữ văn",
      "Sách tham khảo Ngoại ngữ",
      "Ôn thi Đại học",
      "Bài tập & Đề kiểm tra",
      "Sách luyện chữ đẹp",
    ],
    2: [
      "Manga Nhật Bản",
      "Comic Mỹ",
      "Manhwa Hàn Quốc",
      "Light Novel",
      "Truyện thiếu nhi",
      "Truyện cổ tích",
      "Truyện tranh Việt Nam",
      "Truyện tranh giáo dục",
      "Truyện tranh màu",
    ],
    3: [
      "Tiểu thuyết Việt Nam",
      "Tiểu thuyết phương Tây",
      "Tiểu thuyết Trung Quốc",
      "Truyện ngắn",
      "Thơ ca",
      "Tản văn",
      "Văn học kinh điển",
      "Văn học đương đại",
      "Phê bình văn học",
      "Tác phẩm đoạt giải",
    ],
    4: [
      "Kỹ năng giao tiếp",
      "Kỹ năng lãnh đạo",
      "Kỹ năng quản lý",
      "Phát triển bản thân",
      "Kỹ năng học tập",
      "Tư duy sáng tạo",
      "Kỹ năng viết & thuyết trình",
      "Kỹ năng mềm cho sinh viên",
      "Sách self-help",
    ],
    5: [
      "Quản trị kinh doanh",
      "Khởi nghiệp",
      "Đầu tư chứng khoán",
      "Phân tích tài chính",
      "Kế toán & Kiểm toán",
      "Marketing",
      "Bán hàng",
      "Kinh tế học",
      "Doanh nhân nổi tiếng",
      "Tài chính cá nhân",
    ],
    6: [
      "Lập trình Web",
      "Lập trình Mobile",
      "Trí tuệ nhân tạo",
      "Khoa học dữ liệu",
      "Mạng máy tính",
      "Điện tử & Viễn thông",
      "Vật lý",
      "Hóa học",
      "Sinh học",
      "Công nghệ mới",
    ],
    7: [
      "Tâm lý học ứng dụng",
      "Tâm lý trẻ em",
      "Tình yêu & Hôn nhân",
      "Nuôi dạy con",
      "Sách dành cho cha mẹ",
      "Kỹ năng gia đình",
      "Sức khỏe tinh thần",
      "Trị liệu tâm lý",
      "Tâm lý học đường",
    ],
    8: [
      "Tiếng Anh",
      "Tiếng Nhật",
      "Tiếng Hàn",
      "Tiếng Trung",
      "Tiếng Pháp",
      "Tiếng Đức",
      "Tiếng Tây Ban Nha",
      "Ngữ pháp & Từ vựng",
      "Sách luyện thi TOEIC",
      "Sách luyện thi IELTS",
      "Từ điển chuyên ngành",
    ],
    9: [
      "Lịch sử Việt Nam",
      "Lịch sử thế giới",
      "Chiến tranh & Cách mạng",
      "Danh nhân lịch sử",
      "Khảo cổ học",
      "Văn hóa dân gian",
      "Phong tục tập quán",
      "Địa lý & Du ký",
      "Tư liệu lịch sử",
    ],
    10: [
      "Sức khỏe thể chất",
      "Dinh dưỡng",
      "Y học cổ truyền",
      "Y học hiện đại",
      "Chăm sóc sức khỏe gia đình",
      "Thể dục thể thao",
      "Yoga & Thiền",
      "Sách nấu ăn",
      "Chế độ ăn kiêng",
      "Sống khỏe mỗi ngày",
    ],
    11: [
      "Âm nhạc",
      "Hội họa",
      "Điện ảnh",
      "Nhiếp ảnh",
      "Kiến trúc",
      "Thời trang",
      "Thiết kế đồ họa",
      "Sân khấu",
      "Mỹ thuật ứng dụng",
      "Văn hóa giải trí",
    ],
  };

  if (subMenu) {
    return (
      <div
        className={`rounded-xl h-full w-full
      bg-[var(--s-menu-bg)] p-3
      absolute sm:static
      ${subMenu ? "flex" : "hidden sm:flex"}
      flex flex-col gap-2`}
      >
        {subCategories[subMenu]?.map((sub, idx) => (
          <p
            key={idx}
            className="cursor-pointer
          text-[var(--s-menu-fg)]
          hover:font-[700]
          hover:text-[var(--s-menu-hover)]
          active:text-[var(--s-menu-active)]
          text-left w-fit"
          >
            {sub}
          </p>
        ))}
        <p
          className="flex items-center justify-center gap-1 text-[var(--s-menu-fg)] mt-auto cursor-pointer
        hover:text-[var(--s-menu-hover)]
        active:text-[var(--s-menu-active)]
        font-[700] underline text-[20px]"
          onClick={() => setSubMenu(null)}
        >
          <ArrowLeft />
          Quay lại
        </p>
      </div>
    );
  }
}
