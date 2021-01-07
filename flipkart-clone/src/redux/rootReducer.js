import {combineReducers} from "redux"
import categoryReducer from "./category/categoryReducer.js"
import brandPageReducer from "./page/brandPageReducer.js"
import productReducer from "./product/productReducer.js"
import authReducer from "./auth/authReducer.js"

const rootReducer=combineReducers({
    categoryData:categoryReducer,
    productData:productReducer,
    brandPageData: brandPageReducer,
    loginData:authReducer,
})


export default rootReducer