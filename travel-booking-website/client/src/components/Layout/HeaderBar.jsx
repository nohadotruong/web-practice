import React from "react";

import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function HeaderBar({
  userInfo,
  darkMode,
  isTop,
  t,
  toggleMenu,
}) {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const headerBtn = [
    {
      status: "guest",
      title: t("header.signin"),
      text: t("header.signin"),
      icon: "",
      click: () => {
        navigate("/authentication");
        localStorage.setItem("action", "signin");
      },
    },
    {
      status: "guest",
      title: t("header.signup"),
      text: t("header.signup"),
      icon: "",
      click: () => {
        navigate("/authentication");
        localStorage.setItem("action", "signup");
      },
    },
    {
      status: "user",
      title: t("header.account"),
      text: userInfo?.fullname || t("commons.loading"),
      icon: "bi bi-person-circle",
      click: () => toggleMenu("account"),
    },
  ];

  return (
    <div
      className={`h-[70px] w-full px-3
      flex items-center  
      shadow-[var(--header-shadow)]
      transition-all duration-300 ease-in-out
      ${darkMode && "dark"}
      ${
        location === "/" && isTop
          ? "bg-glass text-[var(--header-glass-fg)]"
          : `bg-[var(--header-bg)]
          border-b-1 border-[var(--header-bd)]`
      }`}
    >
      <div
        className={`flex justify-center items-end
        h-fit cursor-pointer py-1 lg:px-3
        `}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="" className="h-[60px]" />
        <p className="text-[30px] text-[var(--logo-text)] font-[500] italic">
          TripGO
        </p>
      </div>

      <div className="ms-auto flex justify-center items-center gap-1">
        {headerBtn
          .filter((item) => {
            if (item.status === "guest") return !userInfo;
            if (item.status === "user") return !!userInfo;
            return false;
          })
          .map((item, index) => (
            <button
              key={index}
              className={`px-2 h-[40px]
              hidden sm:flex justify-center items-center gap-2
              text-[var(--header-btn-fg)] 
              rounded-xl border-1 
              shadow-[var(--header-btn-shadow)]
              hover:bg-[var(--header-btn-hover-bg)]
              hover:border-[var(--header-btn-hover-bd)]
              hover:shadow-[var(--header-btn-hover-shadow)]
              active:bg-[var(--header-btn-hover-bg)]
              transition-all duration-300 ease-in-out
              ${
                isTop
                  ? "bg-transparent"
                  : `bg-[var(--header-btn-bg)]
                  border-[var(--header-btn-bd)]`
              }`}
              title={item.title}
              onClick={item.click}
            >
              {item.icon !== "" && (
                <i
                  className={`${item.icon} text-[25px]`}
                ></i>
              )}
              {item.text !== "" && (
                <p className="">{item.text}</p>
              )}
            </button>
          ))}

        <button
          className={`px-2 h-[40px]
            flex sm:hidden justify-center items-center gap-2
            text-[var(--header-btn-fg)]
            rounded-xl border-1 
            shadow-[var(--header-btn-shadow)]
            hover:bg-[var(--header-btn-hover-bg)]
            hover:border-[var(--header-btn-hover-bd)]
            hover:shadow-[var(--header-btn-hover-shadow)]
            active:bg-[var(--header-btn-hover-bg)]
            transition-all duration-300 ease-in-out
            ${
              isTop
                ? "bg-transparent"
                : `bg-[var(--header-btn-bg)]
                border-[var(--header-btn-bd)]`
            }`}
          title={t("header.account")}
          onClick={() => toggleMenu("account")}
        >
          <i
            className={`bi bi-person-circle text-[25px]`}
          ></i>
        </button>

        <button
          className={`px-2 h-[40px]
            flex justify-center items-center gap-2
            text-[var(--header-btn-fg)]
            rounded-xl border-1 
            shadow-[var(--header-btn-shadow)]
            hover:bg-[var(--header-btn-hover-bg)]
            hover:border-[var(--header-btn-hover-bd)]
            hover:shadow-[var(--header-btn-hover-shadow)]
            active:bg-[var(--header-btn-hover-bg)]
            transition-all duration-300 ease-in-out
            ${
              isTop
                ? "bg-transparent"
                : `bg-[var(--header-btn-bg)]
                border-[var(--header-btn-bd)]`
            }`}
          title={t("header.settings")}
          onClick={() => toggleMenu("side")}
        >
          <i className={`bi bi-list text-[25px]`}></i>
        </button>
      </div>
    </div>
  );
}
