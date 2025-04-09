import { google } from "googleapis";
import dotenv from 'dotenv';
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:4000/oauth2callback"  // Update to match your backend URL
);
const calendar = google.calendar({ version: "v3", auth: oauth2Client });
const createCalendarEvent = async (appointmentData, tokens) => {
  const event = {
    summary: `Nail Appointment for ${appointmentData.name}`,
    description: `Services: ${appointmentData.services.map(s => s.name).join(', ')}`,
    start: appointmentData.dateTime,
    end: appointmentData.endTime,
    timeZone: 'Asia/Kolkata',
  };
};
export { oauth2Client, calendar, createCalendarEvent };