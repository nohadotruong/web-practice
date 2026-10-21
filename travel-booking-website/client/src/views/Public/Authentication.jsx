import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../context/DarkModeContext";

import SignUpForm from "../../components/Form/UserForm/SignUpForm";
import SignInForm from "../../components/Form/UserForm/SignInForm";

import Loading from "../../components/Layout/Loading";

import lightBg from "../../assets/Auth_Bg/light.jpg";
import darkBg from "../../assets/Auth_Bg/dark.jpg";

export default function Authentication() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("language") || "vi";
    i18n.changeLanguage(lang);
  }, [i18n]);

  const [action, setAction] = useState(
    localStorage.getItem("action") || "signin"
  );
  const [isLoading, setLoading] = useState(false);
  const { darkMode } = useDarkMode();

  function handleSignin() {
    setAction("signin");
    localStorage.setItem("action", "signin");
  }

  function handleSignup() {
    setAction("signup");
    localStorage.setItem("action", "signup");
  }

  return (
    <div
      className={`h-screen w-full relative 
      transition-all duration-300 ease-in-out`}
    >
      <div className="h-full w-full">
        <img
          src={darkMode ? darkBg : lightBg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 left-0 right-0
        bg-glass flex justify-center sm:items-center"
      >
        <div
          className="h-full w-full 
          sm:h-fit sm:w-fit"
        >
          {action === "signup" && (
            <SignUpForm
              t={t}
              currentLang={i18n.language}
              handleSignin={handleSignin}
              setLoading={setLoading}
              darkMode={darkMode}
            />
          )}

          {action === "signin" && (
            <SignInForm
              t={t}
              currentLang={i18n.language}
              handleSignup={handleSignup}
              setLoading={setLoading}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
      {isLoading && <Loading darkMode={darkMode} />}
    </div>
  );
}
