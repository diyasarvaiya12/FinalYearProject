import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Testimonial = () => {
  const testimonials = [
    {
      text: "These nail extensions are a game changer! They look stunning and make my hands feel so elegant. I was worried they'd feel heavy or unnatural, but they're super light and comfortable to wear all day. The durability is top-notch—I've done all kinds of chores, and they still look perfect. The variety of designs and shapes made it easy to find a style that matched my personality.",
      name: "Hasti Songara",
    },
    {
      text: "I absolutely love my new nails! They are so beautifully done and the quality is incredible. The process was smooth and relaxing. I can't wait to come back for my next set!. We were pleased with our visit and will definitely plan to return. I highly recommend this place!.  The price was great, quality was also great. Thankyou sooo much for these pretty nails. really I loved it.",
      name: "Priya Sharma",
    },
    {
      text: "Best nail art service ever! The designs are so intricate, and the attention to detail is amazing. My nails look like a work of art!.  I'm so happy with how they turned out!. Love my experience at this place.'m always so happy with my gel manicure! got a little heart design this time, so cute :). very relaxing and pleasant experience every time I come. will definitely be returning for years to come!!!",
      name: "Meera Patel",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 500); // Match animation duration
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="flex flex-col items-center p-8">
      {/* Heading Section */}
      <div className="text-center mb-8 w-full">
        <h2 className="text-5xl font-serif text-[#053342] ">
          What Our Customers Say
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Read genuine reviews and heartfelt experiences shared by our valued customers who trust and love our services.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start w-full">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <img
            src={assets.testimonal}
            alt="Customer Review"
            className="w-96 h-auto"
          />
        </div>

        {/* Reviews Section */}
        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start mt-6 md:mt-0 md:ml-8">
          {/* Review Content */}
          <div
            className={`p-4 w-full max-w-[450px] text-center md:text-left transform transition-transform duration-500 ease-in-out ${
              isAnimating ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            <p className="text-gray-800 text-lg leading-relaxed">
              {testimonials[currentIndex].text}
            </p>
            <div className="mt-4 flex items-center justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#FDF6E6] flex items-center justify-center font-bold text-lg">
                {testimonials[currentIndex].name[0]}
              </div>
              <span className="ml-4 text-gray-700 font-semibold">
                {testimonials[currentIndex].name}
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center md:justify-start mt-8 space-x-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsAnimating(false);
                  }, 500); // Match animation duration
                }}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-[#053342]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
