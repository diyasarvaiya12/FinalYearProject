import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;