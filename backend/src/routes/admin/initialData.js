const router = require('koa-router')()
const initDataController =require("../../controllers/admin/initDataController.js")


//初始话数据，将category跟products的数据一起拿出来。
router.get("/api/initialData",initDataController.products_data)

module.exports=router