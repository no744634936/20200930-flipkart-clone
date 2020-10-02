const ENV=process.env.NODE_ENV;

let keys=null;
//production 是heroku里的环境参数。注意不是prd.
if(ENV==="production"){
    keys=require("./prd_constants.js")
}else{
    keys=require("./dev_constants.js")
}

module.exports=keys;