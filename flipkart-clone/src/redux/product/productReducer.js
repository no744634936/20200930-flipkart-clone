import {productConstants} from "../actionTypes.js"

const initState={
    products:[],
    productsByPrice:{
        under5k:[],
        under10k:[],
        under20k:[],
        under30k:[],
    },
    loading:false,
    error:null,
    productDetails:{}
}

const productReducer = (state=initState,action) => {
    switch(action.type){
        case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
            state={
                ...state,
                products:action.payload.products,
                productsByPrice:{
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstants.GET_PRODUCTS_DETAILS_BY_ID_REQUEST:
            state={
                ...state,
                loading:true,
            }
            break;
        case productConstants.GET_PRODUCTS_DETAILS_BY_ID_SUCCESS:
            state={
                ...state,
                loading:false,
                productDetails:action.payload.productDetails
            }
            break;
        case productConstants.GET_PRODUCTS_DETAILS_BY_ID_FAILED:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
    }
    return state
}

export default productReducer
