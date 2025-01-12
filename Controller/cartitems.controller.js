import mongoose from "mongoose";
import cartModel from "../Model/cart.model.js";
import productModel from "../Model/products.model.js";

//This function is used to add product in cart
export function addcartitem(req, res) {
    const { productid } = req.body;
    if(mongoose.Types.ObjectId.isValid(productid)){
        cartModel.findOne({ productid: productid }).then(data => {
            if (!data) {
                productModel.findById(productid).then(product => {
                    if (!product) {
                        return res.status(404).json({ message: "Invalid Product ID" })
                    }
                    const createitem = new cartModel({
                        productid: product._id,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        thumbnail: product.thumbnail
                    })
                    createitem.save().then(data => {
                        res.status(201).send(data);
                    }).catch(err => res.status(500).json({ message: err.message }));
                    return;
                })
                return;
            }
            return res.status(409).json({ message: "Product Already added in cart" })
        }).catch(err => res.status(500).json({ message: err.message }));
    }
    else {
        return res.status(500).json({ message: "Invalid ID" })
    }

}

//This function is used to update cart quantity
export function updatecartitem(req, res) {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        const { quantity } = req.body;
        if (quantity <= 0) {
            return res.status(400).json({ message: "quantity should be more or equal to 1" })
        }
        cartModel.findOneAndUpdate({ productid: id }, { quantity: quantity }).then(data => {
            cartModel.findById(data._id).then(prod => res.status(200).send(prod))
        }).catch(err => res.status(500).json({ message: err.message }));
    }
    else {
        return res.status(500).json({ message: "Invalid ID" })
    }
}

//This function is used to delete Cart items
export function deletecartitem(req, res) {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)) {
        cartModel.findOneAndDelete({ productid: id }).then(data => {
            if (!data) {
                return res.status(200).json({ message: "Invalid ProductID / Already Deleted from Cart" })
            }
            cartModel.findById(data._id).then(prod => {
                if (!prod) { return res.status(202).send(data) }
                res.status(200).send(prod)
            })
        }).catch(err => res.status(500).json({ message: err.message }));
    }
    else {
        return res.status(500).json({ message: "Invalid ID" })
    }

}

//This function is used to fetch cart items
export function fetchcartitems(req, res) {
    cartModel.find({}).then(data => {
        if (!data) {
            return res.status(400).json({ message: "Something went wrong" })
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({ message: err.message }));
}