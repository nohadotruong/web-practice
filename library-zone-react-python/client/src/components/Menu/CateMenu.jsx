import {
  Baby,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  Compass,
  Cpu,
  Heart,
  HeartPulse,
  Landmark,
  Languages,
  Library,
  Palette,
} from "lucide-react";
import { useEffect } from "react";

export default function CateMenu({
  openMenu,
  subMenu,
  setSubMenu,
}) {
  const categories = [
    {
      id: 1,
      name: "Giáo khoa & Tham khảo",
      icon: <BookOpen />,
    },
    {
      id: 2,
      name: "Truyện tranh & Thiếu nhi",
      icon: <Baby />,
    },
    {
      id: 3,
      name: "Tiểu thuyết & Văn học",
      icon: <Library />,
    },
    {
      id: 4,
      name: "Kỹ năng & Phát triển",
      icon: <Compass />,
    },
    {
      id: 5,
      name: "Kinh doanh & Tài chính",
      icon: <Briefcase />,
    },
    {
      id: 6,
      name: "Công nghệ & Khoa học",
      icon: <Cpu />,
    },
    {
      id: 7,
      name: "Tâm lý & Gia đình",
      icon: <Heart />,
    },
    {
      id: 8,
      name: "Ngoại ngữ & Từ điển",
      icon: <Languages />,
    },
    {
      id: 9,
      name: "Lịch sử & Văn hóa",
      icon: <Landmark />,
    },
    {
      id: 10,
      name: "Sức khỏe & Đời sống",
      icon: <HeartPulse />,
    },
    {
      id: 11,
      name: "Nghệ thuật & Giải trí",
      icon: <Palette />,
    },
  ];

  return (
    <div
      className={`w-full sm:w-fit h-full rounded-xl bg-[var(--menu-bg)]
      ${openMenu ? "flex" : "hidden sm:flex"}
      flex-col justify-center p-2
      transition-all duration-300 ease-in-out`}
    >
      {categories.map((item, index) => (
        <button
          key={index}
          className="text-nowrap ps-2 py-1 rounded-lg
          flex justify-start gap-2 w-full m-auto
          bg-[var(--menu-btn-bg)] cursor-pointer
          text-[var(--menu-btn-fg)] font-[500]
          hover:bg-[var(--menu-btn-hover-bg)]
          active:bg-[var(--menu-btn-active-bg)]
          transition-all duration-300 ease-in-out"
          onClick={() => setSubMenu(item.id)}
        >
          {item.icon}
          <p
            className="hover:underline
            hover:text-[var(--menu-btn-hover-fg)]
            active:text-[var(--menu-btn-active-fg)]"
          >
            {item.name}
          </p>
          {subMenu === item.id ? (
            <ChevronsLeftIcon className="ms-auto" />
          ) : (
            <ChevronRight className="ms-auto" />
          )}
        </button>
      ))}
    </div>
  );
}
