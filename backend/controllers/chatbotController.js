import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

export const getOrderDetails = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await orderModel.findOne({ orderId });
        if (!order) {
            return res.json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, order });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getProductRecommendations = async (req, res) => {
    try {
        const products = await productModel.find().limit(5); // Example recommendation logic
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
