import React from "react";

import * as data from "../../../data/productDataExample";

import "./ProductInfo.css";

export default function ProductInfo({ productId }) {
  const productList = data.products;
  //   const typeList = data.types;
  const brandList = data.brands;
  const surfaceList = data.surface;
  const collectionList = data.collections;
  const productData = productList.find(
    (product) => product.id == productId
  );

  return (
    <div className="product__info">
      <div className="product__name">
        {productData.name}
      </div>
      {/* <div className="product__type">
              Product type:{" "}
              {typeList.find(
                (type) => type.id == productData.type_id
              ).type || "Loading..."}
            </div> */}
      <div className="product__brand">
        Brand:{" "}
        {
          brandList.find(
            (brand) => brand.id == productData.brand_id
          ).brand
        }
      </div>
      <div className="product__collection">
        Collection:{" "}
        {
          collectionList.find(
            (collection) =>
              collection.id == productData.collection_id
          ).collection
        }
      </div>

      {productData.type_id == 1 && (
        <div className="product__surface">
          Surface:{" "}
          {
            surfaceList.find(
              (type) => type.id == productData.surface_id
            ).type
          }
        </div>
      )}

      <div className="product__price">
        Price: {productData.price.toLocaleString("vi-VN")}{" "}
        &#8363;
      </div>
    </div>
  );
}
