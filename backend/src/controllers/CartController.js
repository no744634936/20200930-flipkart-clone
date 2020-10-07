const cartModel =require('../models/CartModel.js')
const{Success,Error}= require("../myTool/apiResultFormat.js")
const { add_to_cart_failed} = require("../myTool/errInfo.js")


class CartController {
    addItemToCart=async(ctx,next)=>{
        try{
            let userId = ctx.request.userInfo.userId;
            let cartItems=ctx.request.body.cartItems;
            console.log(userId);
            console.log(cartItems);
            let result=await cartModel.addItemToCart(userId,cartItems)
            ctx.body=new Success(result);

        }catch(err){
            console.error(err.message,err.stack);
            ctx.body=new Error(add_to_cart_failed)
        }

        
    }
}

module.exports=new CartController()