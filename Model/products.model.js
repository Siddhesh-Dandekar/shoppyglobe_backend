import mongoose from "mongoose";

//creating schema for products
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockquantity: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    }
})

//creating model for product schema
const productModel = mongoose.model('products', productSchema);
export default productModel;