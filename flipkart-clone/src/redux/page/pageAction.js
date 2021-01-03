import axios from "axios"
import {productConstants} from "../actionTypes.js"

export const getPage=(payload)=>{

    
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