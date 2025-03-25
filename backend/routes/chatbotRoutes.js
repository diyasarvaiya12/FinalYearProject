import express from 'express';
import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js'; // Assuming you have this

const router = express.Router();

router.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message.toLowerCase().trim();

    // Keywords-based replies
    const keywords = [
        { triggers: ["hello", "hi", "hey"], response: "Hello! How can I assist you today?" },
        { triggers: ["order", "track", "status"], response: "Please provide your order ID to track your order." },
        { triggers: ["recommend", "suggest", "products"], response: "Sure! I can recommend some great products. Just ask!" }
    ];

    // Check for keyword-based matches
    for (const keyword of keywords) {
        if (keyword.triggers.some(trigger => userMessage.includes(trigger))) {
            return res.json({ reply: keyword.response });
        }
    }

    // Order ID check
    if (userMessage.startsWith('ord')) {
        const order = await orderModel.findOne({ orderId: userMessage });

        if (order) {
            const reply = `📦 Order Details:
🔹 **Order ID:** ${order.orderId}
💰 **Amount:** ₹${order.amount}
🚚 **Status:** ${order.status}`;
            return res.json({ reply });
        } else {
            return res.json({ reply: "❌ No order found with this ID. Please try again." });
        }
    }

    // Product Recommendations
    if (userMessage.includes('recommend')) {
        const products = await productModel.find({}).limit(3); // Display 3 random products
        const productDetails = products.map(p => `🛒 **${p.name}** - ₹${p.price}`).join('\n');
        return res.json({ reply: `Here are some product recommendations:\n${productDetails}` });
    }

    // Default fallback response
    res.json({ reply: "I'm not sure about that. Try asking about orders or product recommendations!" });
});

export default router;
