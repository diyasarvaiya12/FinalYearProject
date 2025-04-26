import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    services: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: Number, required: true } // Duration in minutes
    }],
    estimatedPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

const Appointment = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default Appointment;
