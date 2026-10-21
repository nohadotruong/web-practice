import React, { useState } from "react";

import * as menus from "../../../data/filterMenuData";

import "./FilterMenu.css";

export default function FilterMenu({
  isFilterOpen,
  setFilterOpen,
}) {
  const sortMenu = menus.sortMenuData;
  const filterMenu = menus.filterMenuData;

  function toggleFilterMenu() {
    setFilterOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }

  if (!isFilterOpen) return null;

  return (
    <div className="filter p-0 m-0">
      <div className="filter__container">
        <div className="filter__header">
          <button onClick={() => toggleFilterMenu()}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="filter__content m-0">
          <div className="sorting__menu">
            <h5>Sort by</h5>
            <div className="sorting__item">
              {sortMenu.map((item, index) => (
                <button key={index}>{item.label}</button>
              ))}
            </div>
          </div>

          {filterMenu.map((item, index) => (
            <div key={index} className="filter__menu">
              <h5>{item.label}</h5>
              <div className="filter__item d-flex flex-wrap">
                {item.menu.map((cItem, cIndex) => (
                  <button key={cIndex}>
                    {cItem.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="filter__footer p-0 m-0 d-flex align-items-center">
          <button>Show results</button>
        </div>
      </div>
    </div>
  );
}
