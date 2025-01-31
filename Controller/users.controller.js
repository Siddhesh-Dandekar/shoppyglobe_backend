import userModel from "../Model/users.model.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//This function is used for User Registration
export async function registeruser(req, res) {
    try {
        const { fullname, email, password } = req.body;
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new userModel({
                fullname: fullname,
                email: email,
                password: hashedPassword
            });
            const savedUser = await newUser.save();
            if (!savedUser) {
                return res.status(400).json({ message: 'Something went wrong' });
            }
            return res.status(201).send(savedUser);
        } else {
            return res.status(409).json({ message: "ALREADY REGISTERED EMAIL FOUND" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


//This function is used for User Login
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const data = await userModel.findOne({ email: email });
        if (!data) {
            return res.status(404).json({ message: "User not registered" });
        }
        const isValidPassword = bcrypt.compareSync(password, data.password);
        if (isValidPassword) {
            const token = jwt.sign({ id: data._id }, 'secretKey', {});
            return res.status(200).json({
                message: 'Successfully Logged',
                accessToken: token
            });
        } else {
            return res.status(401).json({ message: "Wrong Password" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
