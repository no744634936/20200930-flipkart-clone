import axios from "../../helper/axios.js"
import {productConstants} from "../actionTypes.js"


export const addProduct=(form)=>{
    return async(dispatch)=>{
        const response=await axios.post("/api/product/create",form)
        console.log(response);
    }
}