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


    updateCategories=async (ctx,next)=>{

        //id, name ,parentId,type 都是数组
        let {id,name,parentId,type}=ctx.request.body

        let updatedCategories=[]

        //前端有可能传来数组，也有可能传来一个值
        if(name instanceof Array){
            for(let i=0;i<name.length;i++){
                let category={
                    name:name[i],
                    type:type[i],
                }
                if(parentId[i]!==""){
                    category.parentId=parentId[i]
                }
                let updatedCategory = await categoryModel.updateCategories(id[i],category)
                updatedCategories.push(updatedCategory)
            }
            return  ctx.body={
                status:201,
                updatedCategories:updatedCategories,
            }
        }else{
            let category={
                name,
                type
            }
            if(parentId!==""){
                category.parentId=parentId;
            }

            console.log(category);
            let updatedCategory = await categoryModel.updateCategories(id,category)
            return  ctx.body={
                status:201,
                updatedCategories:updatedCategory,
            }
        }
    }

    deleteCategories=async(ctx,next)=>{

        const {ids}=ctx.request.body.payload
        let deletedCategories = await categoryModel.deleteCategories(ids)
        if(deletedCategories.length>0){
            return  ctx.body={
                status:201,
                body:"categories removed"
            }
        }else{
            return  ctx.body={
                status:400,
                body:"something went wrong"
            }
        }
    }
}

module.exports=new CategoryController()
