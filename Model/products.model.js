import mongoose from "mongoose";

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

const productModel = mongoose.model('products', productSchema);
export default productModel;