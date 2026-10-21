import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
// import { useNavigate } from "react-router-dom";

import "./Form.css";

export default function SignInForm({
  authLocation,
  setAuthLocation,
}) {
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setErrors({ username: "", password: "" });

    let hasError = false;
    const newErrors = {
      username: "",
      password: "",
    };

    if (!username.trim()) {
      newErrors.username = "Username cannot be empty!";
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = "Password cannot be empty!";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const userInfo = {
      username: username,
      name: username,
      password: password,
      role: "admin",
    };

    setUser(userInfo);

    localStorage.setItem("userInfo", JSON.stringify(user));

    const oldPath = localStorage.getItem("oldPath");
    localStorage.removeItem("oldPath");
    window.location.href = oldPath;

    // "Incorrect password!"
  };

  return (
    <div className="sign-in__container">
      <div className="form__header text-center">
        <h3>Sign in</h3>
      </div>
      <div className="form__content">
        <form onSubmit={handleSignIn}>
          <div className="form__input mb-2">
            <label htmlFor="">Username:</label>
            <input
              type="text"
              className={`${
                errors.username ? "invalid__input" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="errors__alert">
                {errors.username}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="errors__alert">
                {errors.password}
              </div>
            )}
          </div>
          <div className="form__button mt-3 p-0">
            <button className="w-100" type="submit">
              Sign In
            </button>
            <p className="text-center mt-2">
              Don't have an account?{" "}
              <u onClick={() => setAuthLocation("signup")}>
                Sign up
              </u>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
