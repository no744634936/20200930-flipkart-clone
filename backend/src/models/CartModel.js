const Cart=require("../db/cart.js")

class CartModel {
    addItemToCart=async(userId,cartItems)=>{
        //一个人只有一个cart
        // 当用户点击添加到购物车按钮的时候，
        // 第一次添加，要新建一个cart记录
        // 第二次添加商品要就要将商品添加到原来的cart的记录里面去。
        let find_reslut=await Cart.findOne({user:userId})
        if(find_reslut){
            
            return {test:"hhshsh"}
        }else{
            const cart=new Cart({
                user:userId,
                cartItems: cartItems,
            })
            let response=await cart.save()
            return response
        }
    }
}

module.exports=new CartModel()