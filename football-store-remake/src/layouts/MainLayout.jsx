import React, { useEffect, useState } from "react";

import HeaderBar from "../components/HeaderBar/HeaderBar";
import FooterBar from "../components/FooterBar/FooterBar";

import "./MainLayout.css";

export default function MainLayout({ children }) {
  // const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   const data = localStorage.getItem("userInfo");
  //   setUserInfo(JSON.parse(data));
  // }, []);

  return (
    <div className="main-container">
      <HeaderBar />
      <div className="main-body">{children}</div>
      <FooterBar />
    </div>
  );
}
