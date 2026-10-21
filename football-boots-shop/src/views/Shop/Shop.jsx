import React from "react";

import "./Shop.css";

import NikeMer from "../../assets/Nike/Mercurial/MerMadVoltagePack.png";

export default function Shop() {
  return (
    <div className="shop-container">
      <div className="shop-section row mt-3 mb-3">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <div className="shop-item m-3">
            <div className="image-item">
              <img src={NikeMer} alt="" />
            </div>
            <div className="text-item">
              <p className="name-item m-0 p-0">
                Nike Air Zoom Mercurial Vapor 16 Elite FG
                Mad Voltage - Volt/Black
              </p>
              <p className="price-item m-0 p-0">
                7.000.000 &#8363;
              </p>
              {/* {price.toLocaleString("vi-VN")} */}
              {/* <button className="mt-1 p-0">
              Xem chi tiết{" "}
              <i className="bi bi-arrow-right"></i>
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
