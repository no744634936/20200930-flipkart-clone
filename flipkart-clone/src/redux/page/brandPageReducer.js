import {brandPageConstants} from "../actionTypes.js"

const initState={
    loading:false,
    pageData:{},
    error:null,
}

const brandPageReducer = (state=initState,action) => {
    switch(action.type){
        case brandPageConstants.GET_BRAND_PAGE_REQUEST:
            state={
                ...state,
                loading:true,
            }
            break;
        case brandPageConstants.GET_BRAND_PAGE_SUCCESS:
            state={
                ...state,
                pageData:action.payload.page,
                loading:false
            }
            break;
        case brandPageConstants.GET_BRAND_PAGE_FAILED:
            state={
                ...state,
                loading:false,
                error:action.payload.err
            }
            break;
    }
    return state
}

export default brandPageReducer
