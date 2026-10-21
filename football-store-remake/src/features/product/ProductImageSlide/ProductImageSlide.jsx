import React, { useState } from "react";

import { galleries } from "../../../data/productDataExample";

import "./ProductImageSlide.css";

export default function ProductImageSlide({ productId }) {
  const galleryList = galleries;

  const productGalleryList = galleryList.filter(
    (image) => image.product_id == productId
  );

  const [imageIdx, setImageIdx] = useState(0);

  function nextImg(id) {
    setImageIdx(
      id < productGalleryList.length - 1 ? id + 1 : 0
    );
  }
  function backImg(id) {
    setImageIdx(
      id > 0 ? id - 1 : productGalleryList.length - 1
    );
  }

  return (
    <div className="product__image">
      <div className="image__section">
        {productGalleryList.map((image, index) =>
          imageIdx == index ? (
            <img
              key={index}
              src={image.src}
              alt={image.angle}
            />
          ) : (
            ""
          )
        )}
      </div>
      <div className="button__section">
        <button
          className="me-auto"
          onClick={() => backImg(imageIdx)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className="ms-auto"
          onClick={() => nextImg(imageIdx)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
