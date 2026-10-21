import React from "react";
import { useNavigate } from "react-router-dom";

import { landingPageData } from "../../../data/landingPageData";

import shopCoverImg from "../../../assets/ShopsImg.png";

import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const menuData = landingPageData;

  return (
    <div className="landing-page__container w-100 m-0 p-0">
      <div className="landing-page__content row m-0 p-0">
        {menuData.map((item, index) => (
          <div
            className="landing-page__item p-0 m-0 col-lg-12 col-md-12 row"
            key={index}
          >
            <div className="left__content col-lg-12 col-sm-5 col-12 m-0 p-0">
              <div className="bg__content">
                <img src={item.left_bg} alt="Background" />
              </div>
              <div className="fg__content">
                <img
                  src={item.left_logo}
                  alt="Foreground"
                />
              </div>
            </div>
            <div className="right__content col-lg-12 col-sm-7 col-12 p-0 m-0">
              {item.right_data.map((card, index2) => (
                <div
                  key={index2}
                  className="card__item m-0 p-0"
                >
                  <div className="bg__content">
                    <img
                      src={card.bg_logo}
                      alt="Background"
                    />
                  </div>
                  <div className="fg__content">
                    <h2>{card.label}</h2>
                    <button
                      className="d-flex justify-content-center align-items-center"
                      onClick={() => navigate(card.path)}
                    >
                      Shop Now
                      <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="landing-page__item p-0 m-0 col-12 d-flex align-items-center">
          <div className="left__content">
            <div className="bg__content">
              <img src={shopCoverImg} alt="" />
            </div>
            <div className="fg__content">
              <button
                className="d-flex justify-content-center align-items-center"
                onClick={() => navigate("/store")}
              >
                See all products{" "}
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
