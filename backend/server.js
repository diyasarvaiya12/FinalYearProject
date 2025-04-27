import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import tryOnRoutes from './routes/tryOnRoutes.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import bookingRoute from './routes/bookingRoute.js';
import appointmentRouter from './routes/appointmentRoute.js';

import { oauth2Client } from "./middleware/googleAuth.js";
import { calendar } from "./utils/calendarServices.js";
import Appointment from './models/appointmentModel.js';
import moment from 'moment-timezone';
import appointmentRoutes from './routes/appointmentRoute.js';
import { createCalendarEvent } from './utils/googleCalendar.js';

dotenv.config(); // Load environment variables

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/tryon', tryOnRoutes);  
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/chatbot', chatbotRoutes);
// app.use('/api/bookings', bookingRoute);
app.use('/api/appointments', appointmentRouter);

// Generate OAuth URL for Google authentication
app.get("/auth-url", (req, res) => {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      state: req.query.bookingData,
    });

    res.json({ authUrl });
  } catch (error) {
    console.error("Error generating auth URL:", error);
    res.status(500).json({ error: "Failed to generate authentication URL" });
  }
});

app.get("/oauth2callback", async (req, res) => {
    const { code, state } = req.query;

    if (!code || !state) {
        console.error("Missing code or state parameter");
        return res.redirect(`${process.env.FRONTEND_URL}/booking-error`);
    }

    try {
        // Exchange code for tokens with explicit redirect URI
        const { tokens } = await oauth2Client.getToken({
            code,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI
        });
        
        // Parse booking data
        const bookingData = JSON.parse(decodeURIComponent(state));

        // Set credentials for this request
        oauth2Client.setCredentials(tokens);

        // Create calendar event
        await createCalendarEvent(tokens, bookingData);

        // Update appointment status
        await Appointment.findOneAndUpdate(
            { 
                name: bookingData.name,
                email: bookingData.email,
                date: bookingData.date,
                startTime: bookingData.startTime
            },
            { status: 'Confirmed' }
        );

        res.redirect(`${process.env.FRONTEND_URL}/booking-success`);
    } catch (error) {
        console.error("OAuth/Calendar Error:", error);
        res.redirect(`${process.env.FRONTEND_URL}/booking-error`);
    }
});

// Default Route
app.get('/', (req, res) => {
    res.send("API Working 🚀");
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});