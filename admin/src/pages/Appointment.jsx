import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Appointment = ({ token }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, [token]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/api/appointments/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setAppointments(response.data.appointments);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(
                `${backendUrl}/api/appointments/status/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                fetchAppointments();
                toast.success('Status updated successfully');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    };

    const filteredAppointments = appointments
        .filter(appt => {
            if (filter === 'all') return true;
            return appt.status === filter;
        })
        .filter(appt => {
            if (!dateFilter) return true;
            return appt.date === dateFilter;
        })
        .filter(appt => {
            if (!searchQuery) return true;
            return (
                appt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                appt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                appt.phone?.includes(searchQuery)
            );
        });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#053342] border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">Appointments</h3>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#053342]"
                    />
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#053342]"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#053342]"
                    >
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {filteredAppointments.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No appointments found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredAppointments.map((appt) => (
                        <div
                            key={appt._id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6">
                                <div className="flex items-center justify-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                        appt.status === 'Confirmed' ? 'bg-green-100' :
                                        appt.status === 'Pending' ? 'bg-yellow-100' :
                                        appt.status === 'Completed' ? 'bg-blue-100' :
                                        'bg-red-100'
                                    }`}>
                                        <img className="w-6" src={assets.parcel_icon} alt="" />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">{appt.name}</h4>
                                    <p className="text-gray-600 text-sm">{appt.email}</p>
                                    <p className="text-gray-600 text-sm">{appt.phone}</p>
                                    <div className="mt-3 space-y-1">
                                        {appt.services?.map((service, idx) => (
                                            <p key={idx} className="text-sm text-gray-600">
                                                • {service.name} ({service.duration}min) - ₹{service.price}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-sm">
                                    <p className="text-gray-600">Date: {new Date(appt.date).toLocaleDateString('en-IN')}</p>
                                    <p className="text-gray-600">Time: {appt.startTime} - {appt.endTime}</p>
                                    <p className="font-medium text-gray-900 mt-2">
                                        Total Services: {appt.services?.length || 0}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-medium text-gray-900">
                                        ₹{appt.estimatedPrice}
                                    </p>
                                </div>

                                <div className="flex items-center justify-end">
                                    <select
                                        value={appt.status}
                                        onChange={(e) => updateStatus(appt._id, e.target.value)}
                                        className={`px-4 py-2 rounded-md border transition-colors ${
                                            appt.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                                            appt.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                            appt.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-red-50 text-red-700 border-red-200'
                                        }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                {[
                    { status: 'Pending', color: 'yellow' },
                    { status: 'Confirmed', color: 'green' },
                    { status: 'Completed', color: 'blue' },
                    { status: 'Cancelled', color: 'red' }
                ].map(({ status, color }) => (
                    <div
                        key={status}
                        className={`bg-${color}-50 p-4 rounded-lg border border-${color}-200`}
                    >
                        <h5 className={`text-${color}-700 font-medium`}>{status}</h5>
                        <p className="text-2xl font-semibold mt-2">
                            {appointments.filter(a => a.status === status).length}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

Appointment.propTypes = {
    token: PropTypes.string.isRequired
};

export default Appointment;
