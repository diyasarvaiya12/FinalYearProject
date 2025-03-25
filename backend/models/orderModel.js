import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },  // Changed to String
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true, default:'Order Placed' },
    items: { type: Array, required: true },
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true },
    date: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)

export default orderModel;
