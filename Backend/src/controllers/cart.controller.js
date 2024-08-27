import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);


    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (cart) {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart = await Cart.findOneAndUpdate(
                { "items.product": productId },
                { $inc: { "items.$.quantity": +1 } },
                { new: true }
            )
        } else {
            cart.items.push({ product: productId, quantity: quantity });
        }
    } else {
        cart = await Cart.create({ user: userId, items: [{ product: productId, quantity: quantity }] });
    }

    await cart.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, cart, "product added to cart successfully"));
});

const decreaseCartQty = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "product not found")
    }

    let cart = await Cart.findOne({
        user: userId,
        "items.product": productId,
    });

    if (!cart) {
        throw new ApiError(404, "cart not found")
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    const itemId = cart.items[itemIndex]._id;
    const quantity = cart.items[itemIndex].quantity;

    if (quantity == 1) {
        cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { "items": { _id: itemId } } },
            { new: true }
        )
    } else {
        cart = await Cart.findOneAndUpdate(
            { "items.product": productId },
            { $inc: { "items.$.quantity": -1 } },
            { new: true }
        )
    }

    return res.status(200)
        .json(new ApiResponse(200, { cart }, "Decrease quantity"));
});

const deleteCartItem = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "product not found")
    }

    let cart = await Cart.findOne(
        {
            user: userId,
            "items.product": productId
        })
    console.log(cart)

    if (!cart) {
        throw new ApiError(404, "cart not found")
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    const itemId = cart.items[itemIndex]._id;

    cart = await Cart.findByIdAndUpdate(
        { _id: cart._id },
        { $pull: { "items": { _id: itemId } } },
        { new: true }
    )

    return res.status(200)
        .json(new ApiResponse(200, cart, "cart deleted successfully"))

});

const getCartAllDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "cart not found")
    }

    if (cart.items.length == 0) {
        cart = await Cart.findOneAndDelete(
            { user: userId },
            { $pull: { _id: cart._id } },
            { new: true }
        )
    }
    if (cart.items.length == 0) {
        cart = false;
    }

    return res.status(200)
        .json(new ApiResponse(200, cart.items, "cart details fetched successfully"))

});

const cartTotalPrice = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId }).populate('items.product')

    if (!cart) {
        throw new ApiError(404, "Cart not found Total price")
    }

    return res.status(200)
        .json(new ApiResponse(200, cart, "Data fetched successfully"))
});

export { addToCart, decreaseCartQty, getCartAllDetails, deleteCartItem, cartTotalPrice };