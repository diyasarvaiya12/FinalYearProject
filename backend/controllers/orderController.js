import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'
import { sendOrderConfirmationEmail } from "../utils/email_service.js";

// global variables
const currency = 'inr'
const deliveryCharge = 10

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID || "rzp_test_XCs0E3IXY05Ek0",
    key_secret : process.env.RAZORPAY_KEY_SECRET || "bWksCJEyqYy0UIZzXFqNtLDB",
})

const generateOrderId = async () => {
    let uniqueOrderId;
    let isUnique = false;

    while (!isUnique) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
        uniqueOrderId = `ord${randomNumber}`;
        
        // Check if this orderId already exists
        const existingOrder = await orderModel.findOne({ orderId: uniqueOrderId });
        if (!existingOrder) {
            isUnique = true;
        }
    }

    return uniqueOrderId;
};

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderId = await generateOrderId(); // Custom order ID

        const orderData = {
            orderId,
            userId,
            items,
            address,
            amount: amount / 100,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await sendOrderConfirmationEmail(orderData.address.email, orderData.address, orderData.items, orderData.amount, orderData.orderId);

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed", orderId });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderId = await generateOrderId(); // Generate unique order ID

        const orderData = {
            orderId, // Add the generated orderId
            userId,
            items,
            address,
            amount:amount/100,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await sendOrderConfirmationEmail(orderData.address.email, orderData.address, orderData.items, orderData.amount);

        const options = {
            amount: amount,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        };

        // Use Promise instead of callback
        const order = await razorpayInstance.orders.create(options);
        res.json({ 
            success: true, 
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req,res) => {
    try {
        
        const { userId, razorpay_order_id  } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true, message: "Payment Successful" })
        } else {
             res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay ,placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus}