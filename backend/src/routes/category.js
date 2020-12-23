const router = require('koa-router')()
const categoryController = require("../controllers/CategoryController.js")
const requireSigin =require("../middleWare/requireSigin")
const requireAdmin =require("../middleWare/requireAdmin")

const path=require("path")
const multer = require('@koa/multer');
const storage=multer.diskStorage({
    //文件保存路径 
    destination:function(req,file,cb){ 
        cb(null,path.join(path.dirname(__dirname),'/public/uploadPictures')) //注意路径必须存在.path.dirname(__dirname)代表app.js 文件的所在文件夹
    }, 
    //修改文件名称 
    filename:function(req,file,cb){
         let fileFormat=(file.originalname).split("."); 
         cb(null,Date.now()+"."+fileFormat[fileFormat.length-1]); 
    } 
})

const limits = {
    fields: 10,//Number of non-file fields
    fileSize: 500 * 1024,//File Size Unit b
    files: 6//Number of documents
}

//加载配置
const upload = multer({storage,limits })

router.post("/api/category/create",requireSigin,requireAdmin,upload.single("categoryImage"),categoryController.createCategory)
router.get("/api/category/getCategories",categoryController.getAllCategories)
router.post("/api/category/updateCategories",categoryController.updateCategories)

module.exports=router