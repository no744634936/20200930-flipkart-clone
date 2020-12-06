import axios from "../../helper/axios.js"
import {initDataConstants,
    categoryConstants,
    productConstants}from "../actionTypes.js"


    
export const getInitialData=()=>{
    return async(dispatch)=>{
        dispatch({type:initDataConstants.GET_ALL_INITIAL_DATA_REQUEST});
        let response=await axios.get("/api/initialData")
        if(response.status==200){
            //注意这里是response.data 不是以前那样的response.data.data
            const{categoryList,productList}=response.data
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{categories:categoryList},
            })
            dispatch({
                type:productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{products:productList}
            })
        }
        console.log(response);
    }
}