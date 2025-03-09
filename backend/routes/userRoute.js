import express from 'express';
import { loginUser, registerUser, adminLogin, Verifyopt } from '../controllers/userController.js';

const userRouter = express.Router();

// Define routes with proper paths
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/verify', Verifyopt);

export default userRouter;
