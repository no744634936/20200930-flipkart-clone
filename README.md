这一节主要写的是修改category 这个功能



npm install react-checkbox-tree --save

npm install react-icons --save



-------------------------------------------------------------------------------
注意

router.post("/api/category/updateCategories",categoryController.updateCategories)

这个路由

post过来的数据格式是 form-data格式

但是koa不能解析 form-data格式

查看这个连接
https://stackoverflow.com/questions/33751203/how-to-parse-multipart-form-data-body-with-koa

所以解决方法是使用 @koa/multer

app.js 文件里面


const multer = require('@koa/multer');
const upload = multer();
app.use(upload.any());

所有页面就可以解析form-data格式数据了


form-data格式的数据
除了有上传的图片
还有从前端一次性传多条记录到后台
{
    "name": [
        "iphone",
        "Huawei"
    ],
    "parentId": [
        "...",
        "...."
    ],
    "type": [
        "page",
        "product"
    ]
}
