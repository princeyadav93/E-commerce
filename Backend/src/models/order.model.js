import mongoose from "mongoose";

const orderedProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
})
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [orderedProductSchema],
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR',
    },
    status: {
        type: String,
        default: 'created',
    },
    orderId: String,
    paymentId: String,
    paymentStatus: String,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;