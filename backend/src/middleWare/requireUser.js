const{Success,Error}= require("../myTool/apiResultFormat.js")

requireUserPermission = async(ctx, next) => {

    //ctx.request.userInfo 这个是requireSigin 中间件里面的
    if (ctx.request.userInfo.role !== "user") {
        ctx.body=new Error({errnum:10020,message:"you are not a user,access denied"})
    } else {
        await next();
    }
}

module.exports=requireUserPermission