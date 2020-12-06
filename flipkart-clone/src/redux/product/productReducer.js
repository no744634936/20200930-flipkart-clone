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
    }
    return state
}

export default productReducer
