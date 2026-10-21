"use client";
import { useState } from "react";

import api from "@/services/api";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";

import { Eye, EyeOff, X } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    dob: "",
    phone: "",
    password: "",
    cfPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const [loading, setLoading] = useState(false);
  // const [toast, setToast] = useState("Hello");

  const inputList = [
    {
      name: "email",
      label: "Email *",
      type: "email",
      colSpan: 2,
      value: formData.email,
      placeholder: "nguyenvana@example.com",
      error: errors.email,
    },
    {
      name: "username",
      label: "Tên đăng nhập *",
      type: "text",
      colSpan: 2,
      value: formData.username,
      placeholder: "nguyenvana",
      error: errors.username,
    },
    {
      name: "lastname",
      label: "Họ",
      type: "text",
      colSpan: 1,
      value: formData.lastname,
      placeholder: "Nguyễn Văn",
    },
    {
      name: "firstname",
      label: "Tên",
      type: "text",
      colSpan: 1,
      value: formData.firstname,
      placeholder: "A",
    },
    {
      name: "dob",
      label: "Ngày sinh",
      type: "date",
      colSpan: 2,
      value: formData.dob,
    },
    {
      name: "phone",
      label: "Số điện thoại *",
      type: "tel",
      colSpan: 2,
      value: formData.phone,
      placeholder: "0123456789",
      error: errors.phone,
    },
    {
      name: "password",
      label: "Mật khẩu *",
      type: "password",
      colSpan: 2,
      value: formData.password,
      placeholder: "Mật khẩu dài 8-15 ký tự",
      error: errors.password,
    },
    {
      name: "cfPassword",
      label: "Xác nhận mật khẩu *",
      type: "password",
      colSpan: 2,
      value: formData.cfPassword,
      placeholder: "Mật khẩu dài 8-15 ký tự",
      error: errors.cfPassword,
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

    if (!formData.email)
      errors.email = "Vui lòng nhập Email!";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      errors.email = "Email không hợp lệ!";

    if (!formData.username.trim())
      errors.username = "Vui lòng nhập tên đăng nhập!";

    if (!formData.phone.trim())
      errors.phone = "Vui lòng nhập số điện thoại!";
    else if (!/^\d{10}$/.test(formData.phone))
      errors.phone = "Số điện thoại không hợp lệ!";

    if (!formData.password.trim())
      errors.password = "Vui lòng nhập mật khẩu!";
    else if (
      formData.password.length < 8 ||
      formData.password.length > 15
    )
      errors.password = "Mật khẩu dài 8-15 ký tự!";

    if (!formData.cfPassword.trim())
      errors.cfPassword = "Vui lòng xác nhận mật khẩu!";
    else if (formData.password !== formData.cfPassword)
      errors.cfPassword = "Mật khẩu không trùng khớp!";

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

    const { cfPassword, ...res } = formData;
    const submitData = {
      ...res,
      role_id: 1,
      dob: formData.dob === "" ? null : formData.dob,
    };

    try {
      const result = await api.post(
        "/users/register",
        submitData
      );

      alert(result.data.message);
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.message);
      setErrors(error.response?.data?.errors);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div
      className="h-full w-full flex flex-col gap-2
      transition-all duration-300 ease-in-out"
    >
      <h2
        className="text-center text-[40px] 
        uppercase text-[var(--auth-fg)]"
      >
        Đăng ký
      </h2>

      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3
        flex-1 overflow-auto bg-[var(--form-bg)]
        border-1 border-[var(--form-bd)] p-3 rounded-lg
        transition-all duration-300 ease-in-out"
      >
        <div className="grid grid-cols-2 gap-2 w-full">
          <p className="text-center col-span-2 text-[20px]">
            (*): Thông tin bắt buộc
          </p>

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
          Đăng ký
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
          onClick={() => (window.location.href = "/login")}
        >
          Đã có tài khoản? Đăng nhập
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
