import React from "react";

export default function HeaderBar() {
  const buttonList = [
    {
      title: "Search",
      icon: "bi bi-search",
      click: console.log("Search"),
    },
    {
      title: "Account",
      icon: "bi bi-person-fill",
      click: console.log("Account"),
    },
    {
      title: "Cart",
      icon: "bi bi-basket-fill",
      click: console.log("Cart"),
    },
  ];

  return (
    <div
      className="h-[50px] w-full m-0 p-2 flex flex-row
  bg-[var(--header-bg)] text-[var(--header-fg)]"
    >
      <div
        className="w-full flex items-center justify-start
      text-[30px]"
      >
        <i className="bi bi-cart2 me-2"></i>
        <h1 className="">Deal Go</h1>
      </div>
      <div className="w-full flex justify-end gap-3">
        {buttonList.map((item, index) => (
          <button
            key={index}
            title={item.title}
            className="text-[var(--header-fg)] text-[25px]"
          >
            <i className={`${item.icon}`}></i>
          </button>
        ))}
      </div>
    </div>
  );
}
