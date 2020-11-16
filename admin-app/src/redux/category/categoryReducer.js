import {categoryConstants} from "../actionTyps.js"

const initState={
    categories:[],
    loading:false,
    error:null,
}


const categoryReducer=(state=initState,action)=>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...initState,
                categories:action.payload.categories
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILED:
            state={

            }
    }
    return state;
}

export  default categoryReducer