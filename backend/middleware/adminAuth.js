import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
        }

        const decoded = jwt.verify(token, "diyahastikeval"); 
        console.log("Decoded Token:", decoded);


        if (decoded.email !== "diya@gmail.com") {
            return res.status(403).json({ success: false, message: "Forbidden. Invalid Admin Credentials." });
        }

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default adminAuth;
