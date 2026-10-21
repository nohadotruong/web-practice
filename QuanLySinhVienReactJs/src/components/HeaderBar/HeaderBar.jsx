import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./HeaderBar.css";

import headerLogo from "../../assets/logo192.png";
import defaultAva from "../../assets/default-avatar.png";
import { UserRepository } from "../../repositories/UserRepository";

export default function HeaderBar({
  toggleNavBar,
  isMobile,
}) {
  const navigate = useNavigate();
  const user = UserRepository.getUserInfoFromLocal();

  useEffect(() => {
    // console.log(user);
  });

  const handleLogout = () => {
    localStorage.removeItem("userId");
    document.title = "Đăng nhập";
    navigate("/");
  };

  function showAccountMenu() {
    document.getElementById("acc-menu").style.display =
      "block";
  }

  function hideAccountMenu() {
    document.getElementById("acc-menu").style.display =
      "none";
  }

  return (
    <div className="header">
      <div className="header-left ps-2 d-flex align-items-center">
        <img src={headerLogo} alt="" />
      </div>
      <div className="header-right d-flex">
        <div
          className="account ms-auto"
          onMouseEnter={showAccountMenu}
          onMouseLeave={hideAccountMenu}
        >
          <button className="acc-btn d-flex align-items-center">
            <img
              className="default-ava"
              src={defaultAva}
              alt=""
            />
            <p>{user?.hoten || "Đang tải..."}</p>
            <i
              className="bi bi-chevron-down"
              style={{ fontSize: "10px" }}
            ></i>
          </button>
          <div className="acc-menu" id="acc-menu">
            <div className="acc-ava d-flex justify-content-center align-items-center">
              <img
                className="default-ava"
                src={defaultAva}
                alt=""
              />
            </div>
            <button
              className="d-flex align-items-center"
              onClick={() => navigate("/profile")}
            >
              <i className="bi bi-person"></i>
              Thông tin tài khoản
            </button>
            <button className="d-flex align-items-center">
              <i className="bi bi-shield-x"></i>
              Đổi mật khẩu
            </button>
            <hr />
            <button
              className="d-flex align-items-center"
              onClick={handleLogout}
            >
              <i className="bi bi-power"></i>
              Đóng phiên làm việc
            </button>
          </div>
        </div>

        {isMobile && (
          <button
            className="menu-btn justify-content-center align-items-center"
            id="right-menu-btn"
            onClick={toggleNavBar}
          >
            <i className="bi bi-list"></i>
          </button>
        )}
      </div>
    </div>
  );
}
