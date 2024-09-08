import Order from '../models/order.model.js'
import Cart from '../models/cart.model.js'
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
        throw new ApiError(404, "Cart not found")
    };

    let amount = 0;

    for (let i = 0; i < cart.items.length; i++) {
        amount += cart.items[i].product.newPrice * cart.items[i].quantity;
    }

    const newOrder = new Order({
        userId,
        products: cart.items,
        amount: amount
    })

    const savedOrder = await newOrder.save({ validateBeforeSave: false });

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    }

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
        throw new ApiError(500, "error while creating order")
    }

    savedOrder.orderId = order.id;
    await newOrder.save({ validateBeforeSave: false });

    return res.status(200)
        .json(new ApiResponse(200, order, "order created successfully"));
});



const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const userId = req.user._id;

    if (
        [razorpay_payment_id, razorpay_order_id, razorpay_signature].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "data not received")
    }

    const order = await Order.findOne({ orderId: razorpay_order_id })

    if (!order) {
        throw new ApiError(404, 'Order not found')
    }

    order.paymentId = razorpay_payment_id;
    order.status = 'Paid';
    order.paymentStatus = 'Successful';
    await order.save({ validateBeforeSave: false });

    const signature = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(signature.toString())
        .digest("hex");

    if (razorpay_signature !== expectedSignature) {
        throw new ApiError(500, "Internal Server error")
    }

    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
        throw new ApiError(404, "Cart not found")
    }

    await Cart.findOneAndDelete(
        { user: userId },
        { $pull: { _id: cart._id } },
        { new: true }
    )

    return res.status(200)
        .json(new ApiResponse(200, razorpay_payment_id, "Successfull"))
})

const razorPayKeyId = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(new ApiResponse(200, process.env.RAZORPAY_KEY_ID, "Got the KeyId"))
})

const fetchOrders = asyncHandler(async (req, res) => {
    const userid = req.user._id

    const orders = await Order.find({ userId: userid }).populate('products.product');

    if (!orders) {
        throw new ApiError(404, "Orders not found")
    }

    return res.status(200)
        .json(new ApiResponse(200, orders, "orders details fetched"))
});

const orderCancelled = asyncHandler(async (req, res) => {
    const orderId = req.body.order_id;

    const deletedOrdder = await Order.findOneAndDelete(orderId);

    if (!deletedOrdder) {
        throw new ApiError(404, "order not find for delete")
    }

    return res.status(200)
        .json(new ApiResponse(200, deletedOrdder, "Cancelled order deleted"))
})


export { createOrder, verifyPayment, razorPayKeyId, fetchOrders, orderCancelled }