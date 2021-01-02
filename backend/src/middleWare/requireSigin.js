const {JWT_SECRET_KEY} =require("../config/keys.js")
const jwt = require('jsonwebtoken');
const{Success,Error}= require("../myTool/apiResultFormat.js")

requireSigin = async (ctx, next) => {
    console.log("shit",ctx.request.header.authorization);
    try {
        if (ctx.request.header.authorization) {
            const token=ctx.request.header.authorization.split(" ")[1];
            const userInfo = jwt.verify(token, JWT_SECRET_KEY);
            ctx.request.userInfo=userInfo
            await next();
        } else {
            ctx.body=new Error({errnum:10020,message:"Authorization required"})
        }
    } catch (err) {
        console.error(err);
        ctx.body=new Error({errnum:10020,message:"Authorization required"})
    }
}

module.exports = requireSigin