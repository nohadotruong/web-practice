import Footer from "@/components/Admin/Footer";
import Header from "@/components/Admin/Header";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div
      className="min-h-screen w-full
          flex flex-col"
    >
      <Header />

      <main className="flex-1 mt-[80px]">{children}</main>

      <Footer />
    </div>
  );
}
