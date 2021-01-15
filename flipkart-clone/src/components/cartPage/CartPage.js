import React, {Fragment,useState,useEffect} from 'react'

import Card from "../ui/Card/Card.js"
import Layout from "../layout/Layout.js"
import "./style.css"
import {useDispatch,useSelector} from "react-redux"
import CartItem from './cartItem/CartItem.js'
import { addToCart } from '../../redux/cart/cartAction.js'

const CartPage=(props)=>{
    const cartData = useSelector(state => state.cartData)
    // const cartItems=cartData.cartItems

    //用户变更数量的时候我好修改
    const [cartItems,setCartItems]=useState(cartData.cartItems)
    //有时数据已经取出来，但由于是异步，还没赋值
    //页面就已经加载完毕了，所以这个console.log("cartItems",cartItems);是空
    // console.log("cartItems",cartItems);
    //所以要用 useEffect

    useEffect(()=>{
        setCartItems(cartData.cartItems)
    },[cartData.cartItems])

    const dispatch = useDispatch()
    
    const onQuantityInc=(_id,quantity)=>{
        let {name,price,img,}=cartItems[_id]
        dispatch(addToCart({_id,name,price,img},1))
    }
    const onQuantityDec=(_id,quantity)=>{
        let {name,price,img,}=cartItems[_id]
        dispatch(addToCart({_id,name,price,img},-1))
    }

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
                        <CartItem 
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={onQuantityInc}
                            onQuantityDec={onQuantityDec}
                        ></CartItem>
                    )
                }

            </Card>
            <Card style={{width:'500px'}}>Price</Card>
        </div>
    </Layout>

   )
}

export default CartPage