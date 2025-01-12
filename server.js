import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './Routes/products.route.js';

const app = new express();
mongoose.connect('mongodb://localhost:27017/shoppyglobe');
const db = mongoose.connection;

app.listen(5100,() => {
    console.log("Server Running on Port 5100");
})
app.use(cors());

app.use(express.json());

db.on('open', () => {
    console.log("Connection to Database Successful");
})
db.on('error', ()=> {
    console.log("Connection to Database Failed");
})

routes(app);



