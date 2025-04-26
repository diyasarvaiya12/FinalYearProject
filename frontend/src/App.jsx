import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Collection from './pages/collection';
import TryOn from './pages/TryOn';
import About from './pages/about';
import Product from './pages/product';
import Cart from './pages/cart';
import Login from './pages/login';
import PlaceOrders from './pages/placeorders';
import Orders from './pages/orders';
import Contact from './pages/contact';
import Booking from './pages/booking'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Faq from './pages/FAQ';
import BookingSuccess from "./pages/booking-success";
import BookingLimit from "./pages/BookingLimit";  

const App = () => {
  return (
    <AuthProvider>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/tryon" element={<TryOn />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrders />} />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/booking-success" element={<BookingSuccess/>} />
          <Route path="/booking-limit" element={<BookingLimit/>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
