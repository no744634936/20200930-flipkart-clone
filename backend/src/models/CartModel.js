const Cart=require("../db/cart.js")

class CartModel {
    addItemToCart=async(userId,cartItem)=>{
        //一个人只有一个cart
        // 当用户点击添加到购物车按钮的时候，
        // 第一次添加，要新建一个cart记录
        // 第二次添加商品要就要将商品添加到原来的cart的记录里面去。
        // add to cart　是一个一个往里加商品一次只添加一个。
        // 当用回添加了A商品，过后又添加了A产品，那么cart里面的A产品数量要变化
        let find_result=await Cart.findOne({user:userId})
        if(find_result){
            //第二次添加商品的情况
            let newProductId=cartItem.product; 
            let exitItem=find_result.cartItems.find(item=>{
                // console.log(typeof item.product);  object
                // console.log(typeof newProductId);  string
                return item.product.toString()===newProductId;
            });
            if(exitItem){
                // 当用回添加了A商品，过后又添加了A产品，那么cart里面的A产品数量要变化
                let updateResult=await Cart.findOneAndUpdate({"user":userId,"cartItems.product":newProductId},{
                    "$set":{
                        "cartItems.$.quantity":exitItem.quantity+cartItem.quantity
                    }
                },{ new : true })
                return updateResult
            }else{
                //如果cart里面没有相同的产品就添加一个新的产品
                //也可以像上面那样使用update方法来更新，但是这种写法跟便利
                find_result.cartItems.push(cartItem)
                await find_result.save();
                return find_result
            }
        }else{
            //第一次添加商品的情况。如果第一次使用添加到购物车就新建一个cart
            const cart=new Cart({
                user:userId,
                cartItems: [cartItem],
            })
            let response=await cart.save()
            return response
        }
    }
}

module.exports=new CartModel()