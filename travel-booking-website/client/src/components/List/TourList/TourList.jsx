import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../../utils/axiosClient";

export default function TourList({ position, darkMode }) {
  const [tourList, setTourList] = useState([]);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const cardClass = "";

  useEffect(() => {
    if (position === "homePage") {
      fetchNewTours();
    }
  }, [position]);

  async function fetchNewTours() {
    try {
      const result = await axiosClient.get(
        "/tours/newtour"
      );

      setTourList(result.data.tourList);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div
      className={`${
        darkMode && "dark"
      } w-full overflow-auto`}
    >
      <div className="w-fit pb-2">
        {tourList.length > 0 ? (
          <div className="flex items-center gap-3">
            {tourList.map((item, index) => (
              <div
                key={index}
                className="w-[300px] h-[260px] p-2 cursor-pointer
                border-1 border-[var(--body-item-bd)] rounded-xl
                flex flex-col justify-center gap-2
                bg-[var(--body-item-bg)] text-[var(--body-item-fg)]
                hover:bg-[var(--body-item-hover-bg)]
                hover:text-[var(--body-item-hover-fg)]
                hover:border-[var(--body-item-hover-bd)]
                active:bg-[var(--body-item-hover-bg)]
                active:text-[var(--body-item-hover-fg)]
                active:border-[var(--body-item-hover-bd)]
                transition-all duration-300 ease-in-out"
              >
                <img
                  src={item.thumbnail}
                  className="w-full h-[180px] rounded-lg object-cover"
                  alt=""
                />
                <div className="px-1">
                  <p className="p-0 m-0 text-[20px]">
                    {lang === "vi"
                      ? item.name.vi
                      : item.name.en}
                  </p>
                  <p className="p-0 m-0">
                    {item.price.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </div>
            ))}

            <div
              className="w-[300px] h-[260px] p-2 cursor-pointer
                border-1 border-[var(--body-item-bd)] rounded-xl
                flex flex-col items-center justify-center gap-2
                bg-[var(--body-item-bg)] text-[var(--body-item-fg)]
                hover:bg-[var(--body-item-hover-bg)]
                hover:text-[var(--body-item-hover-fg)]
                hover:border-[var(--body-item-hover-bd)]
                active:bg-[var(--body-item-hover-bg)]
                active:text-[var(--body-item-hover-fg)]
                active:border-[var(--body-item-hover-bd)]
                transition-all duration-300 ease-in-out"
            >
              <i className="bi bi-three-dots text-[100px]"></i>
              <p className="p-0 m-0 text-[30px]">
                More tours
              </p>
            </div>
          </div>
        ) : (
          <div>{t("commons.loading")}</div>
        )}
      </div>
    </div>
  );
}
