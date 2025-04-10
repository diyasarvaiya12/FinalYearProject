import express from 'express';
import Appointment from '../models/appointmentModel.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Get all appointments (admin only)
router.get('/all', async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .sort({ createdAt: -1 });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update appointment status
router.put('/status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ success: true, appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;