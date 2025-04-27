import { useState, useEffect } from "react";
import axios from "axios";
import assets from "../assets/assets";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:4000";

const Booking = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const services = [
    {
      name: "Manicure",
      description:
        "Enjoy classic care that keeps your hands soft, nourished, and beautiful.",
      price: 300,
    },
    {
      name: "Advance Manicure",
      description:
        "Indulge in a luxury nail treatment for healthy, elegant nails.",
      price: 450,
    },
    {
      name: "Acrylic Extension",
      description: "Get strong, stylish nails that make a lasting impression.",
      price: 800,
    },
    {
      name: "Manicure & Pedicure",
      description: "Full hand and foot care.",
      price: 1000,
    },
    {
      name: "Pedicure",
      description:
        "Experience complete hand and foot care for total refreshment.",
      price: 350,
    },
    {
      name: "Advance Pedicure",
      description: "Treat yourself to premium foot care for soft, smooth skin.",
      price: 500,
    },
    {
      name: "Gel Extension",
      description: "Achieve glossy, long-lasting nails with a flawless finish.",
      price: 800,
    },
    {
      name: "Gel Polish",
      description:
        "Enjoy vibrant, long-lasting shine for stunning nails every day.",
      price: 300,
    },
  ];

  const handleDateChange = (event) => {
    const date = event.target.value;

    // Ensure date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setErrorMessage("Please select a future date");
      return;
    }

    setSelectedDate(date);
    setSelectedTime("");
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate) return;

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${backendUrl}/api/appointments/available-slots/${selectedDate}`
        );
        if (response.data.success) {
          setAvailableSlots(response.data.slots);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        toast.error("Failed to fetch available time slots");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

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
  const totalEstimatedPrice = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );

  // Handle Appointment Booking
  const handleBookAppointment = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !selectedDate || !selectedTime || selectedServices.length === 0) {
        toast.error('Please fill all required fields');
        return;
    }

    try {
        setIsLoading(true);
        const response = await axios.post(`${backendUrl}/api/appointments/create`, {
            name,
            email,
            phone,
            date: selectedDate,
            startTime: selectedTime,
            services: selectedServices
        });

        if (response.data.success && response.data.authUrl) {
            // Redirect to Google OAuth
            window.location.href = response.data.authUrl;
        }
    } catch (error) {
        console.error('Booking error:', error);
        toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-white py-10 px-8">
      {/* Header */}
      <h2 className="text-center text-[#053342] text-3xl font-serif mb-4">
        ~Service Menu~
      </h2>
      <h1 className="text-center text-4xl font-serif text-[#053342] mb-12">
        Give Your Nails A Sweet Treat
      </h1>

      {/* Services Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#053342]">
                {service.name}
              </h3>
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
          <h2 className="text-[#053342] text-4xl font-serif mb-5">
            Get Our Service
          </h2>
          <p className="text-gray-600 mb-8">
            Experience premium nail care with services designed to bring out
            your best look. Let our experts create flawless, fabulous nails just
            for you.
          </p>
          <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>

          <div className="space-y-3">
            <div className="flex items-center">
              <p className="text-[#053342] text-lg font-medium">
                Monday - Friday
              </p>
              <div className="flex-1 border-b border-[#053342] mx-4"></div>
              <span className="text-[#053342] text-lg font-medium">
                10:00AM - 7:00PM
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-[#053342] text-lg font-medium">Saturday</p>
              <div className="flex-1 border-b border-[#053342] mx-4"></div>
              <span className="text-[#053342] text-lg font-medium">
                10:00AM - 7:00PM
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-[#053342] text-lg font-medium">Sunday</p>
              <div className="flex-1 border-b border-[#053342] mx-4"></div>
              <span className="text-[#053342] text-lg font-medium">
                01:00AM - 9:00PM
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Form */}
        <div className="p-8 bg-white shadow-md">
          <form className="space-y-4">
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errorMessage}
              </div>
            )}

            <input
              value={name}
              onInput={(event) => {
                setName(event.target.value);
              }}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
            />
            <input
              value={email}
              onInput={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
            />
            <input
              value={phone}
              onInput={(event) => {
                setPhone(event.target.value);
              }}
              type="text"
              placeholder="Your Phone"
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
            />

            {/* Select Services Button */}
            <button
              type="button"
              className="w-full bg-gray-100 text-gray-700 py-3 focus:outline-none"
              onClick={toggleServiceSelection}
            >
              {selectedServices.length > 0
                ? selectedServices.map((s) => s.name).join(", ")
                : "Select Services"}
            </button>

            {/* Services List */}
            {showOptions && (
              <div className="border border-gray-300 rounded-md p-4 bg-white shadow-md">
                {services.map((service, index) => (
                  <label
                    key={index}
                    className="flex justify-between items-center py-2 cursor-pointer"
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedServices.some(
                          (s) => s.name === service.name
                        )}
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

            {/* Estimated Price */}
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

            {/* Date & Time */}
            <input
              value={selectedDate}
              onChange={handleDateChange}
              type="date"
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
            />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 focus:outline-none"
              disabled={!selectedDate || isLoading}
            >
              <option value="">Select Time</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {/* Book Appointment Button */}
            <button
              type="button"
              onClick={handleBookAppointment}
              disabled={isLoading}
              className="w-full bg-[#053342] text-white py-3 hover:bg-[#8a5d3a] transition focus:outline-none disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : "Book Appointment"}
            </button>

            <p className="text-sm text-gray-500 text-center">
              You will be redirected to Google to authenticate and add this
              appointment to your calendar
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;