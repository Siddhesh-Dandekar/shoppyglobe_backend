import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
   productid: String,
   title: String,
   price: Number,
   quantity: Number,
   thumbnail: String,
})

const cartModel = mongoose.model('cartitems', cartSchema);

export default cartModel;