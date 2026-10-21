import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FilterMenu from "../../../features/product/FilterMenu/FilterMenu";

import { products } from "../../../data/productDataExample";

import "./Store.css";

export default function Store() {
  const navigate = useNavigate();
  const [isFilterOpen, setFilterOpen] = useState(false);

  const productList = products;

  function toggleFilterMenu() {
    setFilterOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }

  function viewProduct(productId) {
    const path = `/product?id=` + productId;
    navigate(path);
  }

  return (
    <div className="store__container">
      <div className="store__option d-flex align-items-center justify-content-center w-100 p-3 m-0">
        <button
          className="button__option w-100 m-0 p-0"
          onClick={() => toggleFilterMenu()}
        >
          Filters and sorting
          <i className="bi bi-sliders ms-3"></i>
        </button>
        <FilterMenu
          isFilterOpen={isFilterOpen}
          setFilterOpen={setFilterOpen}
        />
      </div>
      <div className="store__content container row m-0 p-3">
        {productList.map((item, index) => (
          <div
            key={index}
            className="store__item p-2 col-lg-3 col-md-4 col-6"
          >
            <div
              className="item__card"
              onClick={() => viewProduct(item.id)}
            >
              <div className="item__img">
                <img src={item.thumbnails} alt="" />
              </div>
              <div className="item__info p-2">
                <p className="item__name m-0 p-0">
                  {item.name}
                </p>
                <p className="item__price m-0 p-0">
                  {item.price.toLocaleString("vi-VN")}{" "}
                  &#8363;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
