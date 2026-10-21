import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

import { getAccountMenu } from "../../../data/accountMenuData";

import "./AccountMenu.css";

export default function AccountMenu({ isAccMenuOpen }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let menu;
  user ? (menu = getAccountMenu(user)) : (menu = []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {isAccMenuOpen && (
        <div
          className="account-menu__container flex-column"
          id="account-menu"
        >
          {user ? (
            <>
              {menu
                .filter((item) =>
                  item.role.includes(user?.role)
                )
                .map((item, index) => (
                  <button
                    key={index}
                    className="account-menu__button d-flex align-items-center w-100"
                    onClick={() => navigate(item.path)}
                  >
                    <i
                      className={`${item.left_icon} me-2`}
                    ></i>
                    {item.label}
                    <i
                      className={`${item.right_icon} ms-auto`}
                    ></i>
                  </button>
                ))}
              <button
                className="account-menu__button d-flex align-items-center w-100"
                onClick={handleSignOut}
              >
                <i className="bi bi-box-arrow-left me-2"></i>
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="account-menu__button d-flex align-items-center w-100"
              onClick={() => {
                localStorage.setItem(
                  "oldPath",
                  window.location.href
                );
                navigate("/authentication");
              }}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In/Sign Up
            </button>
          )}
        </div>
      )}
    </>
  );
}
