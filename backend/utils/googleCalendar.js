import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export const addEventToGoogleCalendar = async ({ summary, description, startTime, endTime, attendees }) => {
  try {
    const event = {
      summary,
      description,
      start: { 
        dateTime: startTime,
        timeZone: 'Asia/Kolkata'
      },
      end: { 
        dateTime: endTime,
        timeZone: 'Asia/Kolkata'
      },
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 }
        ]
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
    throw error;
  }
};

export { oauth2Client, calendar };
