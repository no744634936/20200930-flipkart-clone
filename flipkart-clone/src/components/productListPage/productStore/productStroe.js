import React, { useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {getProductBySlug} from "../../../redux/product/productAction.js"
import "./productStore.style.css"
const ProductStore = (props) => {

    const dispatch = useDispatch()
    const productData = useSelector(state => state.productData)
    const [priceRange, setpriceRange] = useState({
        under5k:5000,
        under10k:10000,
        under20k:20000,
        under30k:30000,
    })
    useEffect(()=>{
        //url里面的参数在props里面
        let slug= props.match.params.slug
        console.log(slug);
        dispatch(getProductBySlug(slug))
    },[])
    return (
        <>
            {
                //map
                Object.keys(productData.productsByPrice).map((key,index)=>{
                    return(
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} under {priceRange[key]} </div>
                                <button>view all</button>
                            </div>
                            <div style={{display:"flex"}}>
                                {
                                    productData.productsByPrice[key].map(product=>{
                                        return(
                                            <div className="productContainer">
                                                <div className="productImgContainer">
                                                    <img src={product.productPictures[0].img} alt=""/>
                                                </div>
                                                <div className="productInfo">
                                                    <div>{product.name}</div>
                                                    <div>
                                                        <span>rate</span>
                                                        <span>Sales</span>
                                                    </div>
                                                    <div className="producPrice">{product.price}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductStore
