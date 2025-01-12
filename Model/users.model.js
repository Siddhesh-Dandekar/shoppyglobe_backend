import mongoose from 'mongoose';

//Creating schema for users
const registerSchema = mongoose.Schema({
    fullname : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    }
})

//creating model for users schema
const userModel = mongoose.model('users',registerSchema);
export default userModel;