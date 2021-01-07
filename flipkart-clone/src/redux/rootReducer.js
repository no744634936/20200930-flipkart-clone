import {combineReducers} from "redux"
import categoryReducer from "./category/categoryReducer.js"
import brandPageReducer from "./page/brandPageReducer.js"
import productReducer from "./product/productReducer.js"

const rootReducer=combineReducers({
    categoryData:categoryReducer,
    productData:productReducer,
    brandPageData:brandPageReducer,
})


export default rootReducer