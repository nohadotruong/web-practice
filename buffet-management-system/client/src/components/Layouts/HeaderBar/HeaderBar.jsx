import React from "react";
import { useNavigate } from "react-router-dom";

import "./HeaderBar.css";

import avaImg from "../../../assets/default-avatar.png";

export default function HeaderBar({ user }) {
  const navigate = useNavigate();
  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("currentTab");
    navigate("/");
  }

  return (
    <div className="header__container">
      <div className="user__section">
        <img src={avaImg} alt="" />

        <div className="ms-2">
          {user ? (
            <>
              <h5 className="m-0 p-0">{user.fullname}</h5>
              <h6 className="m-0 p-0">{user.role}</h6>
            </>
          ) : (
            <h6>Loading...</h6>
          )}
        </div>
      </div>
      <div className="header-button__section ms-auto me-1">
        <button
          className="me-1"
          title="Reload"
          onClick={() => window.location.reload()}
        >
          <p className="m-0 p-0 d-none d-sm-flex me-2">
            Reload
          </p>
          <i className="bi bi-arrow-repeat"></i>
        </button>
        <button onClick={handleSignOut} title="Sign out">
          <p className="m-0 p-0 d-none d-sm-flex me-2">
            Sign Out
          </p>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
