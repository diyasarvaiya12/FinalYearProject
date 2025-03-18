import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// import Stripe from 'stripe'
import razorpay from 'razorpay'
import { sendOrderConfirmationEmail } from "../utils/email_service.js";

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

        await sendOrderConfirmationEmail(orderData.address.email, orderData.address, orderData.items, orderData.amount);

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed", orderId });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    // try {
        
    //     const { userId, items, amount, address} = req.body
    //     const { origin } = req.headers;

    //     const orderData = {
    //         userId,
    //         items,
    //         address,
    //         amount,
    //         paymentMethod:"Stripe",
    //         payment:false,
    //         date: Date.now()
    //     }

    //     const newOrder = new orderModel(orderData)
    //     await newOrder.save()

    //     const line_items = items.map((item) => ({
    //         price_data: {
    //             currency:currency,
    //             product_data: {
    //                 name:item.name
    //             },
    //             unit_amount: item.price * 100
    //         },
    //         quantity: item.quantity
    //     }))

    //     line_items.push({
    //         price_data: {
    //             currency:currency,
    //             product_data: {
    //                 name:'Delivery Charges'
    //             },
    //             unit_amount: deliveryCharge * 100
    //         },
    //         quantity: 1
    //     })

    //     const session = await stripe.checkout.sessions.create({
    //         success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    //         cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
    //         line_items,
    //         mode: 'payment',
    //     })

    //     res.json({success:true,session_url:session.url});

    // } catch (error) {
    //     console.log(error)
    //     res.json({success:false,message:error.message})
    // }
}

// Verify Stripe 
const verifyStripe = async (req,res) => {

    // const { orderId, success, userId } = req.body

    // try {
    //     if (success === "true") {
    //         await orderModel.findByIdAndUpdate(orderId, {payment:true});
    //         await userModel.findByIdAndUpdate(userId, {cartData: {}})
    //         res.json({success: true});
    //     } else {
    //         await orderModel.findByIdAndDelete(orderId)
    //         res.json({success:false})
    //     }
        
    // } catch (error) {
    //     console.log(error)
    //     res.json({success:false,message:error.message})
    // }

}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
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
        //console.log(orderData.address.email);
        // console.log(orderData.address);
        // console.log(orderData.items);
        // console.log( orderData.amount);
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

export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}