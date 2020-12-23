这一节主要写的是修改category 这个功能



npm install react-checkbox-tree --save

npm install react-icons --save

npm install koa2-formidable --save



-------------------------------------------------------------------------------
注意

router.post("/api/category/updateCategories",categoryController.updateCategories)

这个路由

post过来的数据格式是 form-data格式

但是koa不能解析 form-data格式

查看这个连接
https://stackoverflow.com/questions/33751203/how-to-parse-multipart-form-data-body-with-koa

所以解决方法是使用 @koa/multer

router.post("/api/category/updateCategories",upload.array("categoryImage"),categoryController.updateCategories)


或者和app.js里使用 
const formidable = require('koa2-formidable');


我这里写的是
const formidable = require('koa2-formidable');
然后路由用的是
router.post("/api/category/updateCategories",categoryController.updateCategories)