import React from "react";

import HeaderBar from "../components/HeaderBar/HeaderBar";
import FooterBar from "../components/FooterBar/FooterBar";

import "./MainLayout.css";

export default function MainLayout({ children }) {
  return (
    <div className="main-container d-flex flex-column w-100">
      <HeaderBar />
      <div className="main-content">{children}</div>
      <FooterBar />
    </div>
  );
}
