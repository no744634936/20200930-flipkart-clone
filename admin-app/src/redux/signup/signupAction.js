import axios from "axios"
import {REGISTER_USER_REQUEST,REGISTER_USER_SUCCESSED,REGISTER_USER_FAILED} from "../actionTyps.js"



export const signupAction=(formData)=>{


    return async(dispatch)=>{
        try{
            dispatch({type:REGISTER_USER_REQUEST})
            let config={
                header:{
                    'Content-Type':'applicaiton/json'
                }
            }
            let result= await axios.post("/api/admin/signup",formData,config);
            // console.log(result);
            // console.log(result.data.data.token);
            console.log(result);
            if(result.data.errnum===0){
                dispatch({type:REGISTER_USER_SUCCESSED,payload:result.data})
            }else{
                // result.data.messages.forEach(msg=>{
                //     dispatch(setAlert(msg,"danger"))
                // })
                console.log(result.data);
                dispatch({type:REGISTER_USER_FAILED,payload:result.data})
            }
        }catch(error){
            // dispatch({type:LOGIN_FAILED,payload:result.data.data})
            console.log("error");
        }
    }
}