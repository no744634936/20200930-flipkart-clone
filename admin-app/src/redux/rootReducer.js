import {combineReducers} from "redux"
import signupReducer from "./signup/signupReducer.js"
import authenticationReducer from "./authentication/authReducer.js"

const rootReducer=combineReducers({
    signupData:signupReducer,
    loginData:authenticationReducer,

})


export default rootReducer