"use client";

import { House, TextAlignJustify } from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import HeaderSubMenu from "../HeaderSubMenu";

export default function Header() {
  const { userInfo } = useContext(UserContext);
  const [sMenu, setSMenu] = useState("");

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
        bg-[var(--header-3-bg)] text-[var(--header-fg)]
        flex items-center justify-end gap-1 sm:gap-3
        transition-all duration-300 ease-in-out"
      >
        <button
          className="text-[16px] border-b-2 sm:px-2
          flex items-center gap-1 sm:gap-2 h-full cursor-pointer
          border-[var(--header-3-bg)] hover:border-[var(--header-3-fg)]
          hover:bg-[var(--header-btn-3-hover-bg)]
          active:bg-[var(--header-btn-3-active-bg)]
          transition-all duration-300 ease-in-out"
          onClick={() => (window.location.href = "/")}
        >
          <House />
          <p>Trở về trang chính</p>
        </button>
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

          <h2
            className="text-[50px] text-[var(--light-brown-color)] 
            flex"
          >
            Trang quản trị
          </h2>
        </div>

        <div
          className="flex flex-1 justify-end 
          gap-1 sm:gap-3 h-full"
        >
          <button
            className="flex justify-center items-center gap-1 p-1 sm:p-2 
          text-[18px] text-nowrap h-full cursor-pointer
          text-[var(--light-brown-color)]
          border-b-3 border-[var(--header-bg)] 
          hover:border-[var(--header-fg)] 
          hover:bg-[var(--header-btn-hover-bg)]
          active:bg-[var(--header-btn-active-bg)]
          transition-all duration-300 ease-in-out"
            onClick={() => setSMenu("admin")}
            title="Menu"
          >
            <TextAlignJustify size={30} />
          </button>
        </div>

        <HeaderSubMenu sMenu={sMenu} setSMenu={setSMenu} />
      </div>
    </div>
  );
}
