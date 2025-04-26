import Appointment from '../models/appointmentModel.js';
import Worker from '../models/workerModel.js';
import moment from 'moment-timezone';

// Get available time slots
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Get all appointments for the date
    const appointments = await Appointment.find({
      date,
      status: { $in: ['Pending', 'Confirmed'] }
    });

    // Define time slots (30-minute intervals)
    const timeSlots = [];
    const startTime = moment().set({ hour: 10, minute: 0 }); // 10 AM
    const endTime = moment().set({ hour: 19, minute: 0 }); // 7 PM

    while (startTime <= endTime) {
      const timeStr = startTime.format('hh:mm A');
      const bookedCount = appointments.filter(apt => apt.startTime === timeStr).length;

      if (bookedCount < 4) { // Less than 4 bookings for this slot
        timeSlots.push(timeStr);
      }

      startTime.add(30, 'minutes');
    }

    res.json({ 
      success: true, 
      slots: timeSlots 
    });

  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available slots'
    });
  }
};

// Create appointment
export const createAppointment = async (req, res) => {
    try {
        const { name, email, phone, date, startTime, services } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !date || !startTime || !services || !services.length) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate services have duration
        const validServices = services.map(service => ({
            ...service,
            duration: service.duration || 30 // Default 30 minutes if not specified
        }));

        // Calculate total duration and end time
        const totalDuration = validServices.reduce((sum, service) => sum + service.duration, 0);
        const endTime = moment(startTime, 'hh:mm A')
            .add(totalDuration, 'minutes')
            .format('hh:mm A');

        // Check slot availability
        const existingBookings = await Appointment.countDocuments({
            date,
            $or: [
                {
                    startTime: { $lte: startTime },
                    endTime: { $gt: startTime }
                },
                {
                    startTime: { $lt: endTime },
                    endTime: { $gte: endTime }
                }
            ],
            status: { $in: ['Pending', 'Confirmed'] }
        });

        if (existingBookings >= 4) {
            return res.status(400).json({
                success: false,
                message: 'This time slot is no longer available'
            });
        }

        // Create appointment
        const appointment = new Appointment({
            name,
            email,
            phone,
            date,
            startTime,
            endTime,
            services: validServices,
            estimatedPrice: validServices.reduce((sum, service) => sum + service.price, 0)
        });

        await appointment.save();

        res.status(201).json({
            success: true,
            appointment,
            message: 'Appointment booked successfully!'
        });

    } catch (error) {
        console.error('Appointment creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating appointment'
        });
    }
};