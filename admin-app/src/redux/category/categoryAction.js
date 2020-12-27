import axios from "../../helper/axios.js"
import {categoryConstants} from "../actionTypes.js"
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

    for (const [key, value] of form.entries()) {
        console.log(`${key}: ${value}`);
    }

    return async(dispatch)=>{
        dispatch({type:categoryConstants.ADD_NEW_CATEGORIES_REQUEST})

        try {
            // console.log("form---",form);
            // console.log("axios token",axios.defaults.headers.common["Authorization"]);
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
            
        } catch (error) {
           alert(error)
        }

    }
}



export const updateCategories=(form)=>{
        for (const [key, value] of form.entries()) {
            console.log(`${key}: ${value}`);
        }

    return async(dispatch)=>{
        const response=await axios.post("/api/category/updateCategories",form)
        console.log("create",response);
        if(response.status==201){
            console.log(response);
        }else{
            console.log(response);
        }
    }
}


export const deleteCate=(ids)=>{
    return async(dispatch)=>{
        //不能直接传数组ids，只能传object
        const response=await axios.post("/api/category/deleteCategories",{
            payload:{ids}
        })
        console.log("delete",response);

        if(response.status=201){
            return true
        }else{
            return false
        }
    }
}
