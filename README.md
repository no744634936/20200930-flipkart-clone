npm install koa-multer --save
npm install uuid --save


// koa-bodyparser は multipart/form-data に非対応
//下面这个路由使用了 multer，来传图片，在postman那边就必须使用 form-data 格式来传递数据。
//controller里面取出数据时也必须使用 ctx.req.body 来取

router.post("/api/product/create",requireSigin,requireAdmin,upload.array("productPicture"),productController.createProduct)


//当一个路由没有使用 multer的时候，postman那边用 x-www-form-urlencode 格式来传递数据即可，
//controller里面取出数据时也必须使用 ctx.reqest.body 来取



---------------------------------------------------
当controller 向model传递参数的时候要记得参数的位置要一一对应。



-----------------------------------------------------------


产品数据存入数据库失败图片也会上传，product创建失败时，想个办法把上传的图片删除
