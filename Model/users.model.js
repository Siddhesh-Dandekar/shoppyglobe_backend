import mongoose from 'mongoose';

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

const userModel = mongoose.model('users',registerSchema);
export default userModel;