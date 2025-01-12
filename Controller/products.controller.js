import mongoose from "mongoose";
import productModel from "../Model/products.model.js";

//This function is used to Add products
export function createproduct(req, res) {
    const { title, description, price, stockquantity, rating, thumbnail } = req.body;
    const createproduct = new productModel({
        title: title,
        description: description,
        price: price,
        stockquantity: stockquantity,
        rating: rating,
        thumbnail: thumbnail
    })

    createproduct.save().then(data => {
        if (!data) {
            return res.status(400).json({ message: "Something went wrong" })
        }
        res.status(201).send(data);
    }).catch(err => res.status(500).json({ message: err.message }))
}

//This function is used to Fetch products
export function fetchproducts(req, res) {
    productModel.find({}).then(data => {
        if (!data) {
            return res.status(400).json({ message: "Something went Wrong" })
        }
        res.status(200).send(data);
    }).catch(err => res.status(500).json({ message: err.message }));
}

//This function is used to fetch product by his id
export function fetchproductbyId(req, res) {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)) { //CHECKS IF ID IS VALID BEFORE HITTING API
        productModel.findById({ _id: id }).then(data => {
            if (!data) {
                return res.status(404).json({ message: "PRODUCT ID NOT FOUND" })
            }
            res.status(200).send(data);
        }).catch(err => res.status(500).json({ message: err.message }));
    }
    else {
        return res.status(400).json({ message: "Invalid ID" })
    }

}

//This function is used to Update existing Product Information
export function updateproduct(req, res) {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        const { title, description, price, stockquantity, rating, thumbnail } = req.body;
        if (!title || !description || !price || !stockquantity || !rating || !thumbnail) {
            return res.status(400).json({ message: "Incomplete Data" });
        }
        else {
            productModel.findByIdAndUpdate(id, {
                title: title,
                description: description,
                price: price,
                stockquantity: stockquantity,
                rating: rating,
                thumbnail: thumbnail
            }).then(data => {
                if (!data) {
                    return res.status(404).json({ message: "Product ID not found" })
                }
                productModel.findById(data._id).then(product => {
                    if (!product) {
                        return res.status(202).send(data);
                    }
                    res.status(200).send(product);
                })
            }).catch(err => res.status(500).json({message: err.message}))
        }
    }
    else {
        return res.status(400).json({ message: "Invalid Product ID" })
    }

}

//This function is used to delete existing product 
export function deleteproduct(req, res) {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        productModel.findByIdAndDelete(id).then(data => {
            if(!data){
                return res.status(400).json({message : "ID NOT FOUND / ALREADY DELETED"})
            }
            return res.status(200).json({message : "SUCCESSFULLY DELETED"});
        }).catch(err => res.status(500).json({message: err.message}))
    }
    else{
        return res.status(400).json({message : "Invalid ID"})
    }
}