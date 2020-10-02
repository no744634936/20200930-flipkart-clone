const mongoose = require('mongoose');
const keys=require("../config/keys.js")

//使用mlab的连接方式
mongoose.connect(keys.mongoURI,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    console.log("mongodb connected...");
})
.catch(err=>{
    console.log(err);
});

module.exports=mongoose;