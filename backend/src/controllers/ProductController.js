
const{Success,Error}= require("../myTool/apiResultFormat.js")
const productModel =require("../models/ProudctModel.js")


class ProductController {
    createProduct = async (ctx, next) => {

        console.log(ctx.req.body);
        const { name, price, description, category, quantity,test } = ctx.req.body
        let createdBy = ctx.request.userInfo.userId;
        let productPictures = [];
        if (ctx.req.files.length > 0) {
            productPictures = ctx.req.files.map(file => { return { img:file.filename }})
        }
        let newProduct = await productModel.createProduct(name, price, description,quantity, category, createdBy,test,productPictures)

        /**
        ctx.body = {
            // filename:ctx.req.file,  //single的时候是 用这个
            filename:ctx.req.files,    //array的时候是用这个
            body:ctx.req.body
        }
        */
        ctx.body=new Success(newProduct)

    }
    getAllProducts = async (ctx, next) => {

    }

}

module.exports=new ProductController()
