import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const LandingServices = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left Section: Title */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h3 className="text-lg text-[#053342] mb-2 font-medium underline decoration-[#B0754B]">
            Our Services
          </h3>
          <h3 className="text-3xl md:text-4xl font-serif text-[#053342] ">
            Make Gorgeous Nails A Part of Your Life.
          </h3>
        </div>

        {/* Right Section: Paragraph and Button */}
        <div className="md:w-1/2">
          <p className="text-gray-600 mb-6">
            Pamper your hands and feet with our top-notch services designed to make
            you look and feel your best. From flawless finishes to ultimate
            relaxation—your nails deserve the finest care.
          </p>
          <button onClick={() => navigate("/Booking")} className="bg-[#053342] text-white px-6 py-2">
            Book now
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {/* Service 1 */}
        <div className="text-center p-6 transform hover:translate-y-[-10px] transition-transform duration-500 ease-in-out">
          <img
            src={assets.serviceslanding1}
            alt="Manicure"
            className="w-full h-50 object-cover mb-4"
          />
          <h3 className="text-lg font-bold text-[#053342] mb-2">Manicure</h3>
          <p className="text-gray-600 mb-4">
            Manicures give you clean, polished nails with expert care.
          </p>
          <button onClick={() => navigate("/Booking")} className="text-[#053342] font-medium hover:underline">
            Book Now →
          </button>
        </div>

        {/* Service 2 */}
        <div className="text-center p-6 transform hover:translate-y-[-10px] transition-transform duration-500 ease-in-out">
          <img
            src={assets.serviceslanding2}
            alt="Gel Extensions"
            className="w-full h-50 object-cover mb-4"
          />
          <h3 className="text-lg font-bold text-[#053342] mb-2">Gel Extensions</h3>
          <p className="text-gray-600 mb-4">
            Add length and style with flawless gel extensions.
          </p>
          <button onClick={() => navigate("/Booking")} className="text-[#053342] font-medium hover:underline">
            Book Now →
          </button>
        </div>

        <div className="text-center p-6 transform hover:translate-y-[-10px] transition-transform duration-500 ease-in-out">
          <img
            src={assets.serviceslanding3}
            alt="Pedicure"
            className="w-full h-50 object-cover mb-4"
          />
          <h3 className="text-lg font-bold text-[#053342] mb-2">Pedicure</h3>
          <p className="text-gray-600 mb-4">
            Relax your feet with soft, polished, and beautiful toes.
          </p>
          <button onClick={() => navigate("/Booking")} className="text-[#053342] font-medium hover:underline">
            Book Now →
          </button>
        </div>

        <div className="text-center p-6 transform hover:translate-y-[-10px] transition-transform duration-500 ease-in-out">
          <img
            src={assets.serviceslanding4}
            alt="acrylicextension"
            className="w-full h-50 object-cover mb-4"
          />
          <h3 className="text-lg font-bold text-[#053342] mb-2">Acrylic Extensions</h3>
          <p className="text-gray-600 mb-4">
              Add durable length with acrylic extensions.
          </p>
          <button onClick={() => navigate("/Booking")} className="text-[#053342] font-medium hover:underline">
            Book Now →
          </button>
        </div>
        <div className="text-center p-6 transform hover:translate-y-[-10px] transition-transform duration-500 ease-in-out">
          <img
            src={assets.serviceslanding5}
            alt="advmanicure"
            className="w-full h-50 object-cover mb-4"
          />
          <h3 className="text-lg font-bold text-[#053342] mb-2">Advance Manicure</h3>
          <p className="text-gray-600 mb-4">
              Achieve perfection with an Advance manicure.
          </p>
          <button onClick={() => navigate("/Booking")} className="text-[#053342] font-medium hover:underline">
            Book Now →
          </button>
        </div>
        <div className="text-center p-6 transform hover:translate-y-[-10px] transition-transform duration-500 ease-in-out">
          <img
            src={assets.serviceslanding6}
            alt="gelpolish"
            className="w-full h-50 object-cover mb-4"
          />
          <h3 className="text-lg font-bold text-[#053342] mb-2">Gel Polish</h3>
          <p className="text-gray-600 mb-4">
            Enjoy long-lasting shine and vibrant color with gel polish.
          </p>
          <button onClick={() => navigate("/Booking")} className="text-[#053342] font-medium hover:underline">
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingServices;
