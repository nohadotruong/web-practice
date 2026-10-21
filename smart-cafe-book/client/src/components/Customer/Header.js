"use client";

import {
  Bell,
  BellRing,
  BookA,
  ChevronDown,
  House,
  LogIn,
  Search,
  UserRoundPlus,
  UserRound,
  Utensils,
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import HeaderSubMenu from "../HeaderSubMenu";

export default function Header() {
  const notificationCount = 0;
  const { userInfo } = useContext(UserContext);
  const [sMenu, setSMenu] = useState("");

  useEffect(() => {
    if (userInfo) console.log(userInfo);
  }, [userInfo]);

  const navMenus = [
    {
      title: "Trang chủ",
      icon: (
        <House
          size={25}
          className="flex sm:hidden lg:flex"
        />
      ),
    },
    {
      title: "Thực đơn",
      icon: (
        <Utensils
          size={25}
          className="flex sm:hidden lg:flex"
        />
      ),
    },
    {
      title: "Tủ sách",
      icon: (
        <BookA
          size={25}
          className="flex sm:hidden lg:flex"
        />
      ),
    },
    {
      title: "Tìm kiếm",
      icon: (
        <Search
          size={25}
          className="flex sm:hidden lg:flex"
        />
      ),
    },
  ];

  const guestMenus = [
    {
      title: "Đăng ký",
      click: () => (window.location.href = "/register"),
      icon: <UserRoundPlus />,
    },
    {
      title: "Đăng nhập",
      click: () => (window.location.href = "/login"),
      icon: <LogIn />,
    },
  ];

  const userMenus = [
    {
      name: "notification",
      title: `Thông báo`,
      icon:
        notificationCount > 0 ? (
          <BellRing
            size={16}
            strokeWidth={0}
            fill="currentColor"
          />
        ) : (
          <Bell size={16} />
        ),
      notification: notificationCount,
    },
    {
      name: "account",
      title:
        userInfo?.firstName ||
        userInfo?.username ||
        "Tài khoản",
      icon: <UserRound size={16} />,
    },
  ];

  return (
    <div
      className="h-[100px] w-full 
      fixed top-0 left-0 right-0
      flex flex-col justify-center
      bg-[var(--header-bg)] text-[var(--header-fg)]
      transition-all duration-300 ease-in-out"
    >
      <div
        className="h-[35px] 
        px-3 sm:px-5 md:px-6 xl:px-[5%]
        bg-[var(--header-2-bg)] text-[var(--header-fg)]
        flex items-center justify-end gap-1 sm:gap-3
        transition-all duration-300 ease-in-out"
      >
        {userInfo
          ? userMenus.map(
              ({ name, title, icon, notification }) => (
                <div key={title} className="h-full">
                  <button
                    title={title}
                    className={`text-[16px] border-b-2 sm:px-2
                    flex items-center gap-1 sm:gap-2 h-full cursor-pointer
                    border-[var(--header-2-bg)] hover:border-[var(--header-2-fg)]
                    hover:bg-[var(--header-btn-2-hover-bg)]
                    active:bg-[var(--header-btn-2-active-bg)]
                    ${
                      sMenu === name &&
                      "bg-[var(--header-btn-2-active-bg)]"
                    }
                    transition-all duration-300 ease-in-out`}
                    onClick={() => {
                      setSMenu((prev) =>
                        prev === name ? "" : name
                      );
                    }}
                  >
                    {icon}
                    <p>{title}</p>
                    {notification > 0 && (
                      <p
                        className="rounded-full px-1
                      bg-[var(--header-fg)] text-[var(--header-bg)]"
                      >
                        {notification}
                      </p>
                    )}
                  </button>

                  <HeaderSubMenu
                    sMenu={sMenu}
                    setSMenu={setSMenu}
                  />
                </div>
              )
            )
          : guestMenus.map(({ title, icon, click }) => (
              <button
                key={title}
                title={title}
                className="text-[16px] border-b-2 sm:px-2
                flex items-center gap-1 sm:gap-2 h-full cursor-pointer
                border-[var(--header-2-bg)] hover:border-[var(--header-2-fg)]
                hover:bg-[var(--header-btn-2-hover-bg)]
                active:bg-[var(--header-btn-2-active-bg)]
                transition-all duration-300 ease-in-out"
                onClick={click}
              >
                <p>{title}</p>
                {icon}
              </button>
            ))}
      </div>

      <div
        className="h-[65px] w-full 
        flex items-center gap-2 relative
        px-2 sm:px-4 md:px-6 xl:px-[5%]
        bg-[var(--header-bg)] text-[var(--header-fg)]
        transition-all duration-300 ease-in-out"
      >
        <div
          className="flex gap-3 items-center
          absolute bottom-[10px] cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-[80px] w-auto"
          />

          <h1
            className="text-[50px] text-[var(--light-brown-color)]
            hidden md:flex font-ravi"
          >
            CofBook
          </h1>
        </div>

        <div
          className="flex flex-1 justify-end 
          gap-1 sm:gap-3 h-full"
        >
          {navMenus.map(({ title, icon }) => (
            <button
              key={title}
              title={title}
              className="flex justify-center items-center gap-1 p-1 sm:p-2 text-[18px] text-nowrap h-full cursor-pointer
              border-b-3 border-[var(--header-bg)] 
              hover:border-[var(--header-fg)]
              hover:bg-[var(--header-btn-hover-bg)]
              active:bg-[var(--header-btn-active-bg)]
              transition-all duration-300 ease-in-out"
            >
              {icon}
              <p className="hidden sm:flex">{title}</p>
              <ChevronDown />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
