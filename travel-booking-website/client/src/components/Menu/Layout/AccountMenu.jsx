import { useNavigate } from "react-router-dom";

export default function AccountMenu({
  userInfo,
  darkMode,
  t,
  accountMenu,
  setUserInfo,
  setLoading,
  toggleMenu,
}) {
  const navigate = useNavigate();

  const authMenu = [
    {
      status: "guest",
      title: t("accountmenu.signin"),
      text: t("accountmenu.signin"),
      icon: "bi bi-box-arrow-in-right",
      click: () => {
        navigate("/authentication");
        localStorage.setItem("action", "signin");
      },
    },
    {
      status: "guest",
      title: t("accountmenu.signup"),
      text: t("accountmenu.signup"),
      icon: "bi bi-person-plus",
      click: () => {
        navigate("/authentication");
        localStorage.setItem("action", "signup");
      },
    },
  ];

  const tourMenus = [
    {
      title: t("accountmenu.saved"),
      icon: `bi bi-heart`,
      click: () => {
        console.log("Saved");
      },
    },
    {
      title: t("accountmenu.booking"),
      icon: `bi bi-luggage`,
      click: () => {
        console.log("Booking");
      },
    },
  ];

  const accountMenus = [
    {
      title: t("accountmenu.profile"),
      icon: `bi bi-person`,
      click: () => {
        navigate("/profile");
        toggleMenu("account");
      },
    },
    // {
    //   title: t("accountmenu.security"),
    //   icon: `bi bi-lock`,
    //   click: () => {
    //     navigate("/profile?tab=security");
    //     toggleMenu("account");
    //   },
    // },
    {
      title: t("accountmenu.signout"),
      icon: `bi bi-box-arrow-right`,
      click: () => {
        setLoading(true);
        setUserInfo(null);
        localStorage.removeItem("userToken");
        setLoading(false);
        toggleMenu("account");
        window.location.reload();
      },
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
      overflow-hidden relative
      bg-[var(--side-menu-bg)] border-[var(--side-menu-bd)]
      shadow-[var(--side-menu-shadow)]
      flex flex-col gap-2
        ${
          accountMenu
            ? `max-w-full border-1 p-3`
            : `max-w-0 border-0 p-0`
        }
        ${darkMode && "dark"}
        transition-all duration-300 ease-in-out`}
    >
      {userInfo ? (
        <>
          <div
            className={`flex flex-col justify-center gap-2`}
          >
            <div className="flex items-center">
              <h1
                className="text-[var(--side-menu-fg)] text-[23px] font-[500]
            px-2"
              >
                {t("accountmenu.tours")}
              </h1>
              <hr
                className="text-[var(--side-menu-fg)] border-1 rounded-e-full 
            flex-1 mt-[13px]"
              />
            </div>

            {tourMenus.map((item, index) => (
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

          <div
            className={`flex flex-col justify-center gap-2`}
          >
            <div className="flex items-center">
              <h1
                className="text-[var(--side-menu-fg)] text-[23px] font-[500]
            px-2"
              >
                {t("accountmenu.accountmanage")}
              </h1>
              <hr
                className="text-[var(--side-menu-fg)] border-1 rounded-e-full 
            flex-1 mt-[13px]"
              />
            </div>

            {accountMenus.map((item, index) => (
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
        </>
      ) : (
        <div
          className={`flex flex-col justify-center gap-2`}
        >
          <div className="flex items-center">
            <h1
              className="text-[var(--side-menu-fg)] text-[23px] font-[500]
            px-2"
            >
              {t("accountmenu.account")}
            </h1>
            <hr
              className="text-[var(--side-menu-fg)] border-1 rounded-e-full 
            flex-1 mt-[13px]"
            />
          </div>

          {authMenu.map((item, index) => (
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
      )}
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
        onClick={() => toggleMenu("account")}
      >
        {t("accountmenu.close")}
        <i className="bi bi-x-lg text-[25px]"></i>
      </button>
    </div>
  );
}
