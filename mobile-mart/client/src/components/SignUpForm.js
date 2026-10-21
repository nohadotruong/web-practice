import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    phone: "",
    password: "",
    confirmPw: "",
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email)
      errors.email = "Email cannot be empty!";
    else if (!emailRegex.test(formData.email))
      errors.email = "Email is invalid!";

    if (!formData.username)
      errors.username = "Username cannot be empty!";

    if (!formData.fullname)
      errors.fullname = "Fullname cannot be empty!";

    if (!formData.phone)
      errors.phone = "Phone cannot be empty!";

    if (!formData.password)
      errors.password = "Password cannot be empty!";

    if (!formData.confirmPw)
      errors.confirmPw =
        "Confirm password cannot be empty!";

    if (
      formData.password &&
      formData.confirmPw &&
      formData.password !== formData.confirmPw
    )
      errors.confirmPw = "Passwords do not match!";

    return errors;
  };

  const handleSignUp = async () => {
    // console.log("Sending signup data:", formData);
    setMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axiosClient.post(
        "/users/signup",
        formData
      );

      setMessage("Sign up success!");

      //   console.log("Reponse: ", res.data);

      setFormData({
        email: "",
        username: "",
        fullname: "",
        phone: "",
        password: "",
        confirmPw: "",
      });

      setErrors({});
    } catch (err) {
      setMessage("Sign up failed!");

      const serverErrors = err.response?.data.error;
      if (serverErrors) {
        setErrors(serverErrors);
      }

      //   console.error("Error:", serverErrors || err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sign Up</h2>

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.email}</div>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.username}</div>

      <input
        type="text"
        name="fullname"
        placeholder="Full name"
        value={formData.fullname}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.fullname}</div>

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.phone}</div>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.password}</div>

      <input
        type="password"
        name="confirmPw"
        placeholder="Confirm Password"
        value={formData.confirmPw}
        onChange={handleChange}
      />
      <div style={{ color: "red" }}>{errors.confirmPw}</div>

      <button onClick={handleSignUp}>Register</button>

      {message && <p>{message}</p>}
    </div>
  );
}
