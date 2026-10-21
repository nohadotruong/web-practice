import React from "react";
import { useNavigate } from "react-router-dom";

import { brandsData } from "../../datas/LandingPageData";

import "./LandingPage.css";

import ShopImg from "../../assets/ShopLogo/ShopsImg.png";

export default function LandingPage() {
  const navigate = useNavigate();

  function showForeground(id) {
    document.getElementById(id).style.display = "flex";
  }

  function hideForeground(id) {
    document.getElementById(id).style.display = "none";
  }

  return (
    <div className="landing-wrapper m-0 p-0">
      <div className="landing-container m-0 p-0">
        {brandsData.map((brand, index) => (
          <div
            key={index}
            className="landing-content row m-0 p-0"
            style={{ backgroundColor: brand.bgColor }}
          >
            <div className="landing-left-content col-lg-4 col-md-6 col-sm-12">
              <div className="brand-background">
                <img src={brand.brandBg} alt="" />
              </div>
              <div className="brand-foreground">
                <img src={brand.brandLogo} alt="" />
                <button
                  onClick={() => navigate(brand.brandPath)}
                >
                  Mua ngay
                  <i className="bi bi-arrow-right ms-2" />
                </button>
              </div>
            </div>
            <div className="landing-right-content col-lg-8 col-md-6 col-sm-12">
              {brand.products.map((product, idx) => (
                <div
                  key={idx}
                  className="boot-card"
                  onMouseEnter={() =>
                    showForeground(product.id)
                  }
                  onMouseLeave={() =>
                    hideForeground(product.id)
                  }
                >
                  <div className="boot-card-bg">
                    <img src={product.image} alt="" />
                  </div>
                  <div
                    className="boot-card-fg"
                    id={product.id}
                  >
                    <img src={product.logo} alt="" />
                    <button
                      onClick={() => navigate(product.path)}
                    >
                      Mua ngay
                      <i className="bi bi-arrow-right ms-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          className="landing-content row m-0 p-0"
          id="all-product"
          style={{ height: "45vh" }}
        >
          <div className="landing-left-content col-12">
            <div className="brand-background">
              <img src={ShopImg} alt="" />
            </div>
            <div
              className="brand-foreground"
              style={{ backgroundColor: "#1c1c1ca9" }}
            >
              <button onClick={() => navigate("/shop")}>
                Tất cả sản phẩm
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
