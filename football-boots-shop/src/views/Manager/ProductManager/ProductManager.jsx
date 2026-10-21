import React, { useState } from "react";

import "./ProductManager.css";

import NikeMer from "../../../assets/Nike/Mercurial/MerMadVoltagePack.png";

export default function ProductManager() {
  const [pName, setPName] = useState("");
  const [pBrand, setPBrand] = useState(0);
  const [pType1, setPType1] = useState(0);
  const [pType2, setPType2] = useState("");
  const [pPack, setPPack] = useState("");
  const [pSurface, setPSurface] = useState(0);
  const [pAnkle, setPAnkle] = useState(0);
  const [pPlayer, setPPlayer] = useState("");
  const [pQuantity, setPQuantity] = useState(0);
  const [pPrice, setPPrice] = useState(0);
  const [pAvaImg, setPAvaImg] = useState("");
  const [pImg1, setPImg1] = useState("");
  const [pImg2, setPImg2] = useState("");
  const [pImg3, setPImg3] = useState("");
  const [pImg4, setPImg4] = useState("");
  const [pImg5, setPImg5] = useState("");
  const [errors, setErrors] = useState({
    pName: "",
    pBrand: "",
    pType1: "",
    pType2: "",
    pPack: "",
    pSurface: "",
    pAnkle: "",
    pPlayer: "",
    pQuantity: "",
    pPrice: "",
    pAvaImg: "",
    pImg1: "",
    pImg2: "",
    pImg3: "",
    pImg4: "",
    pImg5: "",
  });

  return (
    <div className="product-m-container p-3">
      <div className="product-search">
        <input type="text" placeholder="Tìm kiếm..." />
        <button className="search-btn">
          <i className="bi bi-search"></i>
        </button>
      </div>

      <div className="product-m-option">
        <button>Nhập sản phẩm</button>
        <form action="" className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <label>Tên sản phẩm:</label> <br />
            <input
              type="text"
              className={`${errors.pName ? "invalid" : ""}`}
              value={pName}
              onChange={(e) => setPName(e.target.value)}
            />
            <div className="invalid-feedback m-0">
              {errors.pName}
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-3">
            <label>Hãng:</label> <br />
            <select
              value={pBrand}
              onChange={(e) =>
                setPBrand(Number(e.target.value))
              }
              name=""
            >
              <option value={0}>Lựa chọn</option>
              <option value={1}>Adidas</option>
              <option value={2}>Nike</option>
              <option value={3}>Puma</option>
            </select>
            <div className="invalid-feedback m-0">
              {errors.pBrand}
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-3">
            <label>Dòng:</label> <br />
            <select
              value={pType1}
              onChange={(e) => setPType1(e.target.value)}
              name=""
              id=""
            >
              {pBrand === 1 && (
                <>
                  <option value="none">Lựa chọn</option>
                  <option value="f50">F50</option>
                  <option value="predator">Predator</option>
                  <option value="copa">Copa</option>
                </>
              )}
              {pBrand === 2 && (
                <>
                  <option value="none">Lựa chọn</option>
                  <option value="mercurial">
                    Mercurial
                  </option>
                  <option value="phantom">Phantom</option>
                  <option value="tiempo">Tiempo</option>
                </>
              )}
              {pBrand === 3 && (
                <>
                  <option value="none">Lựa chọn</option>
                  <option value="future">Future</option>
                  <option value="king">King</option>
                  <option value="ultra">Ultra</option>
                </>
              )}
            </select>
            <div className="invalid-feedback m-0">
              {errors.pType1}
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-3">
            <label>Loại:</label> <br />
            <select
              value={pType2}
              onChange={(e) => setPType2(e.target.value)}
              name=""
              id=""
            >
              {pType1 === "mercurial" && (
                <>
                  <option value="none">Lựa chọn</option>
                  <option value="superfly">Superfly</option>
                  <option value="vapor">Vapor</option>
                </>
              )}
            </select>
            <div className="invalid-feedback m-0">
              {errors.pType2}
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-5">
            <label>BST:</label> <br />
            <input
              type="text"
              name=""
              value={pPack}
              onChange={(e) => setPPack(e.target.value)}
            />
            <div className="invalid-feedback m-0">
              {errors.pPack}
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-4">
            <label>Đế:</label> <br />
            <select
              value={pSurface}
              onChange={(e) =>
                setPSurface(Number(e.target.value))
              }
              name=""
              id=""
            >
              <option value={0}>Lựa chọn</option>
              <option value={1}>Cỏ tự nhiên - FG</option>
              <option value={2}>
                Cỏ nhân tạo (Cao) - AG
              </option>
              <option value={3}>
                Cỏ nhân tạo (Thấp) - TF
              </option>
              <option value={4}>Futsal - IC</option>
            </select>
            <div className="invalid-feedback m-0">
              {errors.pSurface}
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-2">
            <label>Cổ:</label> <br />
            <select name="" id="">
              <option value="">Cao</option>
              <option value="">Vừa</option>
              <option value="">Thấp</option>
            </select>
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-4">
            <label>Cầu thủ:</label> <br />
            <input type="text" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-3">
            <label>Số lượng:</label> <br />
            <input type="number" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-3">
            <label>Giá:</label> <br />
            <input
              type="number"
              min={0}
              max={10000000}
              name=""
            />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6">
            <label>Ảnh bìa:</label> <br />
            <input type="file" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <label>Ảnh 1 (Ngoài):</label> <br />
            <input type="file" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <label>Ảnh 2 (Trong):</label> <br />
            <input type="file" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <label>Ảnh 3 (Trên):</label> <br />
            <input type="file" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <label>Ảnh 4 (Dưới):</label> <br />
            <input type="file" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <label>Ảnh 5 (Gót):</label> <br />
            <input type="file" name="" />
            <div className="invalid-feedback m-0"></div>
          </div>

          <div className="col-6">
            <button>Lưu</button>
          </div>

          <div className="col-6">
            <button id="cancel-btn">Hủy</button>
          </div>
        </form>
      </div>

      <div className="product-filter">Filter</div>

      <h2
        style={{
          textTransform: "uppercase",
          color: "#ceff00",
        }}
      >
        Danh sách sản phẩm
      </h2>
      <div className="product-m-list">
        <table className="table table-dark table-hover text-center w-100">
          <thead>
            <tr>
              <th scope="col">Tên</th>
              <th scope="col">Đế</th>
              <th scope="col">Cổ</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá</th>
              <th scope="col">Ảnh</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Nike Air Zoom Mercurial Vapor 16 Elite FG
                Mad Voltage - Volt/Black
              </td>
              <td>Cỏ tự nhiên - FG</td>
              <td>Thấp</td>
              <td>50</td>
              <td>7.000.000 &#8363;</td>
              <td>
                <img src={NikeMer} alt="" />
              </td>
              <td>
                <button className="">
                  <i className="bi bi-arrow-right-circle"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <div className="list-item row m-0">
          <div className="item-info col-4">
            <form action="">
              <div className="product-id">
                <label htmlFor="">Mã:</label>
                <input
                  type="text"
                  value={"3v1CE2ZpxjT35BPzAmBZ"}
                  readOnly
                />
              </div>
              <div className="product-name">
                <label htmlFor="">Tên:</label>
                <input
                  type="text"
                  value={
                    "Nike Air Zoom Mercurial Vapor 16 Elite FG Mad Voltage - Volt/Black"
                  }
                  readOnly
                />
              </div>
              <div className="product-name">
                <label htmlFor="">Hãng:</label>
                <input
                  type="text"
                  value={"Nike"}
                  readOnly
                />
              </div>
            </form>
          </div>
          <div className="image-list col-8">
            <img src={NikeMer} alt="" />
            <img src={NikeMer} alt="" />
            <img src={NikeMer} alt="" />
            <img src={NikeMer} alt="" />
            <img src={NikeMer} alt="" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
