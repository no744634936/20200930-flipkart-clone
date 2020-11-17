
const{Success,Error} = require("../myTool/apiResultFormat.js")

requireAdminPermission = async(ctx, next) => {
    //ctx.request.userInfo 这个是requireSigin 中间件里面的
    if (ctx.request.userInfo.role !== "admin") {
        ctx.body=new Error({errnum:10020,message:"access denied need admin permission"})
    } else {
        await next();
    }
}

module.exports = requireAdminPermission
