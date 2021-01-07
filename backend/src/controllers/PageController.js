const PageModel =require('../models/PageModel')
const{Success,Error}= require("../myTool/apiResultFormat.js")

//使用了nosql之后，感觉没有必须用modal了
const Page=require("../db/page.js")


class PageController {
    createPage=async(ctx,next)=>{
        try {
            // console.log("body",ctx.request.body);
            let {banners,products}=ctx.request.files;
            let {category,type,createdBy}=ctx.request.body;
            let obj=ctx.request.body
            let response=await PageModel.createPage(obj,banners,products,category,type,createdBy)
            console.log(response);
            
            ctx.body=new Success({status:0,page:response})
        } catch (err) {
            console.error(err);
            ctx.body=new Error()
        }
    }


    getPage=async(ctx,next)=>{
        //从url里面获取参数ctx.params
        let {category,type}=ctx.params;
        console.log(category,type);
        if(type==="page"){
            //一个category只能有一个page
           let response= await Page.findOne({category:category})
           ctx.body=new Success({status:0,page:response})
        }
    }
}



module.exports=new PageController()