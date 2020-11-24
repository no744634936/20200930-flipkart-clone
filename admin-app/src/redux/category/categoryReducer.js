import {categoryConstants} from "../actionTyps.js"

const initState={
    categories:[],
    loading:false,
    error:null,
}


const buildNewCategories=(pareIdntId,categories,Newcategory)=>{
    let myCategories=[];

    console.log("shit",categories);

    categories.forEach(cate=>{
        if(cate._id==pareIdntId){
            myCategories.push({
                ...cate,
                children:(cate.children && cate.children.length>0) ?  buildNewCategories(pareIdntId,[...cate.children,{
                    pareIdntId:Newcategory._id,
                    name:Newcategory.name,
                    slug:Newcategory.slug,
                    parentId:Newcategory.parentId,
                    children:Newcategory.children,
                }],Newcategory):[]
            })
        }else{
            myCategories.push({
                ...cate,
                children: (cate.children && cate.children.length>0) ? buildNewCategories(pareIdntId,cate.children,Newcategory):[]
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