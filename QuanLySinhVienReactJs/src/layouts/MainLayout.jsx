import React, { useEffect, useState } from "react";

import HeaderBar from "../components/HeaderBar/HeaderBar";
import NavBar from "../components/NavBar/NavBar";
import FooterBar from "../components/FooterBar/FooterBar";

import "./MainLayout.css";

export default function MainLayout({ children }) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 991.5
  );
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991.5);
    };

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  });

  const toggleNavBar = () => {
    setIsNavBarOpen((prev) => !prev);
  };

  const closeNavBar = () => setIsNavBarOpen(false);

  const shouldShowNav = !isMobile || isNavBarOpen;

  return (
    <div className="main-layout">
      <HeaderBar
        toggleNavBar={toggleNavBar}
        isMobile={isMobile}
      />
      <div className="main-body">
        <NavBar
          isOpen={shouldShowNav}
          closeNavBar={closeNavBar}
        />
        <main className="main-content p-3">{children}</main>
      </div>
      <FooterBar />
    </div>
  );
}
