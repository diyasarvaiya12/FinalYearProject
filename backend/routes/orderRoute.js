import express from 'express';
import {placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import orderModel from '../models/orderModel.js'; // Import order model

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);

// Verify Payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

// Order Details for Chatbot
orderRouter.get('/order-details/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderModel.findOne({ orderId });

        if (!order) {
            return res.json({ success: false, message: "❌ Sorry, no order found with that ID." });
        }

        res.json({
            success: true,
            orderDetails: {
                orderId: order.orderId,
                status: order.status,
                items: order.items,
                address: order.address,
                amount: order.amount,
                paymentMethod: order.paymentMethod,
                paymentStatus: order.payment ? "✅ Paid" : "❌ Not Paid",
                date: new Date(order.date).toLocaleString()
            }
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred while fetching order details." });
    }
});

export default orderRouter;