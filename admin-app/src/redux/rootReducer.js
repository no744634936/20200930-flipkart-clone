import {combineReducers} from "redux"
import signupReducer from "./signup/signupReducer.js"
import authenticationReducer from "./authentication/authReducer.js"
import categoryReducer from "./category/categoryReducer.js"
import productReducer from "./product/productReducer.js"

const rootReducer=combineReducers({
    signupData:signupReducer,
    loginData:authenticationReducer,
    categoryData:categoryReducer,
    productData:productReducer,
})


export default rootReducer