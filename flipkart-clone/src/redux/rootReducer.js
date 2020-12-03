import {combineReducers} from "redux"
import categoryReducer from "./category/categoryReducer.js"


const rootReducer=combineReducers({
    categoryData:categoryReducer,
})


export default rootReducer