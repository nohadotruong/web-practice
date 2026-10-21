"use client";

export default function Loading() {
  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0 z-9999
        bg-glass flex flex-col justify-center items-center gap-3`}
    >
      <div
        className="w-20 h-20 
          border-4 border-[var(--loading)] 
          border-t-transparent border-b-transparent
          rounded-full animate-spin"
      ></div>

      <p className="text-[25px] text-[var(--loading)]">
        Đang tải...
      </p>
    </div>
  );
}
