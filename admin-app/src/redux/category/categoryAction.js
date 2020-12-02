import axios from "axios"
import {categoryConstants} from "../actionTyps.js"
export const getAllCategories=()=>{
    return async(dispatch)=>{
        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST})
        const response=await axios.get("/api/category/getCategories")
        if(response.status==200){
            const categoryList=response.data.data
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{categories:categoryList},
            })
        }else{
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_FAILED,
                payload:{error:response.data.error} //这个error的表示方法，不知道对不对，先写在这里
            })
        }
    }
}


export const addCategory=(form)=>{
    return async(dispatch)=>{
        dispatch({type:categoryConstants.ADD_NEW_CATEGORIES_REQUEST})

        console.log("form---",form);
        
        const response=await axios.post("/api/category/create",form)
        console.log("create",response);
        if(response.status==200){
            dispatch({
                type:categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
                payload:{category:response.data.data},
            })
        }else{
            dispatch({
                type:categoryConstants.ADD_NEW_CATEGORIES_FAILED,
                payload:response.data.error,
            })
        }
    }
}