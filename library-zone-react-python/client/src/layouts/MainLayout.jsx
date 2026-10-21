import { useEffect, useState } from "react";
import HeaderBar from "../components/Layout/HeaderBar";
import FooterBar from "../components/Layout/FooterBar";
import CateMenu from "../components/Menu/CateMenu";
import SubCateMenu from "../components/Menu/SubCateMenu";

export default function MainLayout({ children }) {
  const [openMenu, setOpenMenu] = useState(true);
  const [subMenu, setSubMenu] = useState(null);

  return (
    <div
      className="flex flex-col min-h-screen h-fit w-full 
      font-quicksand bg-[var(--body-bg)] "
    >
      <HeaderBar
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        setSubMenu={setSubMenu}
      />

      {openMenu && (
        <div
          className="fixed top-[70px] left-0 bottom-0 right-0 p-2 bg-[var(--menu-blur-bg)] flex gap-2 z-9999"
          onClick={() => setOpenMenu(false)}
        >
          <div
            className="h-[400px]
            absolute left-2 right-2 xl:mx-[5%] flex gap-3
            transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <CateMenu
              openMenu={openMenu}
              subMenu={subMenu}
              setSubMenu={setSubMenu}
            />

            <SubCateMenu
              subMenu={subMenu}
              setSubMenu={setSubMenu}
            />
          </div>
        </div>
      )}
      <div
        className="flex flex-col flex-1 
        pt-[70px] sm:pb-3 w-full xl:w-[90%]
        text-[var(--body-fg)] mx-auto
        overflow-hidden
        transition-all duration-300 ease-in-out"
      >
        {children}
      </div>

      {/* <button
        className="fixed bottom-[50px] right-[10px] 
        sm:bottom-[60px] sm:right-[20px] z-99
        border-2 border-[var(--top-btn-bd)] rounded-full p-2
        bg-[var(--top-btn-bg)] text-[var(--top-btn-fg)]
        hover:bg-[var(--top-btn-hover-bg)]
        active:bg-[var(--top-btn-active-bg)]
        cursor-pointer transition-all duration-300 ease-in-out"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        title="Trở về đầu trang"
      >
        <MoveUp size={35} />
      </button> */}

      <FooterBar />
    </div>
  );
}
