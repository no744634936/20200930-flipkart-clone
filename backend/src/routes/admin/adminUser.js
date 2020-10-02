const router = require('koa-router')()
const adminUserController =require("../../controllers/admin/AdminUserController.js")
const requireSigin =require("../../middleWare/requireSigin.js")
const validate_signup =require("../../validator/signupValidation.js")

router.post("/api/admin/signup",validate_signup,adminUserController.singup)
router.post("/api/admin/signin",adminUserController.signin)
router.get("/api/admin/profile",requireSigin,adminUserController.getProfile)



module.exports=router