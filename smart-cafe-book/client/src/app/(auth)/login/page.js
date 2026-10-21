"use client";
import { useState } from "react";

import api from "@/services/api";
import Loading from "@/components/Loading";
import { Eye, EyeOff, X } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const [loading, setLoading] = useState(false);
  // const [toast, setToast] = useState("Hello");

  const inputList = [
    {
      name: "identifier",
      label: "Email hoặc tên đăng nhập",
      type: "text",
      colSpan: 2,
      value: formData.identifier,
      error: errors.identifier,
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      colSpan: 2,
      value: formData.password,
      error: errors.password,
    },
  ];

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const errors = {};

    if (!formData.identifier)
      errors.identifier = "Vui lòng nhập thông tin!";

    if (!formData.password.trim())
      errors.password = "Vui lòng nhập mật khẩu!";

    return errors;
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
      const result = await api.post(
        "/users/login",
        formData
      );

      console.log(result);

      alert(result.data.message);
      localStorage.setItem("userToken", result.data.token);
      const userRole = result.data.role;
      if (userRole === 1) window.location.href = "/";
      else window.location.href = "/admin";
    } catch (error) {
      alert(error.response?.data?.message);
      setErrors(error.response?.data?.errors);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div
      className="h-full w-full flex flex-col justify-center gap-2
      transition-all duration-300 ease-in-out"
    >
      <h2
        className="text-center text-[40px] 
        uppercase text-[var(--auth-fg)]"
      >
        Đăng nhập
      </h2>

      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3
        overflow-auto bg-[var(--form-bg)]
        border-1 border-[var(--form-bd)] p-3 rounded-lg
        transition-all duration-300 ease-in-out"
      >
        <div className="grid grid-cols-2 gap-2 w-full">
          {inputList.map(
            ({
              name,
              label,
              type,
              colSpan,
              value,
              placeholder,
              error,
            }) => (
              <div
                key={label}
                className={`flex flex-col w-full ${
                  colSpan == 1 ? "col-span-1" : "col-span-2"
                }`}
              >
                <label className="ms-1 font-[500] text-[18px]">
                  {label}
                </label>

                <div className="w-full relative">
                  <input
                    type={
                      type === "password" &&
                      showPassword[name]
                        ? "text"
                        : type
                    }
                    className={`rounded-md ps-2 py-1 w-full
                    ${
                      type === "password"
                        ? "pe-[60px]"
                        : type === "date"
                        ? "pe-2"
                        : "pe-[30px]"
                    } 
                    ${
                      error
                        ? "border-[var(--ip-error-bd)]"
                        : "border-[var(--ip-bd)]"
                    }
                    bg-[var(--ip-bg)] text-[var(--ip-fg)]
                     border-1 outline-0
                    focus:bg-[var(--ip-focus-bg)]
                    focus:border-[var(--ip-focus-bd)]
                    transition-all duration-300 ease-in-out`}
                    value={value}
                    name={name}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />

                  {type !== "date" && value !== "" && (
                    <button
                      type="button"
                      className="absolute right-[5px] top-0 bottom-0"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          [name]: "",
                        })
                      }
                    >
                      {<X />}
                    </button>
                  )}

                  {type === "password" && value !== "" && (
                    <button
                      type="button"
                      className="absolute right-[30px] top-0 bottom-0"
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          [name]: !showPassword[name],
                        })
                      }
                    >
                      {showPassword[name] ? (
                        <EyeOff />
                      ) : (
                        <Eye />
                      )}
                    </button>
                  )}
                </div>

                <p
                  className={`${
                    colSpan == 1
                      ? "col-span-1"
                      : "col-span-2"
                  } text-right text-red-500`}
                >
                  {error}
                </p>
              </div>
            )
          )}
        </div>

        <button
          type="submit"
          className="w-full py-1 
          text-[20px] bg-[var(--form-primary-btn-bg)]
          rounded-xl uppercase cursor-pointer
          text-[var(--form-primary-btn-fg)]
          hover:bg-[var(--form-primary-btn-hover-bg)]
          active:bg-[var(--form-primary-btn-active-bg)]
          transition-all duration-300 ease-in-out"
        >
          Đăng nhập
        </button>

        <button
          type="button"
          className="w-full py-1 
          text-[18px] cursor-pointer rounded-xl
          bg-[var(--form-secondary-btn-bg)]
          text-[var(--form-secondary-btn-fg)]
          hover:bg-[var(--form-secondary-btn-hover-bg)]
          active:bg-[var(--form-secondary-btn-active-bg)]
          transition-all duration-300 ease-in-out"
          onClick={() =>
            (window.location.href = "/register")
          }
        >
          Chưa có tài khoản? Đăng ký
        </button>

        <button
          type="button"
          className="w-full py-1 
          text-[18px] cursor-pointer rounded-xl
          bg-[var(--form-third-btn-bg)]
          text-[var(--form-third-btn-fg)]
          hover:bg-[var(--form-third-btn-hover-bg)]
          active:bg-[var(--form-third-btn-active-bg)]
          transition-all duration-300 ease-in-out"
          onClick={() => (window.location.href = "/")}
        >
          Quay lại
        </button>
      </form>

      {loading && <Loading />}
      {/* <Toast toast={toast} setToast={setToast} /> */}
    </div>
  );
}
