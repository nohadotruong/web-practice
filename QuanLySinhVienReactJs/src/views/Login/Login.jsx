import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { UserRepository } from "../../repositories/UserRepository";
import { RoleRepository } from "../../repositories/RoleRepository";

import "./Login.css";

import loginImage from "../../assets/login-image.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập";
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Vui lòng nhập mã đăng nhập!";
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

    if (typeof res === "object") {
      const userInfo = await UserRepository.getUserById(
        res.id
      );
      // console.log(userInfo);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(userInfo)
      );
      document.title = "Trang chủ";
      navigate("/home");
    } else if (res === 1) {
      setErrors({
        username: "",
        password: "Sai mật khẩu!",
      });
    } else if (res === 2) {
      setErrors({
        username: "Sai mã đăng nhập!",
        password: "",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="col-12 col-md-5 login-image">
        <img src={loginImage} alt="" />
      </div>
      <div className="col-12 col-md-7 login-form">
        <h1 className="mb-5">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
              >
                Mã đăng nhập
              </span>
              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                id="login-username"
                aria-label="Mã đăng nhập"
                aria-describedby="basic-addon1"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
              >
                Mật khẩu
              </span>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="login-password"
                aria-label="Mật khẩu"
                aria-describedby="basic-addon1"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>
          </div>
          <button
            className="login-btn w-100 mb-2"
            type="submit"
          >
            Đăng nhập
          </button>
          <div className="login-forgot text-center">
            <p className="m-auto">Quên mật khẩu</p>
          </div>
        </form>
      </div>
    </div>
  );
}
