import {REGISTER_USER_REQUEST,REGISTER_USER_SUCCESSED,REGISTER_USER_FAILED} from "../actionTyps.js"
 
 const initialState={
     error:null,
     message:"",
     loading:true,
 }


 const signupReducer=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return{
                ...initialState
            }
            break;
        case REGISTER_USER_SUCCESSED:
            return{
                ...initialState,
                loading:false,
                message:"signup sucessed"
            }
            break;
        case REGISTER_USER_FAILED: 
            return{
                ...initialState,
                loading:false,
                error:action.payload
            }
            break;
        default: return initialState
    }
}

 export  default signupReducer