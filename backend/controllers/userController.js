import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import {createVerification, createVerificationCheck} from "../utils/otp_service.js"

// Add cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const loginUser = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ success: false, message: 'Invalid phone number format' });
        }

        const user = await userModel.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }

        // Send OTP for verification
        await createVerification(phone);

        res.status(200).json({ success: true, message: 'OTP sent successfully, please verify' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const Verifyopt = async (req, res) => {
    try {
        const { phone, otp } = req.body;  

        const ver = await createVerificationCheck(otp);
        if (ver !== "approved") {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        const user = await userModel.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const token = createToken(user._id);

        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, phone } = req.body;

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ success: false, message: 'Invalid phone number format' });
        }

        const exists = await userModel.findOne({ phone });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        const newUser = new userModel({ name, phone });
        const user = await newUser.save();

        // Send OTP
        await createVerification(phone);

        res.status(201).json({ success: true, message: "OTP sent successfully, please verify" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add logout functionality
const logoutUser = async (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
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

export { loginUser, registerUser, adminLogin, Verifyopt, logoutUser }