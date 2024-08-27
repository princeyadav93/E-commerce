import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        toLowerCase: true
    },
    description: {
        type: String,
        required: true,
        toLowerCase: true
    },
    category: {
        type: String,
        required: true
    }
    ,
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    itemImage: {
        type: String, //From cloudinary url
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);

export default Product;