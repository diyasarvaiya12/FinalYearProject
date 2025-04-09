const express = require('express');
const { addEventToGoogleCalendar } = require('../utils/googleCalendar');
const { sendEmailNotification } = require('../utils/emailNotification');

const router = express.Router();

router.post('/book', async (req, res) => {
  try {
    const { userId, summary, description, start, end } = req.body;

    // ...existing code for booking the appointment...

    // Add event to Google Calendar
    await addEventToGoogleCalendar({ summary, description, start, end });

    // Send email notification
    const emailSubject = 'New Appointment Booked';
    const emailText = `An appointment has been booked.\n\nDetails:\nSummary: ${summary}\nDescription: ${description}\nStart: ${start}\nEnd: ${end}`;
    await sendEmailNotification(process.env.GMAIL_SENDER, emailSubject, emailText);

    res.status(200).send({ message: 'Appointment booked successfully!' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).send({ error: 'Failed to book appointment' });
  }
});

module.exports = router;
