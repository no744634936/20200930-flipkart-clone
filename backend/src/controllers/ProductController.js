
const{Success,Error}= require("../myTool/apiResultFormat.js")
const productModel =require("../models/ProudctModel.js")
const {create_product_failed,get_products_failed} = require("../myTool/errInfo.js")


class ProductController {
    createProduct = async (ctx, next) => {
        try{
            console.log(ctx.request.files);
            const { name, price, description, category, quantity,test } = ctx.request.body
            let createdBy = ctx.request.userInfo.userId;
            let productPictures = [];
            console.log("----------------------------------------------------");
            console.log("files",ctx.request.files);
            if (ctx.request.files.length > 0) {
                productPictures = ctx.request.files.map(file => { return { img:"/uploadPictures/"+file.filename }})
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
        }catch(err){
            console.error(err.message,err.stack);
            ctx.body=new Error(create_product_failed)
        }


    }
    getAllProducts = async (ctx, next) => {

    }


    getProductsBySlug=async(ctx,next)=>{
        try {
            let {slug}=ctx.params;
            let response=await productModel.getProductsBySlug(slug);
            ctx.body=response
        } catch (error) {
            ctx.body=new Error(get_products_failed)
        }

    }

}

module.exports=new ProductController()
