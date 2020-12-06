import {combineReducers} from "redux"
import categoryReducer from "./category/categoryReducer.js"
import productReducer from "./product/productReducer.js"

const rootReducer=combineReducers({
    categoryData:categoryReducer,
    productData:productReducer,
})


export default rootReducer