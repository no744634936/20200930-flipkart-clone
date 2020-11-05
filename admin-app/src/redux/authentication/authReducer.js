import {
    LOGIN_REQUEST,
    LOGIN_SUCCESSED,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT,
    LOGOUT_FAILED,
    USER_LOADED,
    USER_LOAD_FAILED,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_FAILED
} from "../actionTyps.js"
import setAuthToken from "../../helper/setAuthToken.js"
const initialState={
    token:null,
    user:{},
    isAuthenticated:false,
    loading: false,
    error:"",
    message:"",
}


 const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...initialState
            }
            break;
        case LOGIN_SUCCESSED:
            localStorage.setItem("token",action.payload.token) //放到本地的token包含了用户的信息，需要从token里解析出用户信息
            localStorage.setItem("user",JSON.stringify(action.payload.user))  //将user的信息也放进localStorage.
            setAuthToken(action.payload.token)  //设置全局的header 然后每一个页面就都可以使用这个header了
            return {
                ...initialState,
                isAuthenticated:true, 
                loading:false,
                user: action.payload.user, 
                token:action.payload.token,
            }
            break;
        case USER_LOADED:
            return {
                ...initialState,
                isAuthenticated:true, 
                loading:false,
                user: action.payload.user, 
                token:action.payload.token,
            }
            break;
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading:true,
            }
            break;
        case LOGIN_FAILED:
            return {
                ...state,
                error: action.payload.message,
                loading:false,
            }
            break;
        case LOGOUT:
        case LOGIN_FAILED: 
            return{
                ...initialState,
            }
            break;
        default: return initialState
    }
}

 export  default authReducer