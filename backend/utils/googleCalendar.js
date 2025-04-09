const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function addEventToGoogleCalendar(eventDetails) {
  try {
    const event = {
      summary: eventDetails.summary,
      description: eventDetails.description,
      start: { dateTime: eventDetails.start, timeZone: 'UTC' },
      end: { dateTime: eventDetails.end, timeZone: 'UTC' },
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
}

module.exports = { addEventToGoogleCalendar };
