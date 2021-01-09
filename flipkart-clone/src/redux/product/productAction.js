import axios from "axios"
import {productConstants} from "../actionTypes.js"

export const getProductBySlug=(slug)=>{
    return async(dispatch)=>{
        let response= await axios.get(`/api/products/${slug}`)
        if(response.status=200){
            dispatch({
                type:productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
                payload: response.data
            })
        }else{
            dispatch({
                type:productConstants.GET_PRODUCTS_BY_SLUG_FAILED
            })
        }
    }
}

export const getProductDetailsById=(productId)=>{
    return async(dispatch)=>{
        dispatch({type:productConstants.GET_PRODUCTS_DETAILS_BY_ID_REQUEST})
        let response= await axios.get(`/api/products/productDetails/${productId}`)
        console.log("response",response);
        if(response.status=200){
            dispatch({
                type:productConstants.GET_PRODUCTS_DETAILS_BY_ID_SUCCESS,
                payload: {productDetails:response.data}
            })
        }else{
            dispatch({
                type:productConstants.GET_PRODUCTS_DETAILS_BY_ID_FAILED
            })
        }
    }
}