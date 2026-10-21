import React, { useState } from "react";

export default function ActivityForm({ t }) {
  const [formData, setFormData] = useState({
    location: "",
    date: "",
  });

  const searchInput = [
    {
      label: t("searchbar.activitylocation"),
      type: "text",
      name: "location",
      value: formData.location,
    },
    {
      label: t("searchbar.date"),
      type: "date",
      name: "date",
      value: formData.date,
    },
  ];

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="w-full">
      <form
        action=""
        className="w-full flex flex-col gap-3"
      >
        <p
          className="text-center text-[var(--slogan)]
          text-[25px] sm:text-[30px] font-[500]"
        >
          {t("searchbar.activityslogan")}
        </p>

        <div className="flex flex-col justify-center sm:flex-row sm:items-end gap-2 w-full">
          {searchInput.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col w-full`}
            >
              <label
                htmlFor=""
                className="font-[500] px-1 w-full text-nowrap"
              >
                {item.label}
              </label>

              <div className="w-full relative">
                <input
                  type={item.type}
                  className={`bg-[var(--form-ip-bg)] 
                  border-[var(--form-ip-bd)] border-1 rounded-lg 
                  focus:bg-[var(--form-ip-focus-bg)]
                  focus:border-[var(--form-ip-focus-bd)]
                  p-2 w-full ${
                    item.type === "text" && "pe-[50px]"
                  }`}
                  name={item.name}
                  value={item.value}
                  onChange={handleChange}
                  placeholder={
                    item.type === "text"
                      ? t("searchbar.activityplaceholder")
                      : ""
                  }
                />
                {item.value !== "" &&
                  item.type === "text" && (
                    <div
                      className="absolute right-[7px] top-0 bottom-0
                      flex justify-center items-center gap-1"
                    >
                      <button
                        tabIndex={1000}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            [item.name]: "",
                          });
                        }}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}

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
              disabled:shadow-none w-full sm:w-fit text-nowrap
              px-3 py-2 rounded-xl cursor-pointer
              transition-all duration-300 ease-in-out`}
            disabled={Object.values(formData).every(
              (val) => val === ""
            )}
          >
            {t("searchbar.search")}
          </button>
        </div>
      </form>
    </div>
  );
}
