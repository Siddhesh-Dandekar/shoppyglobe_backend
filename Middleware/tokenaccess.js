import jwt from "jsonwebtoken";
import userModel from "../Model/users.model.js";


//This function is Used to verify token which acts as an middleware
function verifytoken(req, res, next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] == 'JWT'){
        jwt.verify(req.headers.authorization.split(" ")[1], "secretKey", function(err, verifiedToken){
            if(err){
                return res.status(400).json({message : err.message});
            }
            userModel.findById(verifiedToken.id).then(data => {
            req.user = data;
            next();
            })
        });
    }
    else{
        return res.status(400).json({message : 'Access Denied'})
    }
}

export default verifytoken