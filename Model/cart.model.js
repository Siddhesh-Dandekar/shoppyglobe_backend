import mongoose from 'mongoose';

//Creating Schema for Cart items
const cartSchema = mongoose.Schema({
   productid: {
      type: String,
      required : true
   },
   title: String,
   price: Number,
   quantity: Number,
   thumbnail: String,
})

//Creating model using cart schema
const cartModel = mongoose.model('cartitems', cartSchema);

export default cartModel;