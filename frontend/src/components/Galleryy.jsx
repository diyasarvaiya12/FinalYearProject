import React, { useRef } from "react";
import { assets } from "../assets/assets";

const Gallery = () => {
  const images = [
    assets.nails1,
    assets.nails7,
    assets.nails11,
    assets.nails4,
    assets.nails5,
    assets.nails6,
    assets.nails2,
    assets.nails8,
    assets.nails9,
    assets.nails10,
    assets.nails3,
    assets.nails12,
    assets.nails13,
    assets.nails14,
  ];

  const galleryRef = useRef(null);

  const scrollLeft = () => {
    const container = galleryRef.current;
    if (container.scrollLeft === 0) {
      container.scrollTo({
        left: container.scrollWidth,
        behavior: "instant",
      });
    }
    container.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = galleryRef.current;
    if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
      container.scrollTo({
        left: 0,
        behavior: "instant",
      });
    }
    container.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-[#FDF6E6] p-4 rounded-lg">
      {/* Gallery Container */}
      <div
        ref={galleryRef}
        className="flex overflow-x-scroll scroll-smooth gap-4 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery Image ${index + 1}`}
            className="w-64 h-64 object-cover shadow-md"
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#053342] text-white p-2 rounded-full shadow-lg"
      >
        &#8592; {/* Left Arrow */}
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#053342] text-white p-2 rounded-full shadow-lg"
      >
        &#8594; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default Gallery;
