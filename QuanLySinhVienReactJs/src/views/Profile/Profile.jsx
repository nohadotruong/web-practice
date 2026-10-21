import React, { useEffect, useState } from "react";

import UserRepository from "../../repositories/UserRepository";

import "./Profile.css";

import defaultAva from "../../assets/default-avatar.png";

export default function Profile() {
  const user = UserRepository.getUserInfoFromLocal();
  const [activeTab, setActiveTab] = useState("personal");

  let hoUs = "",
    tenUs = "",
    hoTenUs = "",
    ngaySinhUs = "",
    noiSinhUs = "",
    gioiTinhUs = "",
    maUs = "",
    vaitroUs = "",
    nienKhoaUs = "",
    lopUs = "",
    khoaUs = "",
    namBatDauUs = "";

  if (user) {
    hoUs = user.ho;
    tenUs = user.ten;
    hoTenUs = user.hoten;
    ngaySinhUs = user.ngaysinh;
    noiSinhUs = user.noisinh;
    gioiTinhUs = user.gioitinh;
    maUs = user.maso;
    vaitroUs = user.role;
    nienKhoaUs = user.nienkhoa;
    lopUs = user.adclass;
    khoaUs = user.faculty;
    namBatDauUs = user.nambatdau;
  }

  const allPersonalInfos = [
    {
      label: "Họ:",
      value: hoUs,
      roles: [0, 1, 2],
      style: { textTransform: "uppercase" },
    },
    {
      label: "Tên:",
      value: tenUs,
      roles: [0, 1, 2],
      style: { textTransform: "uppercase" },
    },
    {
      label: "Họ và tên:",
      value: hoTenUs,
      roles: [0, 1, 2],
      style: { textTransform: "uppercase" },
    },
    {
      label: "Ngày sinh:",
      value: ngaySinhUs,
      roles: [0, 1, 2],
      style: {},
    },
    {
      label: "Nơi sinh:",
      value: noiSinhUs,
      roles: [0, 1, 2],
      style: {},
    },
    {
      label: "Giới tính:",
      value: gioiTinhUs,
      roles: [0, 1, 2],
      style: {},
    },
  ];

  const AllAcaInfos = [
    {
      label: {
        0: "Mã nhân viên:",
        1: "Mã giảng viên:",
        2: "Mã sinh viên:",
      },
      value: maUs,
      roles: [0, 1, 2],
      style: {},
    },
    {
      label: "Họ:",
      value: hoUs,
      roles: [0, 1, 2],
      style: { textTransform: "uppercase" },
    },
    {
      label: "Tên:",
      value: tenUs,
      roles: [0, 1, 2],
      style: { textTransform: "uppercase" },
    },
    {
      label: "Họ và tên:",
      value: hoTenUs,
      roles: [0, 1, 2],
      style: { textTransform: "uppercase" },
    },
    {
      label: "Chức vụ:",
      value: vaitroUs,
      roles: [0, 1],
      style: {},
    },
    {
      label: {
        1: "Lớp quản lý:",
        2: "Lớp:",
      },
      value: lopUs,
      roles: [1, 2],
      style: {},
    },
    {
      label: "Khóa:",
      value: nienKhoaUs,
      roles: [2],
      style: {},
    },
    {
      label: "Khoa:",
      value: khoaUs,
      roles: [1, 2],
      style: {},
    },
    {
      label: {
        0: "Năm bắt đầu công tác:",
        1: "Năm bắt đầu công tác:",
        2: "Năm nhập học:",
      },
      value: namBatDauUs,
      roles: [0, 1, 2],
      style: {},
    },
  ];

  useEffect(() => {
    // console.log(user);

    if (user) {
      document.title = user.role + " | Thông tin cá nhân";
    }
  }, [user]);

  return (
    <div className="profile-content m-3 p-2">
      <div className="tab-bar">
        <div
          className={`tab-btn ${
            activeTab === "personal" ? "active" : ""
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Thông tin cá nhân
        </div>
        <div
          className={`tab-btn ${
            activeTab === "academic" ? "active" : ""
          }`}
          onClick={() => setActiveTab("academic")}
        >
          Thông tin theo trường
        </div>
      </div>

      <div className="info-wrapper">
        {activeTab === "personal" && (
          <div>
            <div className="info">
              <div className="header">
                Thông tin cá nhân
              </div>
              <div className="body">
                <div className="row info-image">
                  <div className="col-12 col-lg-3 d-flex flex-column align-items-center justify-content-center p-1">
                    <img src={defaultAva} alt="" />
                    <p
                      className="m-0 mt-1"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "500",
                      }}
                    >
                      {user && user.hoten
                        ? user.hoten
                        : "Đang tải..."}
                    </p>
                  </div>
                  <div className="col-12 col-lg-9 row d-flex                    justify-content-center align-items-center info-content m-0">
                    {allPersonalInfos
                      .filter((info) =>
                        info.roles.includes(user?.vaitro)
                      )
                      .map((info, index) => (
                        <div
                          key={index}
                          className="col-12 col-lg-4 mb-2"
                        >
                          <label className="mb-1 ms-1">
                            {info.label}
                          </label>
                          <br />
                          <input
                            className="w-100 p-1 ps-2"
                            type="text"
                            readOnly
                            value={info.value}
                            style={info.style}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "academic" && (
          <div>
            <div className="info">
              <div className="header">
                Thông tin theo trường
              </div>
              <div className="body">
                <div className="row info-content">
                  {AllAcaInfos.filter((info) =>
                    info.roles.includes(user?.vaitro)
                  ).map((info, index) => (
                    <div
                      key={index}
                      className="col-12 col-lg-4 mb-2"
                    >
                      <label className="mb-1 ms-1">
                        {typeof info.label === "object"
                          ? info.label?.[user?.vaitro] ?? ""
                          : info.label}
                      </label>
                      <br />
                      <input
                        className="w-100 p-1 ps-2"
                        type="text"
                        readOnly
                        value={info.value}
                        style={info.style}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
