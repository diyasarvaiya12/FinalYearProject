const express = require("express");
const router = express.Router();
//const { createCalendarEvent } = require("../calendarService");
const { createCalendarEvent } = require("../utils/calendarServices");

// Appointment Booking Route
router.post("/book-appointment", async (req, res) => {
  try {
    const { name, email, services, date, time, message, tokens } = req.body;

    // Log tokens for debugging 
    console.log("🔑 Received Tokens:", tokens);

    if (!tokens || !tokens.access_token) {
      return res.status(400).json({ message: "Invalid or missing tokens" });
    }
    
    // Convert 12-hour format to 24-hour format
    const [hourMin, period] = time.split(" ");
    const [hours, minutes] = hourMin.split(":");
    let hour = parseInt(hours);
    
    // Convert to 24-hour format
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    // Format time properly
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}`;
    
    // Create proper ISO datetime with timezone handling
    const dateTime = new Date(`${date}T${formattedTime}:00+05:30`);
    const endTime = new Date(dateTime.getTime() + 60 * 60 * 1000);

    // Create event object with explicit timezone
    const appointmentData = { 
      name, 
      email, 
      services,
      dateTime: {
        dateTime: dateTime.toISOString(),
        timeZone: 'Asia/Kolkata'
      },
      endTime: {
        dateTime: endTime.toISOString(),
        timeZone: 'Asia/Kolkata'
      },
      message 
    };

    // Call Google Calendar Function with user's tokens
    const event = await createCalendarEvent(appointmentData, tokens);

    res.status(200).json({ message: "Appointment booked successfully!", event });
  } catch (error) {
    console.error("❌ Error booking appointment:", error.message);
    res.status(500).json({ message: "Failed to book appointment", error });
  }
});

module.exports = router;
