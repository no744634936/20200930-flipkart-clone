const router = require('koa-router')()
const PageController = require("../controllers/PageController.js")
const requireSigin =require("../middleWare/requireSigin")
const requireAdmin =require("../middleWare/requireAdmin")
const upload =require("../middleWare/upload.js")

router.post("/api/page/create",requireSigin,requireAdmin,upload.fields([
    {name:"banners"},
    {name:"products"}
]),PageController.createPage)


router.get("/api/page/:category/:type",PageController.getPage)

module.exports=router