import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "diyahastikeval");  // 🔒 Uses environment variable

        console.log("Decoded Token:", decoded);

        if (decoded.email !== "diya@gmail.com") {
            return res.status(403).json({ success: false, message: "Forbidden. Invalid Admin Credentials." });
        }

        next(); // ✅ Token is valid, proceed
    } catch (error) {
        console.error("JWT Verification Error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
        }

        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default adminAuth;
