const categoryModel =require('../models/CategoryModel.js')
const{Success,Error}= require("../myTool/apiResultFormat.js")
const { create_category_failed} = require("../myTool/errInfo.js")


class CategoryController {
    createCategory=async (ctx,next)=>{

        const {name,parentId}=ctx.request.body
        const pictureName=ctx.request.file.filename
        console.log(ctx.request.file);
        try{
            let newCategory=await categoryModel.createCategory(name,parentId,pictureName)
            ctx.body=new Success(newCategory)
        }catch(err){
            console.error(err.message,err.stack);
            ctx.body=new Error(create_category_failed)
        }
    }
    getAllCategories = async (ctx, next) => {
        try {
            // let result = await categoryModel.getAllCategories()
            let result = await categoryModel.getAllFormattedCategories()
            if (result) {
                ctx.body=new Success(result)
            } else {
                //如果没有找到数据
                ctx.body=new Error(record_not_exist)
            }
    
        } catch (err) {
            console.error(err);
            ctx.body=new Error(system_error)
        }
    }

}

module.exports=new CategoryController()
