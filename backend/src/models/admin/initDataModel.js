
const Categories = require("../../db/category.js");
const Category =require("../../db/category.js")
const Product=require("../../db/product.js")

class initDataModel {

    //这里用到了递归，有点难理解。多理解一下。
    //把category的数据从数据库里取出来之后
    formatCategories=(categories,parentId=null)=>{
        
        let categoryList=[];
        let allCategory=[];
        if(parentId==null){
            allCategory=categories.filter(category=>category.parentId===undefined)
        }else{
            //category.parentId 是字符串，parentId 是object 所以不能用===只能用==
            allCategory=categories.filter(category=>category.parentId==parentId)
        }

        allCategory.forEach(category=>{
            // console.log(typeof category._id); //object
            categoryList.push({
                _id:category._id,
                name:category.name,
                slug:category.slug,
                parentId:category.parentId,
                type:category.type,
                children:this.formatCategories(categories,category._id)
            })
        })
        return categoryList;
    }

    get_product_and_category_data=async()=>{
        const categories=await Category.find({}).select().exec();
        const products= await Product.find({})
                                        .select("_id name price quantity slug description productPictures category")
                                        //为什么用category 而不用categories ？因为Products表里的字段是category ，
                                        //category字段的ref 是categories表
                                        //查看db/product.js文件
                                        .populate({path:'category',select:"_id name"})  
                                        .exec();
        return {
            categoryList:this.formatCategories(categories),
            productList:products
        }
    }
    

}

module.exports=new initDataModel()