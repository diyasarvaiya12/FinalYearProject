import React, { useState } from "react";
import assets from "../assets/assets";

const Booking = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const services = [
    { name: "Manicure",           description: "Classic care for your hands.", price: 100 },
    { name: "Advance Manicure", description: "Luxury nail treatment.", price: 100 },
    { name: "Acrylic Extension", description: "Strong, stylish nails.", price: 1000 },
    { name: "Manicure & Pedicure", description: "Full hand and foot care.", price: 100 },
    { name: "Pedicure", description: "Relax and refresh your feet.", price: 100 },
    { name: "Advance Pedicure", description: "Premium foot care.", price: 100 },
    { name: "Gel Extension", description: "Glossy, lasting nails.", price: 1000 },
    { name: "Gel Polish", description: "Vibrant, long-lasting shine.", price: 300 },
  ];

  // Toggle Service Selection
  const toggleServiceSelection = () => {
    setShowOptions(!showOptions);
  };

  // Handle Checkbox Selection
  const handleServiceChange = (service) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.some((s) => s.name === service.name)) {
        return prevSelected.filter((s) => s.name !== service.name);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  // Calculate Estimated Price
  const totalEstimatedPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="min-h-screen bg-white py-10 px-8">
      {/* Header */}
      <h2 className="text-center text-[#053342] text-3xl font-serif mb-4">~Service Menu~</h2>
      <h1 className="text-center text-4xl font-serif text-[#053342] mb-12">
        Give Your Nails A Sweet Treat
      </h1>

      {/* Services Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#053342]">{service.name}</h3>
              <div className="flex-1 mx-4 border-b-[2px] border-[#B0754B]"></div>
              <p className="text-xl text-[#053342]">₹{service.price}</p>
            </div>
            <p className="text-gray-500 text-sm mt-1">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Booking Section */}
      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 bg-[#fef6ec] rounded-lg shadow-lg">
        {/* Left Side - Info */}
        <div className="p-10">
        <p className="text-[#053342] font-medium mb-2 border-b-2 border-[#B0754B] inline-block pb-1">
          Make Appointment
        </p>

          <h2 className="text-[#053342] text-4xl font-serif mb-5">Get Our Service</h2>
          <p className="text-gray-600 mb-8">
            Experience premium nail care with services designed to bring out your best look.
            Let our experts create flawless, fabulous nails just for you.
          </p>
          <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>

          <div className="space-y-3">
            <div className="flex items-center">
              <p className="text-[#053342] text-lg font-medium">Monday - Friday</p>
              <div className="flex-1 border-b border-[#053342] mx-4"></div>
              <span className="text-[#053342] text-lg font-medium">10:00AM - 7:00PM</span>
            </div>
            <div className="flex items-center">
              <p className="text-[#053342] text-lg font-medium">Saturday</p>
              <div className="flex-1 border-b border-[#053342] mx-4"></div>
              <span className="text-[#053342] text-lg font-medium">10:00AM - 7:00PM</span>
            </div>
            <div className="flex items-center">
              <p className="text-[#053342] text-lg font-medium">Sunday</p>
              <div className="flex-1 border-b border-[#053342] mx-4"></div>
              <span className="text-[#053342] text-lg font-medium">01:00AM - 9:00PM</span>
            </div>
          </div>
        </div>


        {/* Right Side - Booking Form */}
        <div className="p-8 bg-white  shadow-md">
          <form className="space-y-4">
            <input type="text"    placeholder="Your Name"   className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none" />
            <input type="email"   placeholder="Your Email"  className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none" />

            {/* Select Services Button */}
            <button 
              type="button" 
              className="w-full bg-gray-100 text-gray-700 py-3 focus:outline-none"
              onClick={toggleServiceSelection}
            >
              {selectedServices.length > 0 ? selectedServices.map((s) => s.name).join(", ") : "Select Services"}
            </button>

            {/* Services List (Only Show When Button Clicked) */}
            {showOptions && (
              <div className="border border-gray-300 rounded-md p-4 bg-white shadow-md">
                {services.map((service, index) => (
                  <label key={index} className="flex justify-between items-center py-2 cursor-pointer">
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedServices.some((s) => s.name === service.name)}
                        onChange={() => handleServiceChange(service)}
                        className="mr-2"
                      />
                      {service.name}
                    </div>
                    <span className="text-gray-500">₹{service.price}</span>
                  </label>
                ))}
              </div>
            )}

            {/* estimated Price wala code */}
            <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={totalEstimatedPrice > 0 ? `₹${totalEstimatedPrice}` : ""}
              placeholder="Estimated Price"
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
              readOnly
            />
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <img src={assets.info_icon} alt="info" className="w-5 h-5" />
                <p className="text-red-500">This is an estimated price. Final cost may vary as per personalisation.</p>
            </div>
            </div>

           {/* date time wala code */}
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none" />
              <select className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none">
                <option>Select Time</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>1:00 PM</option>
                <option>2:00 PM</option>
                <option>3:00 PM</option>
                <option>4:00 PM</option>
                <option>5:00 PM</option>
                <option>6:00 PM</option>
              </select>
            </div>

            <textarea placeholder="Your Message"  className="w-full px-4 py-3 border border-gray-300 text-gray-700 h-20 focus:outline-none"></textarea>

            <button type="submit" className="w-full bg-[#053342] text-white py-3 hover:bg-[#8a5d3a] transition focus:outline-none">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
