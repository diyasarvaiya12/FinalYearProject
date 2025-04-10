import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  // Static sample data
  const sampleData = [
    {
      id: 'appt001',
      client: {
        firstName: 'Muskan',
        lastName: 'Rathod',
        phone: '9876543210',
        street: '123 Nail Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipcode: '400001',
      },
      services: [
        { name: 'Gel Polish', duration: '45 mins' },
        { name: 'Nail Art', duration: '30 mins' },
      ],
      date: '2025-04-10',
      slot: '12:00 PM - 01:30 PM',
      amount: 899,
      status: 'Confirmed',
    },
    {
      id: 'appt002',
      client: {
        firstName: 'Aisha',
        lastName: 'Khan',
        phone: '9123456780',
        street: '456 Art Avenue',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        zipcode: '411001',
      },
      services: [
        { name: 'Classic Manicure', duration: '30 mins' },
      ],
      date: '2025-04-12',
      slot: '03:00 PM - 03:30 PM',
      amount: 499,
      status: 'Pending',
    },
  ];

  useEffect(() => {
    setAppointments(sampleData.reverse());
  }, []);

  return (
    <div>
      <h3>Appointment Page</h3>
      <div>
        {appointments.map((appt, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >
            <img className='w-12' src={assets.parcel_icon} alt='Appointment Icon' />
            <div>
              <div>
                {appt.services.map((service, idx) => (
                  <p className='py-0.5' key={idx}>
                    {service.name} ({service.duration})
                    {idx !== appt.services.length - 1 && ','}
                  </p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-medium'>
                {appt.client.firstName + ' ' + appt.client.lastName}
              </p>
              <div>
                <p>{appt.client.street + ','}</p>
                <p>
                  {appt.client.city + ', ' + appt.client.state + ', ' + appt.client.country + ', ' + appt.client.zipcode}
                </p>
              </div>
              <p>{appt.client.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Services: {appt.services.length}</p>
              <p className='mt-3'>Slot: {appt.slot}</p>
              <p>Date: {new Date(appt.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>₹{appt.amount}</p>
            <p className='font-semibold text-green-600'>{appt.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
