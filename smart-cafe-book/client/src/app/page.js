"use client";

import Footer from "../components/Customer/Footer";
import Header from "../components/Customer/Header";

export default function HomePage() {
  return (
    <div
      className="min-h-screen w-full
      flex flex-col"
    >
      <Header />

      <main className="flex-1"></main>

      <Footer />
    </div>
  );
}
