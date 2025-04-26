// controllers/appointmentController.js
import Appointment from '../models/appointmentModel.js';

export const checkSlotAvailability = async (req, res) => {
  const { date, time } = req.body;

  try {
    const existingCount = await Appointment.countDocuments({ date, time });

    if (existingCount >= 4) {
      return res.json({ slotFull: true });
    } else {
      return res.json({ slotFull: false });
    }
  } catch (err) {
    console.error("Error checking slot:", err);
    return res.status(500).json({ error: "Error checking availability" });
  }
};
export default checkSlotAvailability;
