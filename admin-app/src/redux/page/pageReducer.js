import {pageConstants} from "../actionTypes.js"

const initState={
    error:null,
    loading:false,
    page:{}
}

const pageReducer=(state=initState,action)=>{
    switch(action.type){
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading:true,
            }
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading:false,
            }
            break;
        case pageConstants.CREATE_PAGE_FAILED:
            state = {
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;


    }
    return state;
}



export  default pageReducer