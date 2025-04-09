import { google } from "googleapis";
import fs from "fs";
import path from "path";

const credentialsPath = path.resolve('credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8')).web;

const oauth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0]  // This should be http://localhost:4000/oauth2callback
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export { oauth2Client, calendar };
