const router = require('koa-router')()
const CartController = require("../controllers/CartController.js")
const requireSigin =require("../middleWare/requireSigin")
const requireUser =require("../middleWare/requireUser")

router.post("/api/cart/addtocart",requireSigin,requireUser,CartController.addItemToCart)


module.exports=router