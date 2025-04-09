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

import { oauth2Client } from "./middleware/googleAuth.js";
import { calendar } from "./utils/calendarServices.js";
import Appointment from './models/appointmentModel.js';

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
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/tryon', tryOnRoutes);  
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/chatbot', chatbotRoutes);
// app.use('/api/bookings', bookingRoute);


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

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Parse booking data from state parameter
    const bookingData = JSON.parse(decodeURIComponent(state));
    const { name, email, services, date, time } = bookingData;

    // Format services for event description
    const servicesText = services
      .map((s) => `${s.name} - ₹${s.price}`)
      .join("\n");
    const totalPrice = services.reduce((sum, s) => sum + s.price, 0);

    // Check existing bookings for this timeslot
    const existingBookings = await Appointment.countDocuments({
      date: date,
      time: time,
    });

    if (existingBookings >= 4) {
      return res.redirect(`http://localhost:5173/booking-limit`);
    }

    // Create appointment in MongoDB
    const appointment = new Appointment({
      name,
      email,
      date,
      time,
      services,
      estimatedPrice: totalPrice,
    });

    await appointment.save();

    const [year, month, day] = date.split("-");
    const [hourMin, ampm] = time.split(" ");
    const [hour, minute] = hourMin.split(":");

    // Convert 12-hour to 24-hour format
    let eventHour = parseInt(hour);
    if (ampm === "PM" && eventHour < 12) eventHour += 12;
    if (ampm === "AM" && eventHour === 12) eventHour = 0;

    const startDateTime = new Date(
      year,
      month - 1,
      day,
      eventHour,
      parseInt(minute)
    );
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);

    // Create calendar event
    const event = {
      summary: "Nail Appointment at NailStory",
      location: "NailStory Salon",
      description: `Services:\n${servicesText}\n\nTotal: ₹${totalPrice}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees: [{ email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    };

    const createdEvent = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      resource: event,
    });

    // Redirect to frontend with success status
    res.redirect(`http://localhost:5173/booking-success`);
  } catch (error) {
    console.error("Error creating appointment:", error);
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
