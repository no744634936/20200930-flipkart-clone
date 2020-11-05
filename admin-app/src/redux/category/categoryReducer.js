import {GET_ALL_CATEGORIES_REQUEST,GET_ALL_CATEGORIES_SUCCESS,GET_ALL_CATEGORIES_FAILED} from "../actionTyps.js"

const initState = {
    categories: [],
    loading: false,
    error:null,
}


const categoryReducer = (state = initState, action)=>{
    switch (action.type) {
        case GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories:action.payload.categories
            }
            break;
        default:
            break;
    }

    return state;
}


export default categoryReducer