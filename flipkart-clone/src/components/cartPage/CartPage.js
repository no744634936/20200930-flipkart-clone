import React, {Fragment,useState,useEffect} from 'react'

import Card from "../ui/Card/Card.js"
import Layout from "../layout/Layout.js"
import "./style.css"
import {useDispatch,useSelector} from "react-redux"
const CartPage=(props)=>{
    const cartData = useSelector(state => state.cartData)
    const cartItems=cartData.cartItems
   return(
    <Layout>
        <div className="cartContainer">
            <Card
                      headerLeft={`My Cart`}
                      headerRight={<div>Deliver to</div>}
                      style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
            >
                {
                    Object.keys(cartItems).map((key,index)=>
                        <div className="flexRow">
                            <div className="cartProductContainer">
                                <img src={cartItems[key].img} alt=""/>
                            </div>
                            <div className="cartItemDetails">
                                <div>
                                    name:{cartItems[key].name} 
                                    quantity: {cartItems[key].quantity}
                                </div>
                                <div> 
                                    delivery in 3-5 days
                                </div>
                            </div>
                        </div>
                    )
                }

            </Card>
            <Card style={{width:'500px'}}>Price</Card>
        </div>
    </Layout>

   )
}

export default CartPage