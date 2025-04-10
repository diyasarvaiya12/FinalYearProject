import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    services: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: String }
    }],
    estimatedPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default Appointment;
