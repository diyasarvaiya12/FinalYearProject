import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  // Function to navigate and smoothly scroll up
  const handleNavigate = (path) => {
    if (location.pathname === path) {
      // If already on the same page, smoothly scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Logo & Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Experience beauty and care like never before with our expertly crafted services. At The Nails Story, we’re dedicated to delivering quality, creativity, and personalized attention to every detail. Let us redefine elegance for you, make every moment unforgettable, and celebrate your unique style.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <button onClick={() => handleNavigate("/")} className="hover:text-[#B0754B] transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("/booking")} className="hover:text-[#B0754B] transition-colors">
                Booking
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("/collection")} className="hover:text-[#B0754B] transition-colors">
                Products
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("/about")} className="hover:text-[#B0754B] transition-colors">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("/contact")} className="hover:text-[#B0754B] transition-colors">
                Contact
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("/faq")} className="hover:text-[#B0754B] transition-colors">
                FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="tel:+911234567890" className="hover:text-[#B0754B] transition-colors">
                +91 8433646811
              </a>
            </li>
            <li>
              <a href="mailto:contact@TheNailsStory.com" className="hover:text-[#B0754B] transition-colors">
                contact@TheNailsStory.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @TheNailsStory.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
