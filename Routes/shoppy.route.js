import { createproduct , fetchproductbyId , fetchproducts, updateproduct, deleteproduct} from "../Controller/products.controller.js"
import { addcartitem , updatecartitem, deletecartitem , fetchcartitems} from "../Controller/cartitems.controller.js";
import { registeruser, login } from "../Controller/users.controller.js";
import verifytoken from "../Middleware/tokenaccess.js";

function routes(app){
    //Product Routes
    app.get('/products', fetchproducts);
    app.get('/products/:id', fetchproductbyId);

    //Cart Routes
    app.post('/cart',verifytoken, addcartitem);
    app.get('/cart',verifytoken, fetchcartitems);
    app.put('/cart/:id',verifytoken, updatecartitem);
    app.delete('/cart/:id',verifytoken, deletecartitem);

    //User Routes
    app.post('/register', registeruser);
    app.post('/login',login);

    //Optional - ADDING DELETING UPDATING WITHOUT TOKEN
    app.post('/api/product', createproduct)
    app.put('/api/product/:id',updateproduct)
    app.delete('/api/product/:id',deleteproduct);
    
}

export default routes;