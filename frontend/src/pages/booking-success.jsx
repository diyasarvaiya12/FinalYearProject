import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets.js";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);

  // Auto redirect after 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h2 className="mt-6 text-3xl font-serif text-[#053342]">
          Appointment Confirmed!
        </h2>

        <div className="mt-2 text-gray-600">
          <p className="mb-2">
            Your nail appointment has been successfully added to your Google
            Calendar!
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="bg-[#fef6ec] p-6 rounded-lg shadow-sm mt-6 border border-[#B0754B]/20">
          <div className="flex justify-center mb-4">
            <img src={assets.logo} alt="NailStory Logo" className="h-12" />
          </div>

          <p className="text-[#053342] font-medium">
            We look forward to seeing you soon!
          </p>

          <div className="mt-4 bg-white p-4 rounded">
            <p className="text-sm text-gray-500">
              Don&apos;t forget to arrive 5 minutes before your scheduled
              appointment. Remember to bring any reference photos you&apos;d
              like to show our nail artists.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#053342] text-white py-3 hover:bg-[#8a5d3a] transition focus:outline-none"
          >
            Return to Home ({countdown})
          </button>

          <button
            onClick={() => navigate("/collection")}
            className="w-full bg-white text-[#053342] border border-[#053342] py-3 hover:bg-gray-50 transition focus:outline-none"
          >
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
