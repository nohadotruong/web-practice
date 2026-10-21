import React, { useState } from "react";

import "./Form.css";

export default function SignUpForm({
  authLocation,
  setAuthLocation,
}) {
  const [email, SetEmail] = useState("");
  const [username, SetUsername] = useState("");
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [cPassword, SetCPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    cPassword: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    setErrors({
      email: "",
      username: "",
      name: "",
      password: "",
      cPassword: "",
    });

    let hasError = false;
    const newErrors = {
      email: "",
      username: "",
      name: "",
      password: "",
      cPassword: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email cannot be empty!";
      hasError = true;
    }

    if (!username.trim()) {
      newErrors.username = "Username cannot be empty!";
      hasError = true;
    }

    if (!name.trim()) {
      newErrors.name = "Name cannot be empty!";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Password cannot be empty!";
      hasError = true;
    }

    if (!cPassword.trim()) {
      newErrors.cPassword = "Please confirm your password!";
      hasError = true;
    }

    if (password !== cPassword) {
      newErrors.cPassword = "Passwords do not match!";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // console.log(email);
    // console.log(username);
    // console.log(name);
    // console.log(password);
    // console.log(cPassword);

    // "Incorrect password!"
  };

  return (
    <div className="sign-in__container">
      <div className="form__header text-center">
        <h3>Sign up</h3>
      </div>
      <div className="form__content">
        <form onSubmit={handleSignUp}>
          <div className="form__input mb-2">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              className={`${
                errors.email ? "invalid__input" : ""
              }`}
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
            {errors.email && (
              <div className="errors__alert">
                {errors.email}
              </div>
            )}
          </div>
          <div className="form__input mb-2">
            <label htmlFor="">Username:</label>
            <input
              type="text"
              className={`${
                errors.username ? "invalid__input" : ""
              }`}
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
            />
            {errors.username && (
              <div className="errors__alert">
                {errors.username}
              </div>
            )}
          </div>
          <div className="form__input mb-2">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              className={`${
                errors.name ? "invalid__input" : ""
              }`}
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
            {errors.name && (
              <div className="errors__alert">
                {errors.name}
              </div>
            )}
          </div>
          <div className="form__input mb-2">
            <label htmlFor="">Password:</label>
            <input
              type="password"
              className={`${
                errors.password ? "invalid__input" : ""
              }`}
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
            {errors.password && (
              <div className="errors__alert">
                {errors.password}
              </div>
            )}
          </div>
          <div className="form__input mb-2">
            <label htmlFor="">Confirm password:</label>
            <input
              type="password"
              className={`${
                errors.cPassword ? "invalid__input" : ""
              }`}
              value={cPassword}
              onChange={(e) => SetCPassword(e.target.value)}
            />
            <div className="errors__alert">
              {errors.cPassword}
            </div>
          </div>
          <div className="form__button mt-3 p-0">
            <button className="w-100" type="submit">
              Sign Up
            </button>
            <p className="text-center mt-2">
              Already have an account?{" "}
              <u onClick={() => setAuthLocation("signin")}>
                Sign in
              </u>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
