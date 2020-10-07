const mongoose = require("./db.js")

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    cartItems:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:"products",required:true},
            quantity:{type:Number,default:1,required:true},
            price:{type:Number,required:true}
        }
    ]

},{timestamps:true})

let Cart=mongoose.model("cart",CartSchema);

module.exports=Cart;