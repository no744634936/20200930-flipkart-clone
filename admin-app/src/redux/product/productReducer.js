import {initDataConstants,categoryConstants,productConstants}from "../actionTypes.js"

const initialState={
    products:[],
    loading:false,
}

const productReducer=(state=initialState,action)=>{
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products,
            }
            break;
    }
    return state
}


export  default productReducer
