import userModel from "../Model/users.model.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//This function is used for User Registration
export function registeruser(req, res){
    const { fullname, email, password} = req.body;
    userModel.findOne({email : email}).then(data =>{
        if(!data){
            const newuser = new userModel({
                fullname: fullname,
                email : email,
                password: bcrypt.hashSync(password,10)
            })
            newuser.save().then(data => {
                if(!data){
                    return res.status(400).json({message: 'Something went Wrong'})
                }
                res.status(201).send(data);
            }).catch(err => res.status(500).json({message : err.message}));
            return;
        }
        return res.status(409).json({message : "ALREADY REGISTERED EMAIL FOUND"});
    }).catch(err => res.status(500).json({message : err.message}));
}

//This function is used for User Login
export function login(req, res){
    const {email, password} = req.body;
    userModel.findOne({email: email}).then(data => {
        if(!data){
            return res.status(404).json({message: "User not registered"})
        }
        const isValidpassword = bcrypt.compareSync(password, data.password);
        if(isValidpassword){
            const token = jwt.sign({id: data._id},'secretKey', {});
            return res.status(200).json({
                message: 'Successfull Logged',
                accessToken: token
            })
        }
        else{
            return res.status(401).json({message: "Wrong Password"})
        }
    }).catch(err => res.status(500).json({message : err.message}));
    
}