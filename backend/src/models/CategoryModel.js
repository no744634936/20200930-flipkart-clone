
const slugify=require("slugify")
const Categories =require("../db/category.js")
const {PROJECT_URL}= require("../config/keys.js")

class CategoryModel {
    createCategory=async (name,parentId,pictureName)=>{
        const categoryObj={
            name:name,
            slug:slugify(name),
        }
    
        if(parentId){
            categoryObj.parentId=parentId
        }
        if(pictureName){
            categoryObj.categoryImage="/uploadPictures/"+pictureName
        }
    
        const newCategory=new Categories(categoryObj)
        let response=await newCategory.save();
        // console.log(name);
        // console.log(parentId);
        // console.log(response);
        return response
    }
    getAllCategories =async() => {
        let response=await Categories.find({})
        console.log(response);
        return response;
    }

    //这里用到了递归，有点难理解。多理解一下。
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
                children:this.formatCategories(categories,category._id)
            })
        })
        console.log("hahah",categoryList);
        return categoryList;
    }

    getAllFormattedCategories =async() => {
        let response=await Categories.find({})
        let categoryList
        if(response){
            categoryList=this.formatCategories(response);
        }
        return categoryList;
    }
}

module.exports=new CategoryModel()