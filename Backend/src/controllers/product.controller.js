import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import Product from "../models/product.model.js"
import cloudinaryUpload from "../utils/cloudinary.js"


const addProduct = asyncHandler(async (req, res) => {

    const { title, description, category, oldPrice, newPrice } = req.body;

    if (
        [title, description, category, oldPrice, newPrice].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(401, "all fields are required")
    }

    const itemImageLocalPath = req.file?.path;

    if (!itemImageLocalPath) {
        throw new ApiError(400, "itemImage is required")
    }

    const itemImage = await cloudinaryUpload(itemImageLocalPath);

    if (!itemImage) {
        throw new ApiError(500, "error while uploading on cloudinary")
    }

    const product = await Product.create(
        {
            title,
            description,
            category,
            oldPrice,
            newPrice,
            itemImage: itemImage.url
        }
    )

    if (!product) {
        throw new ApiError(500, "error while adding product")
    }

    return res.status(200)
        .json(new ApiResponse(200, product, "product added successfully"))

});


const allProductDetails = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({});

    return res.status(200)
        .json(new ApiResponse(200, allProducts, "Data fetched successfully"));
});


const removeProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOneAndDelete({ _id: req.body.id });
    console.log("Product deleted");

    return res.status(200)
        .json(new ApiResponse(200, { product }, "Product deleted successfully"));
});

export { addProduct, allProductDetails, removeProduct }