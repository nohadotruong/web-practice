import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../utils/axiosClient";
import { formatMessage } from "../../../config/errorMessages";
import UserContext from "../../../context/UserContext";

export default function SignInForm({
  t,
  currentLang,
  handleSignup,
  setLoading,
  darkMode,
}) {
  const otherSignIn = [
    {
      title: t("authform.google"),
      icon: "bi bi-google",
      class: `w-fit px-3 py-1 rounded-xl cursor-pointer
              flex justify-center items-center
              bg-[var(--form-btn-google-bg)] text-[var(--form-btn-google-fg)]
              hover:bg-[var(--form-btn-google-hover-bg)]
              active:bg-[var(--form-btn-google-active-bg)]`,
    },
    {
      title: t("authform.facebook"),
      icon: "bi bi-facebook",
      class: `w-fit px-3 py-1 rounded-xl cursor-pointer
              flex justify-center items-center
              bg-[var(--form-btn-facebook-bg)] text-[var(--form-btn-facebook-fg)]
              hover:bg-[var(--form-btn-facebook-hover-bg)]
              active:bg-[var(--form-btn-facebook-active-bg)]`,
    },
  ];

  const { fetchToken } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: localStorage.getItem("newUser") || "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const navigate = useNavigate();

  const inputList = [
    {
      label: t("authform.username"),
      type: "text",
      name: "username",
      value: formData.username,
      error: errors.username,
    },
    {
      label: t("authform.password"),
      type: "password",
      name: "password",
      value: formData.password,
      error: errors.password,
    },
  ];

  function validate() {
    const errors = {};

    if (!formData.username.trim())
      errors.username = formatMessage(
        currentLang,
        "USERNAME_REQUIRED"
      );

    if (!formData.password.trim())
      errors.password = formatMessage(
        currentLang,
        "PASSWORD_REQUIRED"
      );

    return errors;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const result = await axiosClient.post(
        "/users/signin",
        formData
      );

      localStorage.setItem("userToken", result.data.token);
      fetchToken(result.data.token);
      setLoading(false);
      localStorage.removeItem("action");
      localStorage.removeItem("newUser");
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        const dataError = error.response.data.error;

        if (typeof dataError === "object") {
          const translated = {};
          for (const key in dataError) {
            translated[key] = formatMessage(
              currentLang,
              dataError[key]
            );
          }
          setErrors(translated);
        } else {
          alert(formatMessage(currentLang, dataError));
        }
      } else {
        alert(formatMessage(currentLang, "SIGN_IN_FAILED"));
        console.log(error.message);
      }
    }
    setLoading(false);
  }

  return (
    <div
      className={`flex flex-col px-5 py-7 overflow-auto
      bg-[var(--form-bg)] shadow-[var(--form-shadow)]
      border-[var(--form-bd)] border-1 sm:rounded-2xl
      max-h-screen h-full text-[var(--form-fg)] 
      ${darkMode && "dark"}`}
    >
      <p
        className="flex gap-1 cursor-pointer
        text-[var(--form-link-fg)] hover:text-[var(--form-link-hover-fg)]
        active:text-[var(--form-link-active-fg)]"
        onClick={() => {
          navigate("/");
          localStorage.removeItem("newUser");
        }}
      >
        <i className="bi bi-arrow-left"></i>
        <u>{t("authform.return")}</u>
      </p>

      <p className="text-[30px] text-center font-[500] py-4">
        {t("authform.welcomeback")}{" "}
        <a
          href="/"
          className="text-[var(--form-logo-img)] italic"
        >
          TripGo
        </a>
      </p>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          {inputList.map((item, index) => (
            <div key={index} className={`flex flex-col`}>
              <label htmlFor="" className="font-[500] px-1">
                {item.label}
              </label>
              <div className="w-full relative">
                <input
                  type={
                    item.type === "password" &&
                    showPassword[item.name]
                      ? "text"
                      : item.type
                  }
                  className={`bg-[var(--form-ip-bg)] 
                  border-[var(--form-ip-bd)] border-1 rounded-lg 
                  focus:bg-[var(--form-ip-focus-bg)]
                  focus:border-[var(--form-ip-focus-bd)]
                  ps-2 pe-[50px] py-1 w-full`}
                  name={item.name}
                  value={item.value}
                  onChange={handleChange}
                  style={{
                    border: item.error
                      ? "2px solid #ff0000"
                      : undefined,
                  }}
                />
                {item.value !== "" && (
                  <div
                    className="absolute right-[7px] top-0 bottom-0
                flex justify-center items-center gap-1"
                  >
                    {item.type === "password" && (
                      <button
                        tabIndex={1000}
                        type="button"
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            [item.name]:
                              !showPassword[item.name],
                          })
                        }
                      >
                        <i
                          className={`bi ${
                            showPassword[item.name]
                              ? "bi-eye-slash"
                              : "bi-eye"
                          }`}
                        ></i>
                      </button>
                    )}
                    <button
                      tabIndex={1000}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          [item.name]: "",
                        });
                        setErrors({
                          ...errors,
                          [item.name]: "",
                        });
                      }}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                )}
              </div>

              <p
                className={`text-right text-[0px] text-red-500 
                  mt-1 me-1 ${item.error && "text-[14px]"}
                  transition-all duration-300 ease-in-out`}
              >
                {item.error}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-2 mt-2">
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className={`bg-[var(--form-btn-primary-bg)]
              text-[var(--form-btn-primary-fg)] text-[18px]
              hover:bg-[var(--form-btn-primary-hover-bg)]
              hover:shadow-[var(--form-btn-primary-hover-shadow)]
              active:bg-[var(--form-btn-primary-active-bg)]
              active:shadow-[var(--form-btn-primary-active-shadow)]
              focus-visible:bg-[var(--form-btn-primary-hover-bg)]
              focus-visible:shadow-[var(--form-btn-primary-hover-shadow)]
              disabled:bg-[var(--form-btn-disable-bg)]
              disabled:text-[var(--form-btn-disable-fg)]
              disabled:shadow-none
              px-3 py-2 rounded-xl cursor-pointer
              transition-all duration-300 ease-in-out`}
              disabled={Object.values(formData).some(
                (val) => val === ""
              )}
            >
              {t("authform.signin")}
            </button>
            <p className="text-center">
              {t("authform.noaccount")}{" "}
              <u
                onClick={handleSignup}
                className="text-[var(--form-link-fg)] cursor-pointer
                hover:text-[var(--form-link-hover-fg)]
                active:text-[var(--form-link-active-fg)]"
              >
                {t("authform.signup")}
              </u>
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 px-5">
            <hr className="flex-1 text-gray-300" />
            <p>{t("authform.or")}</p>
            <hr className="flex-1 text-gray-300" />
          </div>
          <div className="flex items-center justify-center gap-2 px-5">
            {otherSignIn.map((item, index) => (
              <button
                key={index}
                type="button"
                className={item.class}
                title={item.title}
              >
                <i
                  className={`${item.icon} text-[25px]`}
                ></i>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
