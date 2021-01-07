
import {userConstants} from "../actionTypes.js"


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
        case userConstants.LOGIN_REQUEST:
            state={
                ...initialState
            }
            break;
        case userConstants.LOGIN_SUCCESSED:
            state= {
                ...initialState,
                isAuthenticated:true,
                loading:false,
                user: action.payload.user,
                token:action.payload.token,
            }
            break;
        case userConstants.USER_LOADED:
            state= {
                ...initialState,
                isAuthenticated:true,
                loading:false,
                user: action.payload.user,
                token:action.payload.token,
            }
            break;
        case userConstants.LOGOUT_REQUEST:
            state= {
                ...state,
                loading:true,
            }
            break;
        case userConstants.LOGIN_FAILED:
            state= {
                ...state,
                error: action.payload.message,
                loading:false,
            }
            break;
        case userConstants.LOGOUT:
        case userConstants.LOGIN_FAILED:
            state={
                ...initialState,
            }
            break;
     }
     return state;
}

 export  default authReducer