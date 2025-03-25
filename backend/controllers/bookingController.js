import Booking from '../models/bookingModel.js';

const availableSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"
];

const checkAvailability = async (date, requiredSlots) => {
    const bookings = await Booking.find({ date });
    const bookedSlots = bookings.map((b) => b.slot);

    const freeSlots = availableSlots.filter(slot => !bookedSlots.includes(slot));

    for (let i = 0; i < freeSlots.length; i++) {
        const possibleSlots = [];
        let totalDuration = 0;

        for (let j = i; j < freeSlots.length && totalDuration < requiredSlots * 30; j++) {
            possibleSlots.push(freeSlots[j]);
            totalDuration += 30;

            if (totalDuration >= requiredSlots * 30) {
                return possibleSlots[0];
            }
        }
    }

    return null;
};

export const bookAppointment = async (req, res) => {
    const { name, email, date, selectedSlot, services, totalTime } = req.body;

    try {
        const availableSlot = await checkAvailability(date, totalTime / 30);

        if (!availableSlot) {
            return res.status(400).json({
                message: "Slot unavailable. Try another time.",
                suggestedSlot: await checkAvailability(date, 1) // Suggest the next available slot
            });
        }

        const newBooking = new Booking({
            name,
            email,
            date,
            slot: selectedSlot,
            services,
            totalTime
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful!", booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};