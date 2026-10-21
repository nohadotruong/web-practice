import React from "react";

import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../context/DarkModeContext";

import SearchBar from "../../components/Layout/SearchBar";

import TourList from "../../components/List/TourList/TourList";
import StayList from "../../components/List/StayList/StayList";
import AirplaneList from "../../components/List/AirplaneList/AirplaneList";
import CarList from "../../components/List/CarList/CarList";
import ActivityList from "../../components/List/ActivityList/ActivityList";
import LocationList from "../../components/List/LocationList/LocationList";

export default function Home() {
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  const items = [
    {
      title: "New Tours",
      component: (
        <TourList
          position={"homePage"}
          darkMode={darkMode}
        />
      ),
    },
    {
      title: "Top Destinations",
      component: <LocationList position={"homePage"} />,
    },
    {
      title: "Top Accommodation",
      component: <StayList position={"homePage"} />,
    },
    {
      title: "Popular Routes",
      component: <AirplaneList position={"homePage"} />,
    },
    {
      title: "Popular Car Types",
      component: <CarList position={"homePage"} />,
    },
    {
      title: "Popular Activities",
      component: <ActivityList position={"homePage"} />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-fit mb-[50px]">
        <SearchBar
          t={t}
          darkMode={darkMode}
          position={"homePage"}
        />
      </div>

      <div className="my-[50px] px-[20px] w-full lg:w-[80%] flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center">
              <h1
                className="text-[var(--body-fg)] 
                text-[23px] font-[500] px-2"
              >
                {item.title}
              </h1>
              <hr
                className="text-[var(--body-fg)] border-1 rounded-e-full 
                flex-1 mt-[13px]"
              />
            </div>
            <div>{item.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
