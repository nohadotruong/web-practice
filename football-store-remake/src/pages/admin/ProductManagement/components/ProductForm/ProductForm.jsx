import React, { useState } from "react";

export default function ProductForm() {
  const [editProduct, setEditProduct] = useState({});
  const [isEditFormOpen, setEditFormOpen] = useState(false);

  function closeEditForm() {
    setEditProduct({});
    setEditFormOpen(false);
  }
  return (
    <div>
      {isEditFormOpen && (
        <div className="edit-product__form w-100 p-3">
          <div className="form__header d-flex">
            <button
              className="ms-auto"
              onClick={closeEditForm}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>

          <form action="">
            <div className="">
              <label htmlFor="id">ID:</label>
              <input
                id="id"
                type="number"
                value={editProduct?.id}
                readOnly
              />
            </div>
            <div className="">
              <label htmlFor="">Name:</label>
              <input
                type="text"
                value={editProduct?.name}
                readOnly={editProduct}
              />
            </div>
            <div className="">
              <label htmlFor="">Type:</label>
              <input
                type="text"
                value={editProduct?.type}
                readOnly={editProduct}
              />
            </div>
            <div className="">
              <label htmlFor="">Brand:</label>
              <input
                type="text"
                value={editProduct?.brand}
                readOnly={editProduct}
              />
            </div>
            <div className="">
              <label htmlFor="">Collection:</label>
              <input
                type="text"
                value={editProduct?.collection}
                readOnly={editProduct}
              />
            </div>
            <div className="">
              <label htmlFor="">Price:</label>
              <input
                type="number"
                value={editProduct?.price}
                min={0}
              />
            </div>
            <div className="">
              <label htmlFor="">Stock:</label>
              <input
                type="number"
                value={editProduct?.stock}
                min={0}
              />
            </div>

            <div>
              <label htmlFor="">Thumbnail:</label>
              <input type="file" />
            </div>
            <div>
              <label htmlFor="">Front:</label>
              <input type="file" />
            </div>
            <div>
              <label htmlFor="">Back:</label>
              <input type="file" />
            </div>
            <div>
              <label htmlFor="">Top:</label>
              <input type="file" />
            </div>
            <div>
              <label htmlFor="">Bottom:</label>
              <input type="file" />
            </div>
            <div>
              <label htmlFor="">Left:</label>
              <input type="file" />
            </div>
            <div>
              <label htmlFor="">Right:</label>
              <input type="file" />
            </div>
            <div className="product-gallery">
              <img
                src={editProduct?.thumbnail}
                alt="product_thumbnail"
              />
              {editProduct?.gallery.map(
                ({ angle, src }) => (
                  <img
                    key={angle}
                    src={src}
                    alt={`${editProduct.name} ${angle}`}
                    className="gallery__img"
                  />
                )
              )}
            </div>
            <div className="form__button w-100 d-flex align-items-center justify-content-center mt-3">
              <button className="save__button w-100 me-1">
                Save
              </button>
              <button className="delete__button w-100 ms-1">
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
