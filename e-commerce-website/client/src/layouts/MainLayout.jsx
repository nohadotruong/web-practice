import React from "react";
import HeaderBar from "../components/Header/HeaderBar";
import FooterBar from "../components/Footer/FooterBar";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen w-full
    flex flex-col"
    >
      <HeaderBar />
      <div
        className="flex flex-1 
      bg-[var(--body-bg)] text-[var(--body-fg)]"
      >
        Body
      </div>
      <FooterBar />
    </div>
  );
}
