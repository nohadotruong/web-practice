import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as menus from "../../../data/categoryMenuData";

import "./CategoryMenu.css";

export default function CategoryMenu({
  isCateMenuOpen,
  setCateMenuOpen,
}) {
  const [menu, setMenu] = useState(menus.CategoryMenuData);
  const navigate = useNavigate();

  function goNext(child_menu) {
    setMenu(child_menu);
  }

  function goBack(parent_menu) {
    if (
      Array.isArray(parent_menu) &&
      parent_menu.length > 0
    ) {
      setMenu(parent_menu);
    } else {
      setCateMenuOpen((prev) => {
        const next = !prev;
        document.body.style.overflow = next ? "hidden" : "";
        return next;
      });
    }
  }

  if (!isCateMenuOpen) return null;

  return (
    <div className="category-menu__container">
      {isCateMenuOpen && (
        <div className="category-menu__section d-flex flex-column">
          <button
            className="back__button d-flex align-items-center w-100"
            onClick={() => goBack(menu[0].parent_menu)}
          >
            <i
              className="bi bi-chevron-left me-2"
              style={{ fontSize: "16px" }}
            ></i>
            Back
          </button>
          {menu.map((item, index) =>
            item.child_menu?.length > 0 ? (
              <React.Fragment key={index}>
                <button
                  className="category-menu__button d-flex align-items-center w-100"
                  onClick={(e) => goNext(item.child_menu)}
                >
                  {item.label}
                  <i className={item.right_icon}></i>
                </button>
              </React.Fragment>
            ) : (
              <button
                key={index}
                className="category-menu__button d-flex align-items-center w-100"
                onClick={() => {
                  navigate(item.path);
                  setCateMenuOpen(false);
                  setMenu(menus.CategoryMenuData);
                }}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
