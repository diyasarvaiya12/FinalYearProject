import { google } from "googleapis";
import readline from "readline";

const CLIENT_ID = "837516629565-ujcvv6culua0hng11glqvlqjv07fb2hb.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:5173/oauth2callback"; // Update to match credentials.json
 

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];


export function getAccessToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this URL:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      console.log("Your Refresh Token:", token.refresh_token);
    });
  });
}

