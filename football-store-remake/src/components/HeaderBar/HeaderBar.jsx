import React, { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import AccountMenu from "../../features/auth/AccountMenu/AccountMenu";
import CategoryMenu from "../../features/product/CategoryMenu/CategoryMenu";
import SearchBar from "../../features/product/SearchBar/SearchBar";

import Logo from "../../assets/logo_shop.png";

import "./HeaderBar.css";

export default function HeaderBar() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [isCateMenuOpen, setCateMenuOpen] = useState(false);
  const [isAccMenuOpen, setAccMenuOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] =
    useState(false);
  const [searchValue, setSearchValue] = useState("");

  function showAccountMenu() {
    setAccMenuOpen(true);
  }

  function hideAccountMenu() {
    setAccMenuOpen(false);
  }

  function toggleAccountMenu() {
    setAccMenuOpen((prev) => !prev);
  }

  function toggleCateMenu() {
    setCateMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }

  function toggleSearchBar() {
    setSearchBarOpen((prev) => !prev);
  }

  return (
    <div className="header d-flex row p-0 m-0">
      <div className="header__left p-0 m-0 col-4 d-flex align-items-center">
        <div className="header__item">
          <button
            className="header__button"
            onClick={toggleCateMenu}
          >
            <i className="bi bi-list"></i>
          </button>
          <CategoryMenu
            isCateMenuOpen={isCateMenuOpen}
            setCateMenuOpen={setCateMenuOpen}
          />
        </div>
        <div className="header__logo ms-2">
          <img
            src={Logo}
            alt=""
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className="header__right p-0 m-0 col-8 d-flex align-items-center justify-content-end">
        <div className="header__item">
          <button
            className="header__button"
            onClick={toggleSearchBar}
          >
            <i className="bi bi-search"></i>
          </button>
          <SearchBar
            isSearchBarOpen={isSearchBarOpen}
            setSearchBarOpen={setSearchBarOpen}
          />
        </div>
        <div
          className="header__item"
          onClick={toggleAccountMenu}
          onMouseEnter={showAccountMenu}
          onMouseLeave={hideAccountMenu}
        >
          <button className="header__button">
            <i className="bi bi-person-circle"></i>
          </button>
          <AccountMenu isAccMenuOpen={isAccMenuOpen} />
        </div>
      </div>
    </div>
  );
}
