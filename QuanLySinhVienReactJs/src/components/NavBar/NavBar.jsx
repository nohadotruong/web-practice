import React from "react";
import { NavLink } from "react-router-dom";

import UserRepository from "../../repositories/UserRepository";

import "./NavBar.css";

import studyBackground from "../../assets/study-background.jpg";

export default function NavBar({ isOpen, closeNavBar }) {
  const user = UserRepository.getUserInfoFromLocal();
  const role = user.vaitro;

  const links = [
    {
      path: "/home",
      label: "Trang chủ",
      roles: [0, 1, 2],
      icon: "bi-display",
    },
    {
      path: "/profile",
      label: "Thông tin tài khoản",
      roles: [0, 1, 2],
      icon: "bi-person-circle",
    },
    {
      path: "/user_manager",
      label: "Quản lý tài khoản",
      roles: [0],
      icon: "bi-people",
    },
    {
      path: "/administrative_class_manager",
      label: "Quản lý lớp hành chính",
      roles: [0],
      icon: "bi-building",
    },
    {
      path: "/major_class_manager",
      label: "Quản lý lớp chuyên ngành",
      roles: [0],
      icon: "bi-journal-bookmark",
    },
    {
      path: "/faculty_manager",
      label: "Quản lý khoa",
      roles: [0],
      icon: "bi-diagram-3",
    },
    {
      path: "/course_manager",
      label: "Quản lý học phần",
      roles: [0],
      icon: "bi-book",
    },

    {
      path: "/student_manager",
      label: "Quản lý sinh viên",
      roles: [1],
      icon: "bi-people",
    },
  ];

  return (
    <div
      className="navbar-wrapper"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="navbar p-0">
        <img src={studyBackground} alt="" />
        {links
          .filter((link) => link.roles.includes(role))
          .map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                "navbar-btn" + (isActive ? " active" : "")
              }
              onClick={closeNavBar}
            >
              <i className={`bi ${link.icon}`}></i>
              <p className="navbar-text">{link.label}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
}
