import axios from "../../helper/axios.js"
import {userConstants} from "../actionTypes.js"



//只能admin登录
export const loginAction=(formData)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:userConstants.LOGIN_REQUEST})

            let result= await axios.post("/api/signin",formData);

            //result.data.errnum===0 也可以写成result.status===200
            if(result.data.errnum===0){
                localStorage.setItem("token",result.data.data.token) //放到本地的token包含了用户的信息，需要从token里解析出用户信息
                localStorage.setItem("user",JSON.stringify(result.data.data.user))  //将user的信息也放进localStorage.
                dispatch({type:userConstants.LOGIN_SUCCESSED,payload:result.data.data})
            }else{
                // result.data.messages.forEach(msg=>{
                //     dispatch(setAlert(msg,"danger"))
                // })
                dispatch({type:userConstants.LOGIN_FAILED,payload:result.data.message})
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
            dispatch({type:userConstants.USER_LOADED,payload:{token,user}})
        }else{
            dispatch({type:userConstants.USER_LOAD_FAILED,payload:{err:"failed to login"}})
        }
    }
}

export const signoutAction=()=>{
    return async (dispatch) => {
        dispatch({type:userConstants.LOGOUT_REQUEST})
        //后台清楚掉cookie
        const response = await axios.get("/api/admin/signout")
        //前台清楚掉localStorage
        if (response.data.errnum === 0) {
            localStorage.clear();
            dispatch({type:userConstants.LOGOUT})
        } else {
            dispatch({type:userConstants.LOGOUT_FAILED,payload:{error:response.data.data}})
        }

    }
}


