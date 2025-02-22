import {React, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const LandingAbout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-8 py-16 bg-white">
    
        <div className="md:w-1/2 flex justify-center md:justify-start">
               <img
                 src={assets.landingabout}
                 alt="Customer Review"
                 className="w-[600px] h-[650px]"
               />
        </div>
            
      <div className="md:w-1/2 mt-8 md:mt-0 md:ml-16 text-center md:text-left">
        <h3 className="text-lg  text-[#053342] mb-2 font-medium underline decoration-[#B0754B]">About Us</h3>
        <h2 className='text-5xl font-serif text-[#053342] '>We have the Nails Knowledge</h2><br></br>
        <p className="text-gray-600 mb-6">
          We’ve mastered the art of perfect nails. From essential care to
          stunning designs, we combine skill, precision, and creativity to
          deliver results you’ll love. Let us transform your nails and elevate
          your style—because you deserve the best.
        </p>
        <button
      onClick={() => {
        navigate("/about");
        window.scrollTo(0, 0); 
      }}
      className="bg-[#053342] text-white px-6 py-2 shadow-lg hover:bg-[#042a37] transition-all duration-300"
    >
      About Us
    </button>
      </div>
    </div>
  );
};

export default LandingAbout;
