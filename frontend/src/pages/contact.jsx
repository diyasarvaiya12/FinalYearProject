import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { assets } from '../assets/assets';
import emailjs from 'emailjs-com';

const Contact = () => {
  useEffect(() => {
    const map = L.map('leaflet-map', {
      zoomControl: false,
      attributionControl: false,
    }).setView([19.217375, 72.847998], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const marker = L.marker([19.217375, 72.847998])
      .addTo(map)
      .bindPopup('Patel Nagar, Kandivali (W), Mumbai-67')
      .openPopup();

    map.on('click', () => {
      window.open(
        'https://www.google.com/maps/place/Patel+Nagar,+Kandivali+West,+Mumbai,+Maharashtra+400067',
        '_blank'
      );
    });

    marker.on('click', () => {
      window.open(
        'https://www.google.com/maps/place/Patel+Nagar,+Kandivali+West,+Mumbai,+Maharashtra+400067',
        '_blank'
      );
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_cp42q49', // Replace with your Service ID
      'template_evmsdtr', // Replace with your Template ID
      e.target,
      'TLJwtklx_u64hrDpa' // Replace with your Public Key
    ).then((result) => {
      alert('Message sent successfully!');
      console.log(result.text);
    }).catch((error) => {
      alert('Failed to send message. Please try again.');
      console.error(error.text);
    });

    e.target.reset(); // Clear form after submission
  };

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

          <a 
            href="https://wa.me/918104586086?text=Hi%20there!%20I'm%20interested%20in%20your%20nail%20art%20services.%20Can%20you%20provide%20more%20details?" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className="bg-[#FDF6E6] p-6 cursor-pointer">
              <img src={assets.whatsapp} alt="chat with us" className="w-15 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#053342]">chat with us</h3>
              <p className="text-gray-700">+91 8433646811</p>
            </div>
          </a>

          <div className="bg-[#FDF6E6] p-6">
            <img src={assets.message} alt="Message" className="w-16 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#053342]">Send Us A Message</h3>
            <p className="text-gray-700">thenailsstory1@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="bg-[#FDF6E6] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-4xl font-serif text-[#053342] text-gray-800">Get in touch!</h2>
            <p className="text-gray-700 mt-4 mb-8">
              Stay glam, stay in touch! We're just a message away from your dream nails.
            </p>

            <div id="leaflet-map" className="w-full h-64 overflow-hidden cursor-pointer"></div>

            <p className="text-gray-700 mt-4">
              Social Media:
              <span className="inline-block ml-4">
                <a 
                  href="https://wa.me/918104586086?text=Hi%20there!%20I'm%20interested%20in%20your%20nail%20art%20services.%20Can%20you%20provide%20more%20details?" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src={assets.whatsapp} alt="WhatsApp" className="w-8 h-8 inline-block" />
                </a>
              </span>
              <span className="inline-block ml-4">
                <a 
                  href="https://www.instagram.com/the_nail_story____/"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src={assets.instagram} alt="Instagram" className="w-8 h-8 inline-block" />
                </a>
              </span>
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8">
            <form onSubmit={sendEmail}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full mb-4 px-4 py-2 border"
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className="w-full mb-4 px-4 py-2 border"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Your Subject"
                className="w-full mb-4 px-4 py-2 border"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="w-full mb-4 px-4 py-2 border"
                required
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
