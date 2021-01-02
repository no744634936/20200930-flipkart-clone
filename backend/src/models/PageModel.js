const {PROJECT_URL}= require("../config/keys.js")
const Page=require("../db/page.js")
class PageModel {
    createPage=async(obj,banners,products,category,type,createdBy)=>{
        //banners跟products 是一个有object构成的数组。
        if(banners.length>0){
           obj.banners=banners.map((banner,index)=>{
                return({
                    img:`${PROJECT_URL}/public/${banner.filename}`,
                    navigateTo: `/bannerClicked?categoryId=${category}&type=${type}`
                })
            })
        }
        if(products.length>0){
           obj.products=banners.map((products,index)=>{
                return(
                    {
                        img:`${PROJECT_URL}/public/${products.filename}`,
                        navigateTo: `/productClicked?categoryId=${category}&type=${type}`
                    }
                )

            })
        }

        obj.createdBy=createdBy
        const newPage=new Page(obj)
        let response=await newPage.save();
        return response
    }
}


module.exports=new PageModel()