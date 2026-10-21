import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { CategoriesItem } from "../../datas/CategoryData";

import UserRepository from "../../repositories/UserRepository";

import "./HeaderBar.css";

import headerLogo from "../../assets/ShopLogo/logo_shop.png";

export default function HeaderBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  console.log(userInfo);

  function openAccMenu() {
    document.getElementById("account-menu").style.display =
      "flex";
    document.getElementById(
      "account-btn"
    ).style.backgroundColor = "#ceff00";
    document.getElementById("account-btn").style.color =
      "#1c1c1c";
  }

  function closeAccMenu() {
    document.getElementById("account-menu").style.display =
      "none";
    document.getElementById(
      "account-btn"
    ).style.backgroundColor = "#1c1c1c";
    document.getElementById("account-btn").style.color =
      "#ceff00";
  }

  function openCatMenu() {
    document.getElementById("category-menu").style.display =
      "flex";
    document.getElementById(
      "category-btn"
    ).style.backgroundColor = "#ceff00";
    document.getElementById("category-btn").style.color =
      "#1c1c1c";
  }

  function closeCatMenu() {
    document.getElementById("category-menu").style.display =
      "none";
    document.getElementById(
      "category-btn"
    ).style.backgroundColor = "#1c1c1c";
    document.getElementById("category-btn").style.color =
      "#ceff00";
  }

  function toggleCategoryMenu() {
    const menuEl = document.getElementById("category-menu");
    const btnEl = document.getElementById("category-btn");

    if (menuEl.style.display === "none") {
      menuEl.style.display = "flex";
      btnEl.style.backgroundColor = "#ceff00";
      btnEl.style.color = "#1c1c1c";
    } else {
      menuEl.style.display = "none";
      btnEl.style.backgroundColor = "#1c1c1c";
      btnEl.style.color = "#ceff00";
    }
  }

  function toggleSmMenu(menuId, downIcon, upIcon) {
    const smMenuArr =
      document.getElementsByClassName("sm-menu");
    const menuEl = document.getElementById(menuId);
    const downIc = document.getElementById(downIcon);
    const upIc = document.getElementById(upIcon);

    const isCurrentlyOpen =
      getComputedStyle(menuEl).display !== "none";

    Array.from(smMenuArr).forEach((el) => {
      el.style.display = "none";
    });
    Array.from(
      document.getElementsByClassName("bi-chevron-up")
    ).forEach((el) => {
      el.style.display = "none";
    });
    Array.from(
      document.getElementsByClassName("bi-chevron-down")
    ).forEach((el) => {
      el.style.display = "flex";
    });

    if (isCurrentlyOpen) {
      return;
    }

    menuEl.style.display = "flex";
    downIc.style.display = "none";
    upIc.style.display = "flex";
  }

  function openSearchBar() {
    document.getElementById("search-bar").style.display =
      "flex";
  }

  function closeSearchBar() {
    document.getElementById("search-bar").style.display =
      "none";
  }

  function handleAuthRedirect() {
    localStorage.setItem(
      "oldPath",
      location.pathname + location.search
    );
    navigate("/auth");
  }

  useEffect(() => {
    const info = UserRepository.getUserInfoFromLocal();
    console.log("User info from localStorage:", info);
    setUserInfo(info);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/");
  };

  return (
    <div className="header-container row m-0 p-0">
      <div className="header-left col-5 m-0 p-0">
        <div
          className="category-bar"
          onMouseEnter={() => openCatMenu()}
          onMouseLeave={() => closeCatMenu()}
        >
          <button
            id="category-btn"
            onClick={() => toggleCategoryMenu()}
          >
            <i className="bi bi-list"></i>
          </button>

          <div
            className={"category-menu"}
            id="category-menu"
          >
            <button
              onClick={() => {
                navigate("/shop");
                closeCatMenu();
              }}
            >
              Tất cả sản phẩm
            </button>

            {CategoriesItem.filter(
              (item) => item.label !== "Tất cả sản phẩm"
            ).map((item, index) => (
              <div className="sm-category-menu" key={index}>
                <button
                  onClick={() =>
                    toggleSmMenu(
                      item.id,
                      item.opId,
                      item.clId
                    )
                  }
                >
                  {item.label}
                  <i
                    id={item.opId}
                    className="bi bi-chevron-down ms-auto"
                  ></i>
                  <i
                    id={item.clId}
                    className="bi bi-chevron-up ms-auto"
                  ></i>
                </button>

                <div
                  className="sm-menu flex-column"
                  id={item.id}
                  // style={{ display: "none" }}
                >
                  {item.smMenu.map((sub, subIdx) => (
                    <button
                      key={subIdx}
                      className=""
                      onClick={() => {
                        navigate(sub.path);
                        document.getElementById(
                          item.id
                        ).style.display = "none";
                        document.getElementById(
                          item.opId
                        ).style.display = "flex";
                        document.getElementById(
                          item.clId
                        ).style.display = "none";
                        closeCatMenu();
                      }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="header-center col-2 m-0 p-0">
        <img
          src={headerLogo}
          alt=""
          onClick={() => navigate("/")}
        />
      </div>

      <div className="header-right col-5 m-0 p-0">
        <div className="search-bar-btn ms-auto">
          <button onClick={() => openSearchBar()}>
            <i className="bi bi-search"></i>
          </button>
        </div>
        <div
          className="account-bar"
          onMouseEnter={() => openAccMenu()}
          onMouseLeave={() => closeAccMenu()}
        >
          <button id="account-btn">
            <i
              className="bi bi-person-fill"
              style={{ fontSize: "30px" }}
            ></i>
          </button>
          <div className="account-menu" id="account-menu">
            {userInfo ? (
              userInfo.role === "admin" ? (
                <div id="admin-menu">
                  <button>
                    <i className="bi bi-person me-2"></i>
                    {userInfo.name}
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button
                    onClick={() =>
                      navigate("/product_manager")
                    }
                  >
                    <i className="bi bi-box-seam me-2"></i>
                    Quản lý sản phẩm
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button>
                    <i className="bi bi-tags me-2"></i>
                    Quản lý danh mục
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button>
                    <i className="bi bi-receipt me-2"></i>
                    Quản lý đơn hàng
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button>
                    <i className="bi bi-people me-2"></i>
                    Quản lý người dùng
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button>
                    <i className="bi bi-bar-chart-line me-2"></i>
                    Thống kê
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button>
                    <i className="bi bi-ticket-perforated me-2"></i>
                    Quản lý khuyến mãi
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button onClick={handleSignOut}>
                    <i className="bi bi-box-arrow-left me-2"></i>
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div id="user-menu">
                  <button>
                    <i className="bi bi-person me-2"></i>
                    {userInfo.name}
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button>
                    <i className="bi bi-cart me-2"></i>
                    Giỏ hàng
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button>
                    <i className="bi bi-truck me-2"></i>
                    Kiểm tra đơn hàng
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                  <button onClick={handleSignOut}>
                    <i className="bi bi-box-arrow-left me-2"></i>{" "}
                    Đăng xuất
                  </button>
                </div>
              )
            ) : (
              <div id="guest-menu">
                <button onClick={handleAuthRedirect}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Đăng nhập/Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="search-bar" id="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
        <button className="search-btn d-flex align-items-center">
          <i className="bi bi-search"></i>
        </button>
        <button
          className="cancel-btn d-flex align-items-center"
          onClick={() => closeSearchBar()}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}
