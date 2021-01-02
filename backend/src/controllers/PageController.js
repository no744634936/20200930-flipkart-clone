const PageModel =require('../models/PageModel')
const{Success,Error}= require("../myTool/apiResultFormat.js")

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
}

module.exports=new PageController()