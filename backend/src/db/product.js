const mongoose = require("./db.js")

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique:true
    },

    price: {
        type: Number,
        required:true,
    },

    description: {
        type: String,
        required: true,
        trim:true,
    },

    offer: {
        type: Number, //什么意思还不太知道
    },

    productPictures: [
        {img:{type:String}},//每次向数组里添加一个元素都会自动添加个给这个元素加一个_id.
    ],

    reviews: [
        {
            userId: { type:mongoose.Schema.Types.ObjectId, ref: "users", },
            review:String,
        }
    ],
    quantity:{
        type:Number,
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "categories",required:true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",required:true,
    },
    updatedBy: Date,

},{timestamps:true})

let Products=mongoose.model("products",ProductSchema);

module.exports=Products;