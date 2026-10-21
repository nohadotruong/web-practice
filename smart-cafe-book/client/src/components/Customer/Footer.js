"use client";

import {
  Facebook,
  icons,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import React from "react";

export default function Footer() {
  const contactMenus = [
    {
      title: "Facebook: CofBook",
      icon: <Facebook size={25} />,
      click: () =>
        window.open(
          "https://www.facebook.com/cofbook/",
          "_blank"
        ),
    },
    {
      title: "Instagram: CofBook",
      icon: <Instagram size={25} />,
      click: () =>
        window.open(
          "https://www.instagram.com/cofbook/",
          "_blank"
        ),
    },
    {
      title: "Zalo: CofBook",
      icon: <MessageCircle size={25} />,
      click: () =>
        (window.location.href = "zalo://oaid/0123456789"),
    },
    {
      title: "Youtube: CofBook",
      icon: <Youtube size={25} />,
      click: () =>
        window.open("https://example.com", "_blank"),
    },
    {
      title: "cofbook@gmail.com",
      icon: <Mail size={25} />,
      click: () =>
        window.open(
          "https://mail.google.com/mail/?view=cm&fs=1&to=cofbook@gmail.com&su=Liên%20hệ%20với%20CofBook",
          "_blank"
        ),
    },
    {
      title: "(+84) 123 456 789",
      icon: <Phone size={25} />,
      click: () =>
        (window.location.href = "tel:+84123456789"),
    },
  ];
  return (
    <div
      className="py-5 px-2 sm:px-4 md:px-6 xl:px-[5%]
      flex flex-col sm:flex-row gap-4
      items-center sm:items-end 
      sm:justify-center h-fit w-full
      bg-[var(--footer-bg)] text-[var(--footer-fg)]
      transition-all duration-300 ease-in-out"
    >
      <div
        className="flex flex-col w-full h-full
        sm:justify-between items-end sm:items-start gap-3"
      >
        <div
          className="flex items-center justify-center 
          sm:justify-start w-full md:w-fit gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-[90px] md:h-[70px] w-fit"
          />

          <div
            className="flex flex-col md:flex-row md:gap-2
            items-center sm:items-center md:items-center
            text-[var(--light-brown-color)]"
          >
            <h1 className="text-[35px] md:text-[50px] font-ravi">
              CofBook
            </h1>

            <p className="text-[15px] md:text-[20px] text-nowrap">
              Tiệm Cà phê Sách
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-3
          gap-1 w-full h-fit ms-auto sm:mx-auto"
        >
          {contactMenus.map(({ title, icon, click }) => (
            <button
              key={title}
              title={title}
              className="p-1 px-2 rounded-lg cursor-pointer
              bg-[var(--footer-btn-bg)] 
              hover:bg-[var(--footer-btn-hover-bg)]
              active:text-[var(--footer-btn-active-fg)]
              active:bg-[var(--footer-btn-active-bg)]
              text-[var(--footer-btn-fg)] text-nowrap 
              flex gap-2 items-center
              justify-center sm:justify-start
              transition-all duration-300 ease-in-out"
              onClick={click}
            >
              <p>{icon}</p>
              <p className="hidden sm:flex truncate">
                {title}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div
        className="w-full sm:w-[500px] lg:w-[700px] h-full
        flex flex-col gap-3
        transition-all duration-300 ease-in-out"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1684.5190268381007!2d105.85009935259008!3d20.980154727252874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac40ddf0a473%3A0x4af8e7964e986acf!2zMjQwIFAuIFTDom4gTWFpLCBUw6JuIE1haSwgSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1759747357309!5m2!1svi!2s"
          allowFullScreen={""}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
