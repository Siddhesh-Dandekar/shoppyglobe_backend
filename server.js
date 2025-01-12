import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './Routes/shoppy.route.js';

//creating express.js server
const app = new express();

//connnecting server to mongodb 
mongoose.connect('mongodb://localhost:27017/shoppyglobe');

//fetching connection status
const db = mongoose.connection;

//server running on port 5100
app.listen(5100,() => {
    console.log("Server Running on Port 5100");
})
//using middleware cors for allowing data sharing between different domains 
app.use(cors());
app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.url);
    next();
})
//THis middleware helps parsing data
app.use(express.json());

//Checking database connection establised or not
db.on('open', () => {
    console.log("Connection to Database Successful");
})
db.on('error', ()=> {
    console.log("Connection to Database Failed");
})

//Sending all routes into this function
routes(app);



