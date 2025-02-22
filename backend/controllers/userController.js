import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import {createVerification , createVerificationCheck } from "../utils/otp_service.js"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || diyahastikeval)
}

const Verifyopt = async (req, res) => {
    try {
        const { phone, otp } = req.body;  

        // Verify OTP using Twilio
        const ver = await createVerificationCheck(otp);
        if (ver !== "approved") {
            return res.json({ success: false, message: "OTP verification failed" });
        }

        // Find user in DB
        let user = await userModel.findOne({ phone });

        // If user doesn't exist, create one
        if (!user) {
            return res.json({ success: false, message: "User not found. Please register first." });
        }

        // Generate Token
        const token = createToken(user._id);

        return res.json({ success: true, message: "OTP verified successfully", token });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error during OTP verification" });
    }
};

  

const loginUser =  async (req, res) => {
    try {
        const { phone } = req.body;

        if (!/^\d{10}$/.test(phone)) {
            return res.json({ success: false, message: 'Invalid phone number format' });
        }

        const user = await userModel.findOne({ phone });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Send OTP for verification
        await createVerification(phone);

        res.json({ success: true, message: 'OTP sent successfully, please verify' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


const registerUser = async (req, res) => {
    try {
        const { name, phone } = req.body;

        if (!/^\d{10}$/.test(phone)) {
            return res.json({ success: false, message: 'Invalid phone number format' });
        }

        const exists = await userModel.findOne({ phone });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Create new user
        const newUser = new userModel({ name, phone });
        const user = await newUser.save();

        // Send OTP
        await createVerification(phone);

        res.json({ success: true, message: "OTP sent successfully, please verify" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === "diya@gmail.com" && password === "pass123") {
            const token = jwt.sign({ email }, "diyahastikeval", { expiresIn: "1h" });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { loginUser, registerUser, adminLogin , Verifyopt }