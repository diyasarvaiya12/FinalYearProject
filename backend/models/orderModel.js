import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderId: { type: Number, unique: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default:'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true , default: false },
    date: {type: Number, required:true}
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)

export default orderModel;

// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     orderId: { type: Number, unique: true },  // Auto-increment field
//     items: { type: Array, required: true },
//     amount: { type: Number, required: true },
//     address: { type: Object, required: true },
//     status: { type: String, required: true, default: 'Order Placed' },
//     paymentMethod: { type: String, required: true },
//     payment: { type: Boolean, required: true, default: false },
//     date: { type: Number, required: true }
// });

// const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

// export const createOrder = async (orderData) => {
//     const lastOrder = await orderModel.findOne().sort({ orderId: -1 }); // Get last order
//     const nextOrderId = lastOrder ? lastOrder.orderId + 1 : 1000;        // Start from 1000
//     const newOrder = new orderModel({ ...orderData, orderId: nextOrderId });
//     return await newOrder.save();
// };

// export default orderModel;
