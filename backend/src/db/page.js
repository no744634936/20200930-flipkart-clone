const mongoose = require("./db.js")

const PageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    banners:[
        {
            img:{type:String,},
            navigateTo:{type:String}
        }
    ],
    products:[
        {
            img:{type:String,},
            navigateTo:{type:String}
        }
    ],
    category:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref: "categories",
        required:true,
        unique:true, //一个brand只能有一个page
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "users",
        required:true
    }

},{timestamps:true})

let Page=mongoose.model("page",PageSchema);

module.exports=Page;