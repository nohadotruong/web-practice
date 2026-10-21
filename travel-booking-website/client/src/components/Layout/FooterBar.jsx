import React from "react";

export default function FooterBar({ darkMode }) {
  return (
    <div
      className={`h-[40px]
      border-[var(--border)]
      bg-[var(--footer-bg)] text-[var(--footer-fg)]
      transition-all duration-300 ease-in-out
      ${darkMode && "dark"}`}
    ></div>
  );
}
