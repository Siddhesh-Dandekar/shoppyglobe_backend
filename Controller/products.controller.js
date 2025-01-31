import mongoose from "mongoose";
import productModel from "../Model/products.model.js";

//This function is used to Add products
export async function createproduct(req, res) {
    try {
        const { title, description, price, stockquantity, rating, thumbnail } = req.body;
        const createproduct = new productModel({
            title: title,
            description: description,
            price: price,
            stockquantity: stockquantity,
            rating: rating,
            thumbnail: thumbnail
        });
        
        const savedProduct = await createproduct.save();
        if (!savedProduct) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        return res.status(201).send(savedProduct);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// This function is used to fetch products
export async function fetchproducts(req, res) {
    try {
        const data = await productModel.find({});
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// This function is used to fetch product by its id
export async function fetchproductbyId(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        const data = await productModel.findById(id);
        if (!data) {
            return res.status(404).json({ message: "PRODUCT ID NOT FOUND" });
        }
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// This function is used to update existing Product Information
export async function updateproduct(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }

    const { title, description, price, stockquantity, rating, thumbnail } = req.body;
    if (!title || !description || !price || !stockquantity || !rating || !thumbnail) {
        return res.status(400).json({ message: "Incomplete Data" });
    }

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                price,
                stockquantity,
                rating,
                thumbnail
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product ID not found" });
        }

        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


// This function is used to delete an existing product 
export async function deleteproduct(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "ID NOT FOUND / ALREADY DELETED" });
        }
        return res.status(200).json({ message: "SUCCESSFULLY DELETED"});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
