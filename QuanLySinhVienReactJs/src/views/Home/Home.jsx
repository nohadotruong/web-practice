import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { useUser } from "../../context/UserContext";

import "./Home.css";
import { UserRepository } from "../../repositories/UserRepository";

export default function Home() {
  const navigate = useNavigate();
  const user = UserRepository.getUserInfoFromLocal();
  console.log(user);

  const allTiles = [
    {
      label: "Thông tin tài khoản",
      icon: "bi-person-circle",
      path: "/profile",
      roles: [0, 1, 2],
    },
    {
      label: {
        0: "Quản lý tài khoản",
        1: "Quản lý sinh viên",
      },
      icon: "bi-people",
      path: "/user_manager",
      roles: [0, 1],
    },
    {
      label: "Quản lý lớp hành chính",
      icon: "bi-building",
      path: "/administrative_class_manager",
      roles: [0],
    },
    {
      label: "Quản lý lớp chuyên ngành",
      icon: "bi-journal-bookmark",
      path: "/major_class_manager",
      roles: [0],
    },
    {
      label: "Quản lý khoa",
      icon: "bi-diagram-3",
      path: "/faculty_manager",
      roles: [0],
    },
    {
      label: "Quản lý học phần",
      icon: "bi-book",
      path: "/course_manager",
      roles: [0],
    },
  ];

  useEffect(() => {
    if (user) {
      document.title = user.role + " | Trang chủ";
    }
  }, [user]);

  return (
    <div className="home-content">
      <div className="row">
        {allTiles
          .filter((tile) =>
            tile.roles.includes(user?.vaitro)
          )
          .map((tile, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-4 col-sm-12 mb-3"
            >
              <button
                className="home-btn w-100 p-2"
                onClick={() => navigate(tile.path)}
              >
                <i
                  className={`bi ${tile.icon}`}
                  style={{ fontSize: "60px" }}
                ></i>
                <br />
                <p className="m-0">
                  {typeof tile.label === "object" &&
                  tile.label !== null
                    ? tile.label[user.vaitro] ?? ""
                    : tile.label}
                </p>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
