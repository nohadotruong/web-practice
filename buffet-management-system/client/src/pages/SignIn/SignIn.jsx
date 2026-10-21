import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

import "./SignIn.css";

const initialFormData = {
  username: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required!";
    }

    if (!formData.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axiosClient.post(
        "/users/signin",
        formData
      );

      setMessage("Loading...");

      setMessage("Sign in successfully!");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data.userInfo)
      );

      navigate("/home");

      setFormData(initialFormData);
    } catch (err) {
      setMessage("Sign in failed!");

      const serverErrors = err.response?.data.error;
      if (serverErrors) {
        setErrors(serverErrors);
      }
      // console.error("Error:", serverErrors || err.message);
    }
  };
  return (
    <div className="login__container">
      <div className="login__section">
        <h2>Buffet Management</h2>
        {message && (
          <p className="status-msg">Status: {message}</p>
        )}
        <form className="login__form w-100">
          <div className="input__section w-100">
            <label className="ps-1" htmlFor="">
              Username:
            </label>{" "}
            <br />
            <input
              className="w-100"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <div className="invalid__alert">
              {errors.username}
            </div>
          </div>
          <div className="input__section w-100 mt-1">
            <label className="ps-1" htmlFor="">
              Password:
            </label>{" "}
            <br />
            <input
              className="w-100"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="invalid__alert">
              {errors.password}
            </div>
          </div>
          <button
            className="sign-in__button w-100 mt-3"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
