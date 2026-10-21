import React, { useState } from "react";

import SignInForm from "../../../features/auth/AuthForm/SignInForm";
import SignUpForm from "../../../features/auth/AuthForm/SignUpForm";

import "./Authentication.css";

import Logo from "../../../assets/logo_shop.png";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const navigate = useNavigate();

  const [authLocation, setAuthLocation] =
    useState("signin");

  return (
    <div className="authentication__container row p-0 m-0">
      <div className="authentication__content col-lg-4 col-md-5 col-sm-6 col-11 p-0 m-0">
        <div className="header__content">
          <img
            src={Logo}
            alt=""
            onClick={() => navigate("/")}
          />
        </div>
        <div className="body__content">
          {authLocation === "signin" && (
            <SignInForm
              authLocation={authLocation}
              setAuthLocation={setAuthLocation}
            />
          )}
          {authLocation === "signup" && (
            <SignUpForm
              authLocation={authLocation}
              setAuthLocation={setAuthLocation}
            />
          )}
        </div>
      </div>
    </div>
  );
}
