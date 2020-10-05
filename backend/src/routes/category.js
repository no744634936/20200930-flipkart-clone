const router = require('koa-router')()
const categoryController = require("../controllers/CategoryController.js")
const requireSigin =require("../middleWare/requireSigin")
const requireAdmin =require("../middleWare/requireAdmin")

router.post("/api/category/create",requireSigin,requireAdmin,categoryController.createCategory)
router.get("/api/category/getCategories",categoryController.getAllCategories)

module.exports=router