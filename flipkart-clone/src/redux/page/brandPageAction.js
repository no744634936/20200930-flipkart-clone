import axios from "axios"
import {brandPageConstants} from "../actionTypes.js"

export  const getBrandPage=(payload)=>{
    console.log("payload",payload);
    let {cid,type}=payload

    return async(dispatch)=>{

        try {
            let response= await axios.get(`/api/page/${cid}/${type}`)
            console.log("response",response);
            dispatch({type:brandPageConstants.GET_BRAND_PAGE_REQUEST})
            if(response.status=200){
                dispatch({
                    type:brandPageConstants.GET_BRAND_PAGE_SUCCESS,
                    payload: {page:response.data.data.page}
                })
            }else{
                let {err}=response.data
                dispatch({
                    type:brandPageConstants.GET_BRAND_PAGE_FAILED,
                    payload: {err}
                })
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}


