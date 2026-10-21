import { useState } from "react";

import lightImg from "../../assets/Slide/light.jpg";
import darkImg from "../../assets/Slide/dark.jpg";

import TourForm from "../Form/SearchForm/TourForm";
import StayForm from "../Form/SearchForm/StayForm";
import AirplaneForm from "../Form/SearchForm/AirplaneForm";
import CarForm from "../Form/SearchForm/CarForm";
import ActivityForm from "../Form/SearchForm/ActivityForm";
import SearchForm from "../Form/SearchForm/AllSearchForm";

export default function SearchBar({
  t,
  darkMode,
  position,
}) {
  const [activeCate, setActiveCate] = useState("all");

  const searchCategories = [
    {
      tab: "all",
      title: t("searchbar.all"),
      icon: "bi bi-map",
      click: () => console.log(""),
    },
    {
      tab: "tour",
      title: t("searchbar.tour"),
      icon: "bi bi-map",
      click: () => console.log(""),
    },
    {
      tab: "stay",
      title: t("searchbar.stay"),
      icon: "bi bi-buildings",
      click: () => console.log(""),
    },
    {
      tab: "airplane",
      title: t("searchbar.airplane"),
      icon: "bi bi-airplane",
      click: () => console.log(""),
    },
    {
      tab: "car",
      title: t("searchbar.car"),
      icon: "bi bi-car-front",
      click: () => console.log(""),
    },
    {
      tab: "activity",
      title: t("searchbar.activity"),
      icon: "bi bi-ticket-perforated",
      click: () => console.log(""),
    },
  ];

  return (
    <div className="h-[500px] w-full relative">
      <div
        className={`h-full ${
          position === "homePage" ? "flex" : "hidden"
        }`}
      >
        <img
          src={darkMode ? darkImg : lightImg}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>

      <div
        className="absolute bottom-[-50px] left-[20px] right-[20px]
        flex justify-center items-center transition-all duration-300 ease-in-out"
      >
        <div
          className={`h-fit w-fit p-4 text-[var(--search-bar-fg)]
        bg-[var(--search-bar-bg)] shadow-[var(--search-bar-shadow)]
        rounded-2xl border-[var(--search-bar-bd)] border-1
        flex flex-col items-center gap-4 overflow-hidden
        ${darkMode && "dark"}
        transition-all duration-300 ease-in-out`}
        >
          {activeCate === "all" && <SearchForm t={t} />}
          {activeCate === "tour" && <TourForm t={t} />}
          {activeCate === "stay" && <StayForm t={t} />}
          {activeCate === "airplane" && (
            <AirplaneForm t={t} />
          )}
          {activeCate === "car" && <CarForm t={t} />}
          {activeCate === "activity" && (
            <ActivityForm t={t} />
          )}

          <div className="w-full flex flex-col items-center gap-2">
            <div className="flex items-center gap-4 w-full text-[var(--slogan)]">
              <hr className="flex-1 " />
              <p className="text-center">
                {t("searchbar.or")}
              </p>
              <hr className="flex-1" />
            </div>

            <div
              className="flex gap-2
            w-fit max-w-full overflow-auto pb-2"
            >
              {searchCategories.map((item, index) => (
                <button
                  className={`text-nowrap px-3 py-1
                rounded-full border-1 
                hover:bg-[var(--cate-btn-hover-bg)] 
                hover:text-[var(--cate-btn-hover-fg)]
                hover:border-[var(--cate-btn-hover-bd)]
                active:bg-[var(--cate-btn-hover-bg)] 
                active:text-[var(--cate-btn-hover-fg)]
                active:border-[var(--cate-btn-hover-bd)]
                ${
                  activeCate === item.tab
                    ? `bg-[var(--cate-btn-active-bg)] 
                  text-[var(--cate-btn-active-fg)]
                  border-[var(--cate-btn-active-bd)]`
                    : `bg-[var(--cate-btn-bg)] text-[var(--cate-btn-fg)]
                border-[var(--cate-btn-bd)]`
                }
                transition-all duration-300 ease-in-out`}
                  key={index}
                  onClick={() => setActiveCate(item.tab)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
