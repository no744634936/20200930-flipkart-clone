import axios from "../../helper/axios.js"
import {pageConstants} from "../actionTypes.js"


export const createPage=(form)=>{
    return async(dispatch)=>{
        dispatch({type:pageConstants.CREATE_PAGE_REQUEST})
        try{
            const response=await axios.post("/api/page/create",form);
            if(response.status===200){
                dispatch({
                    type:pageConstants.CREATE_PAGE_SUCCESS,
                    payload:{page:response.data.page}
                })
            }else{
                dispatch({
                    type:pageConstants.CREATE_PAGE_FAILED,
                    payload:{error:response.data.error},
                })
            }
        }catch(error){
            dispatch({
                type:pageConstants.CREATE_PAGE_FAILED,
                // payload:{error:response.data.error},
            })
            console.log(error);
        }
    }
}