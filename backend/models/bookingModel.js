import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },   // Changed to Date type
    slot: { type: String, required: true },
    services: [{ name: String, duration: Number }],
    totalTime: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
