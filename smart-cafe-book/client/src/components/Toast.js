"use client";

import { X } from "lucide-react";

export default function Toast({ status, toast, setToast }) {
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0
      ${toast != "" ? "max-w-full" : "max-w-0"} bg-glass
      flex justify-center items-center overflow-hidden
      transition-all duration-300 ease-in-out`}
    >
      <div
        className={`px-5 py-2 rounded-lg
        flex items-center justify-center gap-3
        bg-[var(--white-color)] border-b-10 
        ${
          status === 1
            ? "border-green-400"
            : "border-red-500"
        }`}
      >
        <p className="text-[20px]">{toast}</p>
        <button onClick={() => setToast("")}>
          <X />
        </button>
      </div>
    </div>
  );
}
