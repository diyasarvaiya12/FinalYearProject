import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { assets } from '../assets/assets';

const Contact = () => {
  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map('leaflet-map', {
      zoomControl: false, // Disable zoom control
      attributionControl: false, // Remove attribution
    }).setView([19.217375, 72.847998], 15); // Coordinates for Patel Nagar, Mumbai

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add marker
    const marker = L.marker([19.217375, 72.847998])
      .addTo(map)
      .bindPopup('Patel Nagar, Kandivali (W), Mumbai-67')
      .openPopup();

    // Redirect to Google Maps on map click
    map.on('click', () => {
      window.open(
        'https://www.google.com/maps/place/Patel+Nagar,+Kandivali+West,+Mumbai,+Maharashtra+400067',
        '_blank'
      );
    });

    // Redirect to Google Maps on marker click
    marker.on('click', () => {
      window.open(
        'https://www.google.com/maps/place/Patel+Nagar,+Kandivali+West,+Mumbai,+Maharashtra+400067',
        '_blank'
      );
    });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-white p-8">
        <h2 className="text-4xl font-serif text-[#053342] mb-8 text-center">~Contact Information~</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-[#FDF6E6] p-6">
            <img src={assets.location} alt="Location" className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#053342]">Location</h3>
            <p className="text-gray-700">Patel Nagar, Kandivali (W), Mumbai-67</p>
          </div>
          <div className="bg-[#FDF6E6] p-6">
            <img src={assets.call} alt="Call" className="w-15 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#053342]">Give Us A Call</h3>
            <p className="text-gray-700">82914 32368</p>
          </div>
          <div className="bg-[#FDF6E6] p-6">
            <img src={assets.message} alt="Message" className="w-16 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#053342]">Send Us A Message</h3>
            <p className="text-gray-700">songarahasti@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Get in Touch Section (Beige Background) */}
      <div className="bg-[#FDF6E6] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-serif text-[#053342] text-gray-800">Get in touch!</h2>
            <p className="text-gray-700 mt-4 mb-8">
              Stay glam, stay in touch! We're just a message away from your dream nails.
            </p>

            {/* Leaflet Map */}
            <div id="leaflet-map" className="w-full h-64 overflow-hidden cursor-pointer"></div>

            <p className="text-gray-700 mt-4">
              Social Media:
              <span className="inline-block ml-4">
                <img src={assets.whatsapp} alt="WhatsApp" className="w-8 h-8 inline-block" />
              </span>
              <span className="inline-block ml-4">
                <img src={assets.instagram} alt="Instagram" className="w-8 h-8 inline-block" />
              </span>
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8">
            <form>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mb-4 px-4 py-2 border"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full mb-4 px-4 py-2 border"
              />
              <input
                type="text"
                placeholder="Your Subject"
                className="w-full mb-4 px-4 py-2 border"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full mb-4 px-4 py-2 border"
              ></textarea>
              <button
                type="submit"
                className="bg-[#053342] text-white px-6 py-2 w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
