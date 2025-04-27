import { google } from 'googleapis';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAuthUrl = (bookingData) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ],
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    state: encodeURIComponent(JSON.stringify(bookingData))
  });
};

export const createCalendarEvent = async (tokens, appointmentData) => {
  try {
    oauth2Client.setCredentials(tokens);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const { name, email, date, startTime, endTime, services } = appointmentData;

    const startDateTime = moment.tz(`${date} ${startTime}`, "YYYY-MM-DD hh:mm A", "Asia/Kolkata");
    const endDateTime = moment.tz(`${date} ${endTime}`, "YYYY-MM-DD hh:mm A", "Asia/Kolkata");

    const event = {
      summary: "Nail Appointment at NailStory",
      location: "NailStory Salon",
      description: `Services:\n${services.map(s => `${s.name} - ₹${s.price}`).join('\n')}`,
      start: {
        dateTime: startDateTime.format(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endDateTime.format(),
        timeZone: 'Asia/Kolkata',
      },
      attendees: [{ email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error('Google Calendar Error:', error);
    throw error;
  }
};

export { oauth2Client };
