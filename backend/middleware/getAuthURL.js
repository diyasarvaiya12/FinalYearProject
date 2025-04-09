import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Load credentials.json dynamically
const credentialsPath = path.resolve('backend', "../credentials.json");


if (!fs.existsSync(credentialsPath)) {
    throw new Error("Credentials file not found. Make sure 'credentials.json' is in the backend folder.");
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));

const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

export const getGoogleAuthURL = () => {
    return oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar"],
        prompt: "consent",
    });
};


