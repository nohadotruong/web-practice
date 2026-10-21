import { useEffect, useState } from "react";
import { formatMessage } from "../../../config/errorMessages";

import ConfirmForm from "./ConfirmForm";

export default function ProfileForm({
  initialData,
  t,
  currentLang,
  setLoading,
}) {
  const [isEdit, setEdit] = useState(false);
  const [confirmForm, setConfirmForm] = useState(false);

  const [currentData, setCurrentData] = useState({});
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = confirmForm
      ? "hidden"
      : "";
  }, [confirmForm]);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, password: "" });
      setCurrentData(initialData);
    }
  }, [initialData]);

  const infoItem = [
    {
      label: t("authform.email"),
      type: "email",
      name: "email",
      value: formData.email,
      error: errors.email,
    },
    {
      label: t("authform.username"),
      type: "text",
      name: "username",
      value: formData.username,
      error: errors.username,
    },
    {
      label: t("authform.fullname"),
      type: "text",
      name: "fullname",
      value: formData.fullname,
      error: errors.fullname,
    },
    {
      label: t("authform.phone"),
      type: "tel",
      name: "phone",
      value: formData.phone,
      error: errors.phone,
    },
  ];

  function validate() {
    const errors = {};

    if (!formData.email)
      errors.email = formatMessage(
        currentLang,
        "EMAIL_REQUIRED"
      );
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      errors.email = formatMessage(
        currentLang,
        "INVALID_EMAIL"
      );

    if (!formData.username.trim())
      errors.username = formatMessage(
        currentLang,
        "USERNAME_REQUIRED"
      );

    if (!formData.fullname.trim())
      errors.fullname = formatMessage(
        currentLang,
        "FULLNAME_REQUIRED"
      );

    if (!formData.phone.trim())
      errors.phone = formatMessage(
        currentLang,
        "PHONE_REQUIRED"
      );
    else if (!/^\d{10}$/.test(formData.phone))
      errors.phone = formatMessage(
        currentLang,
        "INVALID_PHONE"
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

  async function handleSubmit() {
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    setLoading(false);
    setConfirmForm(true);
  }

  return (
    <div
      className="py-6 px-3 flex flex-col gap-5         
      transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col gap-3">
        {infoItem.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 px-2"
          >
            <div className="flex items-center">
              <h1 className="text-[var(--side-menu-fg)] text-[18px] font-[500] ms-1">
                {item.label}
              </h1>
            </div>

            <input
              name={item.name}
              type={item.type}
              value={item.value ?? ""}
              onChange={handleChange}
              className="w-full px-2 py-1  rounded-lg
              border-1 border-[var(--profile-form-ip-bd)]
              focus:border-[var(--profile-form-ip-focus-bd)]
              read-only:cursor-pointer
              read-only:border-[var(--profile-form-ip-disable-bd)]
              transition-all duration-300 ease-in-out"
              disabled={!isEdit}
              style={{
                border: item.error
                  ? "2px solid #ff0000"
                  : undefined,
              }}
            />
            {errors[item.name] && (
              <p className="text-red-500 text-sm">
                {item.error}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="px-2 flex flex-col gap-3">
        {isEdit ? (
          <>
            <button
              type="button"
              className="py-2 rounded-lg 
            bg-[var(--save-btn-bg)] text-[var(--save-btn-fg)]
            hover:bg-[var(--save-btn-hover-bg)]
            active:bg-[var(--save-btn-hover-bg)]
            disabled:bg-[var(--save-btn-disable-bg)]
            transition-all duration-300 ease-in-out"
              disabled={
                JSON.stringify(currentData) ===
                  JSON.stringify(formData) ||
                Object.values(formData).some(
                  (val) => val === ""
                )
              }
              onClick={handleSubmit}
            >
              {t("profile.save")}
            </button>

            <button
              type="button"
              className="py-2 rounded-lg 
            bg-[var(--cancel-btn-bg)] text-[var(--cancel-btn-fg)]
            hover:bg-[var(--cancel-btn-hover-bg)]
            active:bg-[var(--cancel-btn-hover-bg)]
            transition-all duration-300 ease-in-out"
              onClick={() => {
                setEdit(false);
                setErrors({});
                setFormData(currentData);
              }}
            >
              {t("profile.cancel")}
            </button>
          </>
        ) : (
          <>
            <button
              className="py-2 rounded-lg 
            bg-[var(--edit-btn-bg)] text-[var(--edit-btn-fg)]
            hover:bg-[var(--edit-btn-hover-bg)]
            active:bg-[var(--edit-btn-hover-bg)]
            transition-all duration-300 ease-in-out"
              onClick={() => setEdit(true)}
            >
              {t("profile.edit")}
            </button>

            <button
              className="py-2 rounded-lg 
            bg-[var(--pw-btn-bg)] text-[var(--pw-btn-fg)]
            hover:bg-[var(--pw-btn-hover-bg)]
            active:bg-[var(--pw-btn-hover-bg)]
            transition-all duration-300 ease-in-out"
            >
              {t("profile.changepassword")}
            </button>

            <button
              className="py-2 rounded-lg 
            bg-[var(--delete-btn-bg)] text-[var(--delete-btn-fg)]
            hover:bg-[var(--delete-btn-hover-bg)]
            active:bg-[var(--delete-btn-hover-bg)]
            transition-all duration-300 ease-in-out"
            >
              {t("profile.deleteaccount")}
            </button>
          </>
        )}
      </div>

      {confirmForm && (
        <ConfirmForm
          confirmForm={confirmForm}
          setConfirmForm={setConfirmForm}
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          currentLang={currentLang}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
