const router = require('koa-router')()
const userController =require("../controllers/UserController.js")
const requireSigin =require("../middleWare/requireSigin.js")
const validate_signup =require("../validator/signupValidation.js")

router.post("/api/signup",validate_signup,userController.singup)
router.post("/api/signin",userController.signin)
router.get("/api/profile",requireSigin,userController.getProfile)



module.exports=router