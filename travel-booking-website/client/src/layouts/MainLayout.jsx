import { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useDarkMode } from "../context/DarkModeContext";
import { UserContext } from "../context/UserContext";

import Loading from "../components/Layout/Loading";

import HeaderBar from "../components/Layout/HeaderBar";
import FooterBar from "../components/Layout/FooterBar";

import SideMenu from "../components/Menu/Layout/SideMenu";
import AccountMenu from "../components/Menu/Layout/AccountMenu";

export default function MainLayout({ children }) {
  const { t, i18n } = useTranslation();
  const currentLang =
    localStorage.getItem("language") || i18n.language;

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  function setLanguage(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  }

  const { darkMode, toggleDark } = useDarkMode();

  const [isTop, setIsTop] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [accountMenu, setAccountMenu] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 430) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      sideMenu || accountMenu ? "hidden" : "";
  }, [sideMenu, accountMenu]);

  function toggleMenu(menu) {
    if (menu === "account") {
      setSideMenu(false);
      setAccountMenu((prev) => !prev);
    }

    if (menu === "side") {
      setAccountMenu(false);
      setSideMenu((prev) => !prev);
    }
  }

  return (
    <div
      className={`min-h-screen w-full relative
      flex flex-col overflow-hidden
      ${
        accountMenu || sideMenu
          ? "overscroll-none"
          : "overscroll-auto"
      }
      ${darkMode && "dark"}`}
    >
      <div className="block fixed top-0 left-0 right-0 z-99">
        <HeaderBar
          userInfo={userInfo}
          t={t}
          isTop={isTop}
          darkMode={darkMode}
          accountMenu={accountMenu}
          setAccountMenu={setAccountMenu}
          toggleMenu={toggleMenu}
          sideMenu={sideMenu}
          setSideMenu={setSideMenu}
        />
      </div>

      <div
        className={`fixed right-0 top-[70px] bottom-0
          w-full bg-glass flex justify-end z-99
          transition-all duration-300 ease-in-out
          ${
            accountMenu || sideMenu
              ? "max-w-full"
              : "max-w-0"
          }`}
      >
        <AccountMenu
          userInfo={userInfo}
          darkMode={darkMode}
          t={t}
          accountMenu={accountMenu}
          setAccountMenu={setAccountMenu}
          setUserInfo={setUserInfo}
          setLoading={setLoading}
          toggleMenu={toggleMenu}
        />

        <SideMenu
          sideMenu={sideMenu}
          setSideMenu={setSideMenu}
          darkMode={darkMode}
          t={t}
          toggleDark={toggleDark}
          currentLang={currentLang}
          toggleMenu={toggleMenu}
          setLanguage={setLanguage}
        />
      </div>

      <div
        className={`flex flex-col flex-1 w-full
          bg-[var(--body-bg)] text-[var(--body-fg)]
          transition-all duration-300 ease-in-out
          ${darkMode && "dark"}`}
      >
        {children}
      </div>

      <div className="block">
        <FooterBar t={t} darkMode={darkMode} />
      </div>

      {isLoading && (
        <div>
          <Loading darkMode={darkMode} />
        </div>
      )}

      <button
        className={`w-[50px] h-[50px] overflow-hidden
        flex justify-center items-center cursor-pointer
        fixed bottom-[50px] right-[20px] gap-1
        bg-[var(--top-btn-bg)] text-[var(--top-btn-fg)]
        border-1 border-[var(--top-btn-bd)] rounded-full
        shadow-[var(--top-btn-shadow)]
        hover:bg-[var(--top-btn-hover-bg)] hover:text-[var(--top-btn-hover-fg)]
        hover:border-[var(--top-btn-hover-bd)] 
        hover:shadow-[var(--top-btn-hover-shadow)]
        active:bg-[var(--top-btn-hover-bg)] active:text-[var(--top-btn-hover-fg)]
        transition-all duration-300 ease-in-out 
        ${
          isTop
            ? "opacity-0 scale-0"
            : "opacity-100 scale-100"
        }`}
        title={t("commons.totop")}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <i className="bi bi-chevron-up text-[30px]"></i>
      </button>
    </div>
  );
}
