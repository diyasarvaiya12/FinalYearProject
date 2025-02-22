import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const {token,setToken, navigate , backendUrl}= useContext(ShopContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!/^\d{10}$/.test(phone)) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }
      const endpoint = currentState === 'Sign Up' ? 'http://localhost:4000/api/user/register' : 'http://localhost:4000/api/user/login';
      const payload = currentState === 'Sign Up' ? { name, phone } : { phone };

      const res = await axios.post(endpoint, payload);
      if (res.data.success) {
        toast.success('OTP sent to your phone!');
        setIsOtpSent(true);
        setToken(res.data.token)
        console.log(token);
        localStorage.setItem('token',res.data.token)
      } else {
        toast.error(res.data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

    const onVerifyOTP = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:4000/api/user/verify-otp', { phone, otp });
        if (res.data.success) {
          toast.success('OTP verified successfully!');
          setName('');
          setPhone('');
          setOtp('');
          setIsOtpSent(false);
        } else {
          toast.error(res.data.message || 'Invalid OTP!');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong!');
      }
    };

  return (
    <form onSubmit={isOtpSent ? onVerifyOTP : onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Login' ? null : (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Phone Number"
        required
      />
      {isOtpSent && (
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
      )}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {isOtpSent ? 'Verify OTP' : currentState === 'Login' ? 'Send OTP' : 'Sign Up'}
      </button>
      <p className="mt-4 text-sm cursor-pointer" onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}>
        {currentState === 'Login' ? 'Create account' : 'Already have an account? Login'}
      </p>
    </form>
  );
};

export default Login;
