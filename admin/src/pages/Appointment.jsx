import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/appointments/all');
            if (response.data.success) {
                setAppointments(response.data.appointments);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/appointments/status/${id}`, {
                status: newStatus
            });
            if (response.data.success) {
                fetchAppointments();
                toast.success('Status updated successfully');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-6">Appointments</h3>
            <div>
                {appointments.map((appt) => (
                    <div key={appt._id} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
                        <img className="w-12" src={assets.parcel_icon} alt="Appointment Icon" />
                        <div>
                            {/* Services */}
                            <div>
                                {appt.services.map((service, idx) => (
                                    <p key={idx} className="py-0.5">
                                        {service.name} (₹{service.price})
                                    </p>
                                ))}
                            </div>
                            {/* Client Details */}
                            <p className="mt-3 mb-2 font-medium">{appt.name}</p>
                            <p>{appt.email}</p>
                        </div>
                        <div>
                            <p>Services: {appt.services.length}</p>
                            <p className="mt-3">Slot: {appt.time}</p>
                            <p>Date: {new Date(appt.date).toLocaleDateString()}</p>
                        </div>
                        <p>₹{appt.estimatedPrice}</p>
                        <div>
                            <select
                                value={appt.status}
                                onChange={(e) => updateStatus(appt._id, e.target.value)}
                                className={`p-1 rounded ${
                                    appt.status === 'Confirmed' ? 'bg-green-100' :
                                    appt.status === 'Pending' ? 'bg-yellow-100' :
                                    appt.status === 'Completed' ? 'bg-blue-100' :
                                    'bg-red-100'
                                }`}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointment;
