import React, { useState } from "react";

import logo from "../../assets/Logo/logo.png";

import {
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

export default function HeaderBar({
  openMenu,
  setOpenMenu,
  setSubMenu,
}) {
  const [isSearch, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`flex items-center justify-center
      px-3 sm:px-4 h-[70px] py-[15px] w-full gap-2
      fixed top-0 left-0 right-0
      bg-[var(--header-bg)] text-[var(--header-fg)]
      border-[var(--header-bd)]
      transition-all duration-300 ease-in-out`}
    >
      <div
        className="flex items-center
        gap-2 px-2 w-fit h-full"
      >
        <img src={logo} className="h-full z-10" alt="" />
        <h1
          className="font-tagesschrift text-nowrap z-9
          opacity-0 lg:opacity-100 absolute lg:static
          text-[0px] lg:text-[30px] text-[var(--yellow-logo)] 
          transition-all duration-300 ease-in-out"
        >
          Library Zone
        </h1>
      </div>

      <button
        className="h-full p-0 md:px-2 rounded-xl
          flex items-center justify-center gap-2
          max-w-0 md:max-w-fit overflow-hidden
          absolute top-[-100px] left-[-100px] md:static opacity-0 md:opacity-100
          text-[var(--header-btn-fg)]
          bg-[var(--header-btn-bg)]
          cursor-pointer text-nowrap
          hover:bg-[var(--header-btn-hover-bg)]
          active:bg-[var(--header-btn-active-bg)]
          transition-all duration-300 ease-in-out"
        onClick={() => {
          setOpenMenu(!openMenu);
          setSubMenu(null);
        }}
      >
        <LayoutGrid size={25} />
        Danh mục
        {openMenu ? <ChevronUp /> : <ChevronDown />}
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex items-center 
        flex-1 h-full relative group"
      >
        <input
          type="text"
          placeholder="Hello"
          className="px-[40px] h-full w-full
          bg-[var(--header-ip-bg)] rounded-xl
          group-focus-within:bg-[var(--header-ip-focus-bg)]
          group-focus-within:text-[var(--header-ip-focus-fg)]
          text-[var(--header-ip-fg)]
          transition-all duration-300 ease-in-out"
          onFocus={() => setSearch(true)}
          onBlur={() => setSearch(false)}
          value={searchValue}
          onChange={handleChange}
        />

        <button
          type={searchValue == "" ? "button" : "submit"}
          className="absolute left-[10px] 
          group-focus-within:text-[var(--header-ip-focus-fg)]
          cursor-pointer
          transition-all duration-300 ease-in-out"
          onClick={() => setSearch(true)}
        >
          <Search />
        </button>

        {searchValue !== "" && (
          <button
            type="button"
            className="absolute right-[10px] cursor-pointer
            group-focus-within:text-[var(--header-ip-focus-fg)]
            transition-all duration-300 ease-in-out"
            onClick={() => setSearchValue("")}
          >
            <X />
          </button>
        )}
      </form>

      <button
        className="h-full px-2 rounded-xl
          flex items-center justify-end sm:justify-center gap-2
          text-[var(--header-btn-fg)] text-nowrap
          bg-[var(--header-btn-bg)] overflow-hidden
          cursor-pointer max-w-[50px] sm:max-w-fit
          hover:bg-[var(--header-btn-hover-bg)]
          active:bg-[var(--header-btn-active-bg)]
          transition-all duration-300 ease-in-out"
      >
        <p className="hidden sm:flex">Giỏ hàng</p>
        <ShoppingBag size={25} />
      </button>

      <button
        className="h-full p-0 sm:px-2 rounded-xl cursor-pointer
        flex items-center justify-center gap-2
        max-w-0 sm:max-w-fit overflow-hidden text-nowrap
        text-[var(--header-btn-fg)] bg-[var(--header-btn-bg)]
        hover:bg-[var(--header-btn-hover-bg)]
        active:bg-[var(--header-btn-active-bg)]
        transition-all duration-300 ease-in-out"
      >
        <p>Đăng nhập</p>
        <CircleUserRound size={25} />
      </button>
    </div>
  );
}
