import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import { UserRepository } from "../../repositories/UserRepository";
// import { RoleRepository } from "../../repositories/RoleRepository";

import "./Authentication.css";

import loginImage from "../../assets/ShopLogo/LoginImg.png";
import UserRepository from "../../repositories/UserRepository";

export default function Authentication() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    cPassword: "",
  });

  function showSignUpForm() {
    document.getElementById("sign-up-form").style.display =
      "flex";
    document.getElementById("sign-in-form").style.display =
      "none";
  }

  function showSignInForm() {
    document.getElementById("sign-in-form").style.display =
      "flex";
    document.getElementById("sign-up-form").style.display =
      "none";
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập!";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu!";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const res = await UserRepository.login(
      username,
      password
    );
    console.log(res);

    if (typeof res === "object") {
      const userInfo = await UserRepository.getUserById(
        res.id
      );
      localStorage.setItem(
        "userInfo",
        JSON.stringify(userInfo)
      );
      const oldPath = localStorage.getItem("oldPath");

      localStorage.removeItem("oldPath");
      window.location.href = oldPath;
    } else if (res === 1) {
      setErrors({
        username: "",
        password: "Sai mật khẩu!",
      });
    } else if (res === 2) {
      setErrors({
        username: "Tài khoản không tồn tại!",
        password: "",
      });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = {
      email: "",
      username: "",
      name: "",
      password: "",
      cPassword: "",
    };

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email!";
      hasError = true;
    }

    if (!username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập!";
      hasError = true;
    }

    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập tên của bạn!";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu!";
      hasError = true;
    }

    if (!cPassword.trim()) {
      newErrors.cPassword = "Vui lòng xác nhận mật khẩu!";
      hasError = true;
    }

    if (password.trim() !== cPassword.trim()) {
      newErrors.cPassword = "Mật khẩu không trùng khớp!";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const user = {
      email,
      username,
      name,
      password,
      role: "customer",
    };

    try {
      const userId = await UserRepository.addUser(user);
      console.log("User ID:", userId);

      const userInfo = await UserRepository.getUserById(
        userId
      );
      if (!userInfo) {
        alert("Lỗi khi lấy lại thông tin user");
        return;
      }

      alert(
        "Đăng ký thành công! Chào mừng " +
          userInfo.name +
          "!"
      );

      setEmail("");
      setUsername("");
      setName("");
      setPassword("");
      setCPassword("");

      localStorage.setItem(
        "userInfo",
        JSON.stringify(userInfo)
      );

      const oldPath = localStorage.getItem("oldPath");
      localStorage.removeItem("oldPath");
      window.location.href = oldPath || "/";
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form" id="sign-in-form">
        <label
          style={{
            textTransform: "uppercase",
            fontSize: "25px",
          }}
        >
          Đăng nhập
        </label>
        <form onSubmit={handleSignInSubmit}>
          <div className="">
            <label>Tên đăng nhập:</label> <br />
            <input
              type="text"
              className={`${
                errors.username ? "invalid" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="invalid-feedback m-0">
                {errors.username}
              </div>
            )}
          </div>
          <div className="">
            <label>Mật khẩu:</label> <br />
            <input
              type="password"
              className={`${
                errors.password ? "invalid" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
            />
            {errors.password && (
              <div className="invalid-feedback m-0">
                {errors.password}
              </div>
            )}
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
        <p>
          Chưa có tài khoản?{" "}
          <u
            onClick={() => showSignUpForm()}
            style={{ cursor: "pointer" }}
          >
            Đăng ký
          </u>
        </p>
      </div>

      <div className="auth-form" id="sign-up-form">
        <label
          style={{
            textTransform: "uppercase",
            fontSize: "25px",
          }}
        >
          Đăng ký
        </label>
        <form onSubmit={handleSignUpSubmit}>
          <div className="">
            <label>Email:</label> <br />
            <input
              type="email"
              className={`${errors.email ? "invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback m-0">
                {errors.email}
              </div>
            )}
          </div>
          <div className="">
            <label>Tên đăng nhập:</label> <br />
            <input
              type="text"
              className={`${
                errors.username ? "invalid" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="invalid-feedback m-0">
                {errors.username}
              </div>
            )}
          </div>
          <div className="">
            <label>Họ và tên:</label> <br />
            <input
              type="text"
              className={`${errors.name ? "invalid" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="invalid-feedback m-0">
                {errors.name}
              </div>
            )}
          </div>
          <div className="">
            <label>Mật khẩu:</label> <br />
            <input
              type="password"
              className={`${
                errors.password ? "invalid" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
            />
            {errors.password && (
              <div className="invalid-feedback m-0">
                {errors.password}
              </div>
            )}
          </div>
          <div className="">
            <label>Xác nhận mật khẩu:</label> <br />
            <input
              type="password"
              className={`${
                errors.cPassword ? "invalid" : ""
              }`}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              name=""
            />
            {errors.cPassword && (
              <div className="invalid-feedback m-0">
                {errors.cPassword}
              </div>
            )}
          </div>

          <button type="submit">Đăng ký</button>

          {/* <div className="social-auth">
              <button>
                <i className="bi bi-google"></i>
              </button>
              <button>
                <i className="bi bi-facebook"></i>
              </button>
            </div> */}
        </form>
        <p>
          Đã có tài khoản?{" "}
          <u
            style={{ cursor: "pointer" }}
            onClick={() => showSignInForm()}
          >
            Đăng nhập
          </u>
        </p>
      </div>
    </div>
  );
}
