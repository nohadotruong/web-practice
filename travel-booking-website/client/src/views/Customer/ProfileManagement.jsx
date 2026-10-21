import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext";
import { useDarkMode } from "../../context/DarkModeContext";

import Loading from "../../components/Layout/Loading";
import lightImg from "../../assets/Account_Bg/light.jpg";
import darkImg from "../../assets/Account_Bg/dark.jpg";
import ProfileForm from "../../components/Form/UserForm/ProfileForm";

export default function ProfileManagement() {
  const { t, i18n } = useTranslation();
  const { darkMode } = useDarkMode();
  const { userInfo, fetchToken } = useContext(UserContext);

  const [isLoading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchToken();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setCurrentData({
        email: userInfo.email || "",
        username: userInfo.username || "",
        fullname: userInfo.fullname || "",
        phone: userInfo.phone || "",
      });
    }
    setLoading(false);
  }, [userInfo]);

  return (
    <div
      className={`p-3 mt-[80px] w-full h-full flex justify-center 
        transition-all duration-300 ease-in-out
        ${darkMode && "dark"}`}
    >
      <div
        className="w-full sm:w-[80%] lg:w-[60%] h-full 
        bg-[var(--profile-bg)] rounded-2xl shadow-[var(--profile-shadow)]
        border-1 border-[var(--profile-bd)] 
        transition-all duration-300 ease-in-out"
      >
        <div className="w-full h-[200px] flex justify-start items-end rounded-2xl relative overflow-hidden">
          <img
            src={darkMode ? darkImg : lightImg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="px-3 py-1 absolute text-[var(--profile-fg)]">
            <p className="text-[20px]">
              {userInfo?.username || t("commons.loading")}
            </p>
            <p className="text-[30px]">
              {userInfo?.fullname || t("commons.loading")}
            </p>
          </div>
        </div>

        <ProfileForm
          initialData={currentData}
          t={t}
          currentLang={i18n.language}
          setLoading={setLoading}
        />
      </div>

      {isLoading && <Loading />}
    </div>
  );
}
