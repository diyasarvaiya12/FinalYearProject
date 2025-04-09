import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Load credentials.json dynamically
const credentialsPath = path.resolve('backend', "../credentials.json");
const tokenPath = path.resolve("backend/token.json");

if (!fs.existsSync(credentialsPath)) {
    throw new Error("Credentials file not found. Make sure 'credentials.json' is in the backend folder.");
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
const { client_id, client_secret, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Load stored tokens if available
if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
    oAuth2Client.setCredentials(token);
} else {
    console.log("No stored token found. Run authentication to generate tokens.");
}

// Function to get Google Auth URL
export const getGoogleAuthURL = () => {
    return oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar"],
        prompt: "consent",
    });
};

// Function to exchange Auth Code for Access Token
export const getAccessToken = async (code) => {
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        fs.writeFileSync(tokenPath, JSON.stringify(tokens));
        console.log("Token stored successfully.");
        oAuth2Client.setCredentials(tokens);
    } catch (error) {
        console.error("Error retrieving access token", error);
    }
};

// Export OAuth client for reuse
export { oAuth2Client };
