const userModel =require("../models/UserModel.js")
const { email_exist, register_failed_info,email_not_exist} = require("../myTool/errInfo.js")
const{Success,Error}= require("../myTool/apiResultFormat.js")
const {JWT_SECRET_KEY} =require("../config/keys.js")
const jwt = require('jsonwebtoken');
const validate_signup = require("../validator/signupValidation.js")


class UserController{
    singup=async (ctx,next)=>{
        let {firstName,lastName,password,email}=ctx.request.body;
        let find_result=await userModel.find_one_by_email(email)
        if(find_result){   //不要写成 if(find_result.length>0) js中object没有length属性
            ctx.body=new Error(email_exist)
            return
        }
        try {
            let newUser=await userModel.create_user(firstName,lastName,password,email)
            ctx.body=new Success()
        } catch (error) {
            console.error(error.message,error.stack);
            ctx.body=new Error(register_failed_info)
            //应该要这样写，ctx.body=new Error(error.message) 将具体的错误信息传给前端。
        }
    }
    signin=async (ctx,next)=>{
        // 查询email
        let {email,password}=ctx.request.body;
        let find_result=await userModel.find_one_by_email(email)

        //没查到email
        if(!find_result){
            ctx.body=new Error(email_not_exist)
            return
        }

        //查到email了,检查密码是否正确
        if(find_result.password===docrypto(password)){
            //返回token
            let payload={ userId: find_result._id,role:find_result.role}
            let token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn:60*60*2});//expiresIn的单位为秒
            // return token
            ctx.body=new Success({
                status:200,
                token:"bearer "+token,  //必须加bearer这个字符串,注意中间有个空格
            })
        }else{
            ctx.body=new Error(password_wrong)
            return
        }
    }

    getProfile=async(ctx,next)=>{
        console.log(ctx);
        ctx.body="test profile"
    }
}

module.exports=new UserController();