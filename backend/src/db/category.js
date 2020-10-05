const mongoose = require("./db.js")

const CategorySchema = new mongoose.Schema({
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
    parentId: {
        type:String,
    }
},{timestamps:true})

let Categories=mongoose.model("categories",CategorySchema);

module.exports=Categories;