import {cartConstans} from "../actionTypes.js"

const initState={
    cartItems:{
        // 123:{
        //     _id:'123',
        //     name:"glax 11",
        //     img :"some.jpg",
        //     price:200,
        //     quantity:20,

        // }
    },
    loading:false,

}


const cartReducer=(state=initState,action)=>{
    switch(action.type){
        case cartConstans.ADD_TO_SUCCESS:
            state={
                ...state,
                cartItems:action.payload.cartItems
            }
            break;
    }
    return state;
}

export  default cartReducer