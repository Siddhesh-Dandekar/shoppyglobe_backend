import mongoose from "mongoose";
import cartModel from "../Model/cart.model.js";
import productModel from "../Model/products.model.js";

// This function is used to add a product to the cart
export async function addcartitem(req, res) {
    const { productid } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }

    try {
        const existingCartItem = await cartModel.findOne({ productid: productid });
        if (existingCartItem) {
            return res.status(409).json({ message: "Product already added in cart" });
        }

        const product = await productModel.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const createitem = new cartModel({
            productid: product._id,
            title: product.title,
            price: product.price,
            quantity: 1,
            thumbnail: product.thumbnail
        });

        const savedItem = await createitem.save();
        return res.status(201).json(savedItem);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// This function is used to update cart item quantity
export async function updatecartitem(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "quantity should be more or equal to 1" });
    }

    try {
        const updatedItem = await cartModel.findOneAndUpdate(
            { productid: id },
            { quantity: quantity }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        const latestupdate = await cartModel.findById(updatedItem._id)
        return res.status(200).json(latestupdate);
    } catch (err) {

        return res.status(500).json({ message: err.message });
    }
}


// This function is used to delete a cart item
export async function deletecartitem(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid  ID" });
    }

    try {
        const deletedItem = await cartModel.findOneAndDelete({ productid: id });
        if (!deletedItem) {
            return res.status(404).json({ message: "Invalid Product ID / Already Deleted from Cart" });
        }

        return res.status(200).json(deletedItem)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// This function is used to fetch cart items
export async function fetchcartitems(req, res) {
    try {
        const cartItems = await cartModel.find({});
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: "No cart items found" });
        }
        return res.status(200).json(cartItems);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
