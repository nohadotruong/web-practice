import React, { useEffect, useState } from "react";

import "./TabBar.css";

export default function TabBar({
  activeTab,
  setActiveTab,
  userRole,
}) {
  const managerTabs = [
    { key: "tables", label: "Tables" },
    { key: "tickets", label: "Tickets" },
    { key: "invoices", label: "Invoices" },
    { key: "revenue", label: "Revenue" },
    { key: "users", label: "Users" },
  ];

  const staffTabs = [
    { key: "tables", label: "Tables" },
    { key: "tickets", label: "Tickets" },
    { key: "invoices", label: "Invoices" },
    // { key: "checkout", label: "Checkout" },
  ];

  const tabs =
    userRole === "Manager" ? managerTabs : staffTabs;

  return (
    <div className="tab-bar__container m-0">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={activeTab === tab.key ? "active" : ""}
          onClick={() => {
            setActiveTab(tab.key);
            localStorage.setItem("currentTab", tab.key);
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
