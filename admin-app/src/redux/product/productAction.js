import axios from "axios"
import {productConstants} from "../actionTyps.js"


export const addProduct=(form)=>{
    return async(dispatch)=>{
        const response=await axios.post("/api/product/create",form)
        console.log(response);
    }
}