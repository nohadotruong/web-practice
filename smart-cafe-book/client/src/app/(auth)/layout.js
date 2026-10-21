"use client";

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="w-full h-screen">
        <img
          src="/auth_bg.jpg"
          className="h-full w-full object-cover blur-xs"
          alt=""
        />
      </div>

      <div
        className="h-full w-full 
        absolute top-0 bottom-0 left-0 right-0
        flex flex-col md:flex-row items-center 
        justify-between md:justify-end"
      >
        <div
          className="w-fit h-fit min-h-[20%] p-5 m-auto gap-3
          flex items-center justify-center cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-[90px] sm:h-[120px] lg:h-[250px] w-fit
            transition-all duration-300 ease-in-out"
          />

          <div
            className="flex flex-col items-center
            text-[var(--light-brown-color)]"
          >
            <h1
              className="text-[40px] md:text-[50px] lg:text-[70px] font-ravi
            transition-all duration-300 ease-in-out"
            >
              CofBook
            </h1>

            <p
              className="text-[18px] md:text-[25px] lg:text-[35px] font-[900] text-nowrap
            transition-all duration-300 ease-in-out"
            >
              Tiệm Cà phê Sách
            </p>
          </div>
        </div>

        <div
          className="h-fit md:h-full max-h-[80%] 
          md:max-h-screen px-5 py-2 w-full md:w-[50%] lg:w-[40%]
          bg-[var(--auth-bg)] rounded-t-3xl 
          md:rounded-t-none md:rounded-l-3xl
          transition-all duration-300 ease-in-out"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
