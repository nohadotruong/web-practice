import React, { useState } from "react";
import axiosClient from "../api/axiosClient"; // Đường dẫn tùy file của bạn

export default function SignInForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username)
      errors.username = "Username cannot be empty!";
    if (!formData.password)
      errors.password = "Password cannot be empty!";
    return errors;
  };

  const handleSignIn = async () => {
    setMessage("");
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

      setMessage("Sign in success!");

      //   console.log("Response:", res.data);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data.user)
      );
      setFormData({
        username: "",
        password: "",
      });

      //   console.log("User:");
      //   console.log(res.data.user); // undefined
      //   console.log("Token:");
      //   console.log(res.data.token); //eyJhbGciOiJIUzI1NiIsI...
    } catch (err) {
      setMessage("Sign in failed!");
      const serverErrors = err.response?.data.error;
      if (serverErrors) {
        setErrors(serverErrors);
      }

      //   console.error("Error:", serverErrors || err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sign In</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.username}</div>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.password}</div>

      <button onClick={handleSignIn}>Login</button>

      {message && <p>{message}</p>}
    </div>
  );
}
