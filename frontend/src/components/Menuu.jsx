import React from "react";
import { assets } from "../assets/assets";

const Menuu = () => {
  const services = [
    {
      name: "Dry Manicure",
      price: "₹130",
      description: "A quick, no-water manicure for perfectly polished nails.",
    },
    {
      name: "Dry Pedicure",
      price: "₹150",
      description: "A waterless pedicure for smooth and healthy feet.",
    },
    {
      name: "Acrylic Extensions",
      price: "₹1000",
      description: "Add durable length with acrylic extensions.",
    },
    {
      name: "Gel Extensions",
      price: "₹1000",
      description: "Add length and style with flawless gel extensions.",
    },
    {
      name: "Advance Manicure",
      price: "₹350",
      description: "Achieve perfection with an Advance manicure.",
    },
    {
      name: "Gel Polish",
      price: "₹300",
      description: "Enjoy long-lasting shine and vibrant color with gel polish.",
    },
  ];

  return (
    <div className="bg-[#FDF6E6] p-8 rounded-lg flex flex-col lg:flex-row items-start gap-8">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <h3 className="text-lg font-serif text-[#053342] underline decoration-[#B0754B]">
          Treatments & Prices
        </h3>
        <h1 className="text-6xl font-serif text-[#053342] mb-8">
          It’s Time to Get Trimmed.
        </h1>
        {services.map((service, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center">
              <span className="text-lg font-medium text-[#053342]">
                {service.name}
              </span>
              <div className="flex-1 border-b-2 border-[#B0754B] mx-4"></div>
              <span className="text-lg font-medium text-[#053342]">
                {service.price}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 flex items-center justify-center">
        <img
          src={assets.menu} 
          alt="Manicure service"
          className=" w-3/4 object-cover max-w-md"
        />
      </div>
    </div>
  );
};

export default Menuu;
