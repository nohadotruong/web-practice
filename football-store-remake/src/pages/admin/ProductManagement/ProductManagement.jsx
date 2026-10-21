import React, { useState } from "react";

import ProductTable from "./components/ProductTable/ProductTable";
import ProductForm from "./components/ProductForm/ProductForm";

import { product } from "../../../data/productDataExample";

import "./ProductManagement.css";

export default function ProductManagement() {
  const [productTab, setProductTab] = useState("Boots");

  return (
    <div className="product-mng__container w-100 p-3 d-flex justify-content-center">
      <div className="product-list__section d-flex w-100 justify-content-center">
        <h3 className="ms-3">Product list</h3>
        <button className="add-product__button w-100 mb-3">
          Add product
        </button>

        <div className="product-category__tab">
          <button onClick={() => setProductTab("Boots")}>
            Boots
          </button>
          <button onClick={() => setProductTab("Shirts")}>
            Shirts
          </button>
          <button onClick={() => setProductTab("Socks")}>
            Socks
          </button>
          <button onClick={() => setProductTab("Balls")}>
            Balls
          </button>
        </div>
      </div>
    </div>
  );
}
