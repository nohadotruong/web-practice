import React from "react";

import viImg from "../../../assets/Language/vi.png";
import enImg from "../../../assets/Language/en.png";
import { useNavigate } from "react-router-dom";

export default function SideMenu({
  darkMode,
  t,
  toggleDark,
  currentLang,
  setLanguage,
  sideMenu,
  toggleMenu,
}) {
  const navigate = useNavigate();

  const categories = [
    {
      title: t("sidemenu.home"),
      icon: "bi bi-house-door",
      click: () => {
        navigate("/");
        toggleMenu("side");
      },
    },
    {
      title: t("sidemenu.tour"),
      icon: "bi bi-map",
      click: () => console.log(""),
    },
    {
      title: t("sidemenu.stay"),
      icon: "bi bi-buildings",
      click: () => console.log(""),
    },
    {
      title: t("sidemenu.airplane"),
      icon: "bi bi-airplane",
      click: () => console.log(""),
    },
    {
      title: t("sidemenu.car"),
      icon: "bi bi-car-front",
      click: () => console.log(""),
    },
    {
      title: t("sidemenu.activity"),
      icon: "bi bi-ticket-perforated",
      click: () => console.log(""),
    },
  ];

  const settingMenus = [
    {
      title: t("sidemenu.language"),
      icon: "",
      srcImg: currentLang === "vi" ? enImg : viImg,
      click: () => {
        setLanguage(currentLang === "vi" ? "en" : "vi");
        toggleMenu("side");
      },
    },
    {
      title: t("sidemenu.theme"),
      icon: `bi ${
        darkMode ? "bi-sun-fill" : "bi-moon-fill"
      }`,
      srcImg: "",
      click: () => {
        toggleDark();
        toggleMenu("side");
      },
    },
  ];

  const infoMenus = [
    {
      title: t("sidemenu.about"),
      icon: "bi bi-info-circle",
      click: () => console.log("About"),
    },
    {
      title: t("sidemenu.privacy"),
      icon: "bi bi-shield-lock",
      click: () => console.log("Privacy"),
    },
    {
      title: t("sidemenu.term"),
      icon: "bi bi-file-text",
      click: () => console.log("Terms"),
    },
  ];

  const btnClass = `flex items-center gap-2 h-[40px]
            w-full px-3 text-[var(--side-menu-btn-fg)]
            active:bg-[var(--side-menu-btn-fg)] 
            active:text-[var(--side-menu-btn-bg)]
            hover:bg-[var(--side-menu-btn-hover-bg)] 
            hover:text-[var(--side-menu-btn-hover-fg)]
            border-1 border-[var(--side-menu-btn-bd)]
            hover:border-[var(--side-menu-btn-hover-bd)] rounded-xl
            transition-all duration-300 ease-in-out`;

  return (
    <div
      className={`w-full h-full sm:w-[400px] 
      overflow-y-auto relative
      bg-[var(--side-menu-bg)] border-[var(--side-menu-bd)]
      shadow-[var(--side-menu-shadow)]
      flex flex-col gap-2
      ${
        sideMenu
          ? `max-w-full border-1 p-3`
          : `max-w-0 border-0 p-0`
      }
      ${darkMode && "dark"}
      transition-all duration-300 ease-in-out`}
    >
      <div className={`flex flex-col justify-center gap-2`}>
        <div className="flex items-center">
          <h1
            className="text-[var(--side-menu-fg)] text-[23px] font-[500]
            px-2"
          >
            {t("sidemenu.category")}
          </h1>
          <hr
            className="text-[var(--side-menu-fg)] border-1 rounded-e-full 
            flex-1 mt-[13px]"
          />
        </div>

        {categories.map((item, index) => (
          <button
            key={index}
            className={btnClass}
            onClick={item.click}
          >
            <p>{item.title}</p>
            <i
              className={`ms-auto text-[25px] ${item.icon}`}
            ></i>
          </button>
        ))}
      </div>

      <div className={`flex flex-col justify-center gap-2`}>
        <div className="flex items-center">
          <h1
            className="text-[var(--side-menu-fg)] text-[23px] font-[500]
            px-2"
          >
            {t("sidemenu.settings")}
          </h1>
          <hr
            className="text-[var(--side-menu-fg)] border-1 rounded-e-full 
            flex-1 mt-[13px]"
          />
        </div>

        {settingMenus.map((item, index) => (
          <button
            key={index}
            className={btnClass}
            onClick={item.click}
          >
            <p>{item.title}</p>
            {item.icon !== "" && (
              <i
                className={`ms-auto text-[25px] ${item.icon}`}
              ></i>
            )}
            {item.srcImg != "" && (
              <img
                src={item.srcImg}
                className="ms-auto h-[30px] border-2 rounded-full"
                alt=""
              />
            )}
          </button>
        ))}
      </div>

      <div className={`flex flex-col justify-center gap-2`}>
        <div className="flex items-center">
          <h1
            className="text-[var(--side-menu-fg)] text-[23px] font-[500]
            px-2"
          >
            {t("sidemenu.info")}
          </h1>
          <hr
            className="text-[var(--side-menu-fg)] border-1 rounded-e-full 
            flex-1 mt-[13px]"
          />
        </div>

        {infoMenus.map((item, index) => (
          <button
            key={index}
            className={btnClass}
            onClick={item.click}
          >
            <p>{item.title}</p>
            <i
              className={`ms-auto text-[25px] ${item.icon}`}
            ></i>
          </button>
        ))}
      </div>

      <button
        className="rounded-full px-3 gap-2
          flex justify-center items-center
          sticky bottom-0
          text-[var(--side-menu-btn-fg)]
          bg-[var(--side-menu-bg)]
          active:bg-[var(--side-menu-btn-fg)] 
          active:text-[var(--side-menu-btn-bg)]
          hover:bg-[var(--side-menu-btn-hover-bg)] 
          hover:text-[var(--side-menu-btn-hover-fg)]
          border-1 border-[var(--side-menu-btn-fg)]
          hover:border-[var(--side-menu-btn-hover-bd)]
          transition-all duration-300 ease-in-out"
        onClick={() => toggleMenu("side")}
      >
        {t("accountmenu.close")}
        <i className="bi bi-x-lg text-[25px]"></i>
      </button>
    </div>
  );
}
