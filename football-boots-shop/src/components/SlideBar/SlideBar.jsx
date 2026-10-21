import React, { useEffect, useState } from "react";

import "./SlideBar.css";

import Image1 from "../../assets/SlideBarImage/NikeMadEnergy.png";
import Image2 from "../../assets/SlideBarImage/AdidasRadiantBlaze.png";
import Image3 from "../../assets/SlideBarImage/PumaForever.png";

export default function SlideBar() {
  const images = [
    { src: Image1, caption: "Nike Mad Energy Pack" },
    {
      src: Image2,
      caption: "Adidas Radiant Blaze Pack",
    },
    { src: Image3, caption: "Puma Forever Pack" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div className="slide-bar-container">
      <div className="slideshow">
        <img
          src={images[index].src}
          alt={images[index].caption}
          className="slide-image"
        />
        <div className="caption">
          {images[index].caption} <br />
          <button>View</button>
        </div>

        <div className="controls">
          <button onClick={prevSlide}>❮</button>
          <button onClick={nextSlide}>❯</button>
        </div>
      </div>
    </div>
  );
}
