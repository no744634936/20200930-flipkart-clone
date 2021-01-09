import React,{useEffect}from 'react'
import Layout from '../../layout/Layout'
import {useDispatch,useSelector} from "react-redux"
import { getProductDetailsById } from '../../../redux/product/productAction'
import "./style.css"
import { MaterialButton } from '../../ui/material/material'
import { AiFillThunderbolt } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';
import { 
    IoIosArrowForward, 
    IoIosStar, 
    IoMdCart 
  } from 'react-icons/io';

const ProductDetailsPage = (props) => {

    const productData = useSelector(state => state.productData)
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(props.match.params.productId);
        const productId=props.match.params.productId
        dispatch(getProductDetailsById(productId))
    }, [props.match.params.productId])

    //用这个来避免errors
    if(Object.keys(productData.productDetails).length===0){
        return null;
    }

    return (
        <Layout>
            {/* <div>{productData.productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                {/* thumbnail */}
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {
                            productData.productDetails.productPictures.map((thumb, index) => 
                                <div className="thumbnail">
                                    <img src={thumb.img} alt={thumb.img} />
                                </div>
                            )
                        }
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                        <img src={productData.productDetails.productPictures[0].img} alt={`${productData.productDetails.productPictures[0].img}`} />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                        <MaterialButton
                            title="ADD TO CART"
                            bgColor="#ff9f00"
                            textColor="#ffffff"
                            style={{
                                marginRight: '5px'
                            }}
                            icon={<IoMdCart />}
                        />
                        <MaterialButton
                            title="BUY NOW"
                            bgColor="#fb641b"
                            textColor="#ffffff"
                            style={{
                            marginLeft: '5px'
                            }}
                            icon={<AiFillThunderbolt />}
                        />
                        </div>
                    </div>
                </div>
                {/* home > category > subCategory > productName */}
                <div className="breed">
                    <ul>
                    <li><a href="#">Home</a><IoIosArrowForward /></li>
                    <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
                    <li><a href="#">Samsung</a><IoIosArrowForward /></li>
                    <li><a href="#">{productData.productDetails.name}</a></li>
                    </ul>
                </div>

                {/* product description */}
                <div className="productDetails">
                    <p className="productTitle">{productData.productDetails.name}</p>
                    <div>
                    <span className="ratingCount">4.3 <IoIosStar /></span>
                    <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                    </div>
                    <div className="extraOffer">Extra <BiRupee />4500 off </div>
                    <div className="flexRow priceContainer">
                        <span className="price"><BiRupee />{productData.productDetails.price}</span>
                        <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
                        {/* <span>i</span> */}
                    </div>
                    <div>
                        <p style={{ 
                            color: '#212121', 
                            fontSize: '14px',
                            fontWeight: '600' 
                            }}>Available Offers</p>
                        <p style={{ display: 'flex' }}>
                            <span style={{
                            width: '100px',
                            fontSize: '12px',
                            color: '#878787',
                            fontWeight: '600',
                            marginRight: '20px'
                        }}>Description</span>
                        <span style={{
                            fontSize: '12px',
                            color: '#212121',
                        }}>{productData.productDetails.description}</span>
                        </p>
                    </div>
                </div>
        
        </div>
        </Layout>
    )
}

export default ProductDetailsPage
