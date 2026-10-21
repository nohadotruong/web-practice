import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductImageSlide from "../../../features/product/ProductImageSlide/ProductImageSlide";
import ProductInfo from "../../../features/product/ProductInfo/ProductInfo";

import "./Product.css";

export default function Product() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  function toCart() {
    const userInfo = JSON.parse(
      localStorage.get("userInfo")
    );
  }

  return (
    <div className="product__container w-100">
      <div className="product__content container w-100">
        <div className="product d-flex row m-0 p-3">
          <div className="m-0 p-0 col-lg-7 col-md-6">
            <ProductImageSlide productId={productId} />
          </div>
          <div className="col-lg-5 col-md-6">
            <ProductInfo productId={productId} />
            <div className="product__option d-flex flex-column justify-content-center align-items-center">
              <button className="d-flex justify-content-center align-items-center w-100 cart__button">
                Add to Cart{" "}
                <i className="bi bi-cart ms-2"></i>
              </button>
              <button className="d-flex justify-content-center align-items-center w-100 buy__button">
                Buy Now{" "}
                <i className="bi bi-cart-check ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
