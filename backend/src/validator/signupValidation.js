/**
 * @description 用户注册信息验证
 * @author zhanghaifeng
 * 
 */

const validate_data=require("../validator/_validate.js")
const{Success,Error}= require("../myTool/apiResultFormat.js")
const {data_validataion_failed}=require("../config/keys.js")


 // 校验规则 json schema。可以google查看json schema的更多规则
const SCHEMA = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
            maxLength: 255,
            minLength: 2,
            errorMessage:{
                type:"name为sting类型",
                pattern:"姓名必须以字母开头，包含字母数字下划线",
                maxLength:"姓名长度需小于255",
                minLength:"姓名长度需大于2"
            }
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3,
            errorMessage:{
                type:"password为sting类型",
                maxLength:"密码长度需小于255",
                minLength:"密码长度需大于3"
            }
        },
        email: { 
            type: "string", 
            format: "email",
            errorMessage:{
                type:"email为sting类型",
                format:"请输入正确的email"
            }
        },
        avatar: {
            type: 'string',
            maxLength: 255
        },
    }
}


//执行校验
/**
 * @description 校验用户数据
 * 
 */

//中间件 中间件一定是async函数
validate_signup=async(ctx,next)=>{

    //data为用户通过路由传递的数据
    let data=ctx.request.body
    let errs=validate_data(SCHEMA,data)　//如果没有错误返回undefine

    if(errs){
        let err_messages=errs.map(err=>err.message);
        ctx.body={errnum:100020,messages:err_messages}
        return // 不再执行后面的程序
    }

    //验证通过进行下一步，使用controller里的方法进行逻辑处理
    await next()
}
module.exports=validate_signup