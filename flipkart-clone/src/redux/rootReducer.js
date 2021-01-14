import {combineReducers} from "redux"
import categoryReducer from "./category/categoryReducer.js"
import brandPageReducer from "./page/brandPageReducer.js"
import productReducer from "./product/productReducer.js"
import authReducer from "./auth/authReducer.js"
import cartReducer from "./cart/cartReducer.js"

const rootReducer=combineReducers({
    categoryData:categoryReducer,
    productData:productReducer,
    brandPageData: brandPageReducer,
    loginData:authReducer,
    cartData:cartReducer,
})


export default rootReducer