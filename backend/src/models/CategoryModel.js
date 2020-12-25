
const slugify=require("slugify")
const Categories =require("../db/category.js")
const {PROJECT_URL}= require("../config/keys.js")
const { nanoid } =require('nanoid')

class CategoryModel {
    createCategory=async (name,parentId,pictureName)=>{
        const categoryObj={
            name:name,
            slug:`${slugify(name)}-${nanoid(10)}`,
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
    //
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

    getAllFormattedCategories =async() => {
        let response=await Categories.find({})
        let categoryList
        if(response){
            categoryList=this.formatCategories(response);
            console.log("categoryList",JSON.stringify(categoryList));
        }
        return categoryList;
    }

    updateCategories=async(id,category)=>{
        let updatedCategory=await Categories.findOneAndUpdate({_id:id},category,{new:true});
    }

    deleteCategories=async(ids)=>{
        const deletedCategories=[];
        for(let i=0;i<ids.length;i++){
            const deleteCategory=await Categories.findOneAndDelete({_id:ids[i].id})
            deletedCategories.push(deleteCategory)
        }

        if(deletedCategories.length===ids.length){
            return deletedCategories
        }else{
            return []
        }
    }
}

module.exports=new CategoryModel()