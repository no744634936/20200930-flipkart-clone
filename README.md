在 20200929-koa-template的基础之上进行开发的


backend文件夹里面的普通user跟admin的注册登录的路由所使用的controller跟model
几乎是一摸一样的，但我还是把他们分开了。为了好读一点。

router.post("/api/signup",validate_signup,userController.singup)
router.post("/api/admin/signup",validate_signup,adminUserController.singup)

如果要把他们合并的话，路由就得这样写。

router.post("/api/signup",validate_signup,userController.singup())
router.post("/api/admin/signup",validate_signup,userController.singup("admin"))


然后，controller就得这样写

---------------------------------------------------------------------------------


singup=(role)=>{
    returnasync (ctx,next)=>{
        let {firstName,lastName,password,email}=ctx.request.body;
        let find_result=await userModel.find_one_by_email(email)
        if(find_result){   
            ctx.body=new Error(email_exist)
            return
        }
        try {
            let newUser=await userModel.create_user(firstName,lastName,password,email,role)
            ctx.body=new Success()
        } catch (error) {
            console.error(error.message,error.stack);
            ctx.body=new Error(register_failed_info)
        }
    }
}
=------------------------------------------------------------------------------
model就得这样写

create_user=async(firstName,lastName,password,email,role)=>{
        let newRecord=new Users({
            firstName,
            lastName,
            password:docrypto(password),
            email,
            userName:Math.random().toString(),
            avatar:DEFAULT_USER_AVATAR,
            role:role ?role:"user"
        })
        let response=await newRecord.save();
        return response;
    }
    //查
    find_one=async(Id)=>{
        let response=await Users.findOne({Id:Id})  
        return response;
    }

    -------------------------------------------------
