import axios from "axios"
import {LOGIN_REQUEST,LOGIN_SUCCESSED,LOGIN_FAILED,
    USER_LOADED,
    USER_LOAD_FAILED,
    LOGOUT_REQUEST,
    LOGOUT,
    LOGOUT_FAILED,
        DELETE_ACCOUNT,DELETE_ACCOUNT_FAILED,
        REGISTER_USER_REQUEST} from "../actionTyps.js"



//只能admin登录
export const loginAction=(formData)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:LOGIN_REQUEST})
            let config={
                header:{
                    'Content-Type':'application/json'
                }
            }
            let result= await axios.post("/api/admin/signin",formData,config);

            if(result.data.errnum===0){
                dispatch({type:LOGIN_SUCCESSED,payload:result.data.data})
            }else{
                // result.data.messages.forEach(msg=>{
                //     dispatch(setAlert(msg,"danger"))
                // })
                dispatch({type:LOGIN_FAILED,payload:result.data.message})
            }
        }catch(error){
            // dispatch({type:LOGIN_FAILED,payload:result.data.data})
            console.log("error");
        }
    }
}

//每次刷新页面redux的state就回丢失，在app.js 文件中使用这个方法，就可以不丢失state
export const loadUserAction=()=>{
    return async(dispatch)=>{
        let token=localStorage.getItem("token");
        if(token){
            let user=JSON.parse(localStorage.getItem("user"));
            dispatch({type:USER_LOADED,payload:{token,user}})
        }else{
            dispatch({type:USER_LOAD_FAILED,payload:{err:"failed to login"}})
        }
    }
}

export const signoutAction=()=>{
    return async (dispatch) => {
        dispatch({type:LOGOUT_REQUEST})
        //后台清楚掉cookie
        const response = await axios.get("/api/admin/signout")
        //前台清楚掉localStorage
        if (response.data.errnum === 0) {
            localStorage.clear();
            dispatch({type:LOGOUT})
        } else {
            dispatch({type:LOGOUT_FAILED,payload:{error:response.data.data}})
        }

    }
}


