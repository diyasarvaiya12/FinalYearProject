import React, { useState } from "react";
import assets from "../assets/assets";
import axios from "axios";

const Booking = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(""); // NEW SLOT STATE

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    slot: ''
  });

  const [bookingStatus, setBookingStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const services = [
    { name: "Manicure",           description: "Classic care for your hands.", price: 300, duration: 30 },
    { name: "Advance Manicure",   description: "Luxury nail treatment.",       price: 450, duration: 45 },
    { name: "Acrylic Extension",  description: "Strong, stylish nails.",       price: 800, duration: 80 },
    { name: "Manicure & Pedicure",description: "Full hand and foot care.",     price: 600, duration: 60 },
    { name: "Pedicure",           description: "Relax and refresh your feet.", price: 350, duration: 30 },
    { name: "Advance Pedicure",   description: "Premium foot care.",           price: 500, duration: 45 },
    { name: "Gel Extension",      description: "Glossy, lasting nails.",       price: 800, duration: 80 },
    { name: "Gel Polish",         description: "Vibrant, long-lasting shine.", price: 300, duration: 45 },
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.date || !selectedSlot || selectedServices.length === 0) {
      alert("Please fill in all required fields and select at least one service");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Date validation
    const selectedDate = new Date(formData.date);
    const today = new Date();
    if (selectedDate < today) {
      alert("Please select a future date");
      return;
    }

    setBookingStatus({ loading: true, error: null, success: false });
  
    const bookingData = {
      name: formData.name,
      email: formData.email,
      services: selectedServices.map(service => ({
        name: service.name,
        price: service.price,
        duration: service.duration
      })),
      totalPrice: totalEstimatedPrice,
      date: formData.date,
      timeSlot: selectedSlot,
      status: 'pending'
    };

    console.log('Sending booking data:', bookingData);
  
    try {
      const response = await axios.post("http://localhost:4000/api/bookings/book", bookingData);
  
      if (response.status === 201) {
        setBookingStatus({
          loading: false,
          error: null,
          success: true
        });
        alert("Booking successful! We'll send you a confirmation email shortly.");
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          date: '',
          slot: ''
        });
        setSelectedServices([]);
        setSelectedSlot('');
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      let errorMessage = "Failed to book appointment. Please try again.";
      
      if (error.response?.status === 400) {
        // Show the specific error message from the server
        errorMessage = error.response.data.message || "Invalid booking data. Please check your input.";
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Unable to connect to the server. Please make sure the server is running and try again.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setBookingStatus({
        loading: false,
        error: errorMessage,
        success: false
      });
      alert(errorMessage);
    }
  };
  
  // Calculate Estimated Price
  const totalEstimatedPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="min-h-screen bg-white py-10 px-8">
      <h2 className="text-center text-[#053342] text-3xl font-serif mb-4">~Service Menu~</h2>
      <h1 className="text-center text-4xl font-serif text-[#053342] mb-12">
        Give Your Nails A Sweet Treat
      </h1>

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

      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 bg-[#fef6ec] rounded-lg shadow-lg">
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

        <div className="p-8 bg-white shadow-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name" 
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none" 
              required
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email" 
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none" 
              required
            />

            <button
              type="button"
              className="w-full bg-gray-100 text-gray-700 py-3 focus:outline-none"
              onClick={toggleServiceSelection}
            >
              {selectedServices.length > 0 ? selectedServices.map((s) => s.name).join(", ") : "Select Services"}
            </button>

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

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
                required
              />
              
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
                required
              >
                <option value="">Select Slot</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
              </select>
            </div>

            <button 
              type="submit" 
              className={`w-full py-3 transition focus:outline-none ${
                bookingStatus.loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#053342] hover:bg-[#8a5d3a] text-white'
              }`}
              disabled={bookingStatus.loading}
            >
              {bookingStatus.loading ? 'Booking...' : 'Book Appointment'}
            </button>

            {bookingStatus.error && (
              <p className="text-red-500 text-sm mt-2">{bookingStatus.error}</p>
            )}
            {bookingStatus.success && (
              <p className="text-green-500 text-sm mt-2">Booking successful!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
