import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import tryOnRoutes from './routes/tryOnRoutes.js';
import productRouter from './routes/productRoute.js';

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
app.use('/api/tryon', tryOnRoutes);  // Corrected placement of tryOnRoutes

// Default Route
app.get('/', (req, res) => {
    res.send("API Working 🚀");
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
