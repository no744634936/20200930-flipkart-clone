import {categoryConstants} from "../actionTypes.js"

const initState={
    categories:[],
    loading:false,
    error:null,
}


const buildNewCategories=(parentId,categories,Newcategory)=>{
    let myCategories=[];
    //加father {category
    if(parentId==undefined){
        return[
            ...categories,
            {
                _id:Newcategory._id,
                name:Newcategory.name,
                slug:Newcategory.slug,
                children:[]
            }
        ]
    }
    
    //加children category
    //cate.children.length>0 和 cate.children 是同一个意思，所以就if条件里就不要用cate.children && cate.children.length>0
    categories.forEach(cate=>{
        if(cate._id==parentId){
            //使用递归的写法
            myCategories.push({
                ...cate,
                children:(cate.children) ?  buildNewCategories(parentId,[...cate.children,{
                    _id:Newcategory._id,
                    name:Newcategory.name,
                    slug:Newcategory.slug,
                    parentId:Newcategory.parentId,
                    type:Newcategory.type,
                    children:Newcategory.children,
                }],Newcategory):[]
            })

            // //不使用递归的写法
            // let new_cate={
            //     _id:Newcategory._id,
            //     name:Newcategory.name,
            //     slug:Newcategory.slug,
            //     parentId:Newcategory.parentId,
            //     type:Newcategory.type,
            //     children:[]
            // }
            // myCategories.push({
            //     ...cate,
            //     children:(cate.children) ?[...cate.children,new_cate] :[new_cate]
            // })
        }else{
            myCategories.push({
                ...cate,
                children: (cate.children) ? buildNewCategories(parentId,cate.children,Newcategory):[]
            })
        }
    })

    return myCategories
}


const categoryReducer=(state=initState,action)=>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILED:
            state={

            }
        case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
            //前端页面添加了一个新的category之后，只是将category放进了数据库，
            //还需要将新的category放进reducer里的store里面去。
            //这样就不用手动刷新页面就可以在网页上看到新的category

            //state.categories 是redux的store里储存的categories
            //将新的category添加到store里的categories里面去。
            let Newcategory=action.payload.category;
            let updatedCategories=buildNewCategories(Newcategory.parentId,state.categories,Newcategory);
            
            state={
                ...state,
                categories:updatedCategories,
            }
    }
    return state;
}

export  default categoryReducer