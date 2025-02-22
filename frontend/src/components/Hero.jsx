import React from 'react';
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#FDF6E6] p-10 md:p-20">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-[#053342] text-4xl md:text-6xl font-serif leading-snug">
          Give Your Nails <br />
          Sweet Treat
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg">
          We create nails that match your style and boost your confidence. Say
          goodbye to brittle nails and hello to lasting beauty!
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mt-6">
          <button onClick={() => navigate("/Booking")} className="bg-[#053342] text-white px-6 py-2 text-sm md:text-base ">
            Book Appointment
          </button>
          <button onClick={() => navigate("/Collection")} className="border-2 border-[#053342] text-[#053342] px-6 py-2 text-sm md:text-base ">
            View Products
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col items-center gap-4 mt-10 md:mt-0">
        <img
          className="w-3/4 md:w-[85%] rounded-lg"
          src={assets.hero1} 
          alt="Hand Design 1"
        />
      </div>
    </div>
  );
};

export default Hero;
