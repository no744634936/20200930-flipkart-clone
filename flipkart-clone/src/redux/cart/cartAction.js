import axios from "axios"
import {cartConstans} from "../actionTypes.js"
import store from "../store.js"


export const addToCart=(product)=>{
    return async(dispatch)=>{

        const {cartItems} =store.getState().cartData;
        const quantity=cartItems[product._id] ? parseInt(cartItems[product._id].quantity+1):1
        console.log(quantity);
        cartItems[product._id]={
            ...product,
            quantity,
        }

        //刷新页面之后redux里的数据会丢失，所以要放到localstorage
        localStorage.setItem("cartData",JSON.stringify(cartItems))
        dispatch({
            type:cartConstans.ADD_TO_SUCCESS,
            payload:{cartItems:cartItems},
        })
    }
}


//app.js 文件里有用这个方法，每次刷新页面后，购物车里的数据就不会丢失
export const updateCart=()=>{
    return async(dispatch)=>{
        const cartData=localStorage.getItem("cartData") ?JSON.parse(localStorage.getItem("cartData")):null
        if(cartData){
            dispatch({
                type:cartConstans.ADD_TO_SUCCESS,
                payload:{cartItems:cartData}
            })
        }

    }
}
