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
} from "../actionTypes.js"


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
            state={
                ...initialState
            }
            break;
        case LOGIN_SUCCESSED:
            state= {
                ...initialState,
                isAuthenticated:true,
                loading:false,
                user: action.payload.user,
                token:action.payload.token,
            }
            break;
        case USER_LOADED:
            state= {
                ...initialState,
                isAuthenticated:true,
                loading:false,
                user: action.payload.user,
                token:action.payload.token,
            }
            break;
        case LOGOUT_REQUEST:
            state= {
                ...state,
                loading:true,
            }
            break;
        case LOGIN_FAILED:
            state= {
                ...state,
                error: action.payload.message,
                loading:false,
            }
            break;
        case LOGOUT:
        case LOGIN_FAILED:
            state={
                ...initialState,
            }
            break;
     }
     return state;
}

 export  default authReducer