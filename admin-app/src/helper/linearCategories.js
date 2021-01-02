//递归算法将category放进 modal里的select里的option
const createCategoryList=(categoriesData,options=[])=>{
    categoriesData.map(category=>{
        options.push({id:category._id,name:category.name,parentId:category.parentId,type:category.type,});
        if(category.children.length>0){
            createCategoryList(category.children,options)
        }
    })
    return options
}

export default createCategoryList;

    