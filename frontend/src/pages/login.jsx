import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

// Define backend URL with fallback
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: ''
  });
  const [showOTP, setShowOTP] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!showOTP) {
        // First step: Send phone number
        const endpoint = isLogin ? '/api/user/login' : '/api/user/register';
        const data = isLogin ? { phone: formData.phone } : { name: formData.name, phone: formData.phone };
        
        console.log('Making request to:', `${BACKEND_URL}${endpoint}`); // Debug log
        
        const response = await axios.post(`${BACKEND_URL}${endpoint}`, data);
        
        if (response.data.success) {
          setShowOTP(true);
          toast.success('OTP sent successfully');
        }
      } else {
        // Second step: Verify OTP
        try {
          console.log('Verifying OTP:', {
            phone: formData.phone,
            otp: formData.otp
          });

          const response = await axios.post(`${BACKEND_URL}/api/user/verify`, {
            phone: formData.phone,
            otp: formData.otp
          });

          console.log('Verification response:', response.data); // Debug log

          if (response.data.success) {
            // Use the login function from AuthContext
            login(response.data.user, response.data.token);
            toast.success('Login successful');
            navigate('/');
          } else {
            toast.error(response.data.message || 'Verification failed');
          }
        } catch (verifyError) {
          console.error('Verification error:', verifyError);
          toast.error(verifyError.response?.data?.message || 'OTP verification failed');
        }
      }
    } catch (error) {
      console.error('Error details:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      otp: ''
    });
    setShowOTP(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-serif text-center text-[#053342] mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {showOTP && (
            <div>
              <label className="block text-gray-700 mb-2">OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#053342] text-white py-2 rounded hover:bg-[#042a37]"
          >
            {showOTP ? 'Verify OTP' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              resetForm();
            }}
            className="text-[#B0754B] hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
