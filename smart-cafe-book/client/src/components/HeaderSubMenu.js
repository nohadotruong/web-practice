"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  Heart,
  Home,
  Lock,
  LogOut,
  PanelsTopLeft,
  ScrollText,
  Settings,
  UserCheck,
  UserRound,
  UserRoundCog,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export default function HeaderSubMenu({ sMenu, setSMenu }) {
  const { userInfo } = useContext(UserContext);
  const [notification, setNotification] = useState([]);

  const accountMenu = [
    userInfo?.role === 2 && {
      title: "Trang quản trị",
      icon: <PanelsTopLeft />,
      click: () => (window.location.href = "/admin"),
    },
    {
      title: "Thông tin tài khoản",
      icon: <UserRound />,
    },
    {
      title: "Yêu thích",
      icon: <Heart />,
    },
    {
      title: "Đơn hàng",
      icon: <ScrollText />,
    },
    {
      title: "Đổi mật khẩu",
      icon: <Lock />,
    },
    {
      title: "Cài đặt",
      icon: <UserRoundCog />,
    },
    {
      title: "Đăng xuất",
      icon: <LogOut />,
      click: () => {
        setSMenu("");
        localStorage.removeItem("userToken");
        window.location.reload();
      },
    },
  ];

  const adminMenu = [
    {
      title: "Trang chủ",
      icon: <Home />,
    },
    {
      title: "Quản lý thực đơn",
      icon: <UtensilsCrossed />,
    },
    {
      title: "Quản lý sách",
      icon: <BookOpen />,
    },
    {
      title: "Quản lý hóa đơn",
      icon: <FileText />,
    },
    {
      title: "Quản lý nhân viên",
      icon: <Users />,
    },
    {
      title: "Quản lý khách hàng",
      icon: <UserCheck />,
    },
    {
      title: "Thống kê doanh thu",
      icon: <BarChart3 />,
    },
    {
      title: "Tùy chỉnh trang web",
      icon: <Settings />,
    },
    {
      title: "Đăng xuất",
      icon: <LogOut />,
      click: () => {
        setSMenu("");
        localStorage.removeItem("userToken");
        window.location.reload();
      },
    },
  ];

  const display = [
    {
      key: "notification",
      title: "Thông báo",
      content:
        notification.length > 0 ? (
          <div>{notification}</div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-nowrap text-[25px] sm:text-[18px]">
              Bạn không có thông báo nào!
            </p>
          </div>
        ),
    },

    {
      key: "account",
      title:
        userInfo?.firstName ||
        userInfo?.username ||
        "Tài khoản",
      content: accountMenu.map(({ title, icon, click }) => (
        <button
          key={title}
          title={title}
          className="flex items-center gap-2
            border-1 w-full p-2 text-[18px]
            hover:bg-[var(--hsmenu-btn-hover-bg)]
            hover:border-[var(--hsmenu-btn-hover-bd)]
            active:bg-[var(--hsmenu-btn-active-bg)]
            rounded-2xl cursor-pointer
            transition-all duration-300 ease-in-out"
          onClick={click}
        >
          {icon}
          <p className="text-left text-nowrap">{title}</p>
        </button>
      )),
    },

    {
      key: "admin",
      title: "Quản trị viên",
      content: adminMenu.map(({ title, icon, click }) => (
        <button
          key={title}
          title={title}
          className="flex items-center gap-2
            border-1 w-full p-2 text-[18px]
            rounded-2xl cursor-pointer
            hover:bg-[var(--hsmenu-btn-hover-bg)]
            hover:border-[var(--hsmenu-btn-hover-bd)]
            active:bg-[var(--hsmenu-btn-active-bg)]
            transition-all duration-300 ease-in-out"
          onClick={click}
        >
          {icon}
          <p className="text-left text-nowrap">{title}</p>
        </button>
      )),
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-999
      flex transition-all duration-300 ease-in-out
      ${
        sMenu !== ""
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div
        className="hidden sm:flex flex-1"
        onClick={() => setSMenu("")}
      ></div>

      <div
        className={`flex flex-col justify-center overflow-hidden gap-3
        bg-[var(--header-smenu-bg)] p-4 w-full
        sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%]`}
      >
        <h2
          className="text-[40px] text-center text-nowrap
        w-full text-[var(--header-smenu-fg)]"
        >
          {display.find((item) => item.key === sMenu)
            ?.title || ""}
        </h2>

        <div
          className="flex flex-col gap-2
          items-center justify-start text-[var(--header-smenu-fg)]
          h-full overflow-y-auto"
        >
          {
            display.find((item) => item.key === sMenu)
              ?.content
          }
        </div>

        <button
          className="flex items-center justify-center gap-1
          text-[18px] text-[var(--header-smenu-fg)]
          hover:bg-[var(--hsmenu-btn-hover-bg)]
          hover:border-[var(--hsmenu-btn-hover-bd)]
          active:bg-[var(--hsmenu-btn-active-bg)]
          border-1 p-1 w-full rounded-full cursor-pointer
          transition-all duration-300 ease-in-out"
          onClick={() => setSMenu("")}
        >
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
}
