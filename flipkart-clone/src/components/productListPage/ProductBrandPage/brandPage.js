import React, { useEffect,useState} from 'react'
import { getBrandPage } from '../../../redux/page/brandPageAction'
import {useDispatch,useSelector} from "react-redux"
import getUrlParams from '../../../helper/getUrlParams'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../ui/Card/Card';
import "./style.css"
const BrandPage = (props) => {

    
    const dispatch = useDispatch()

    useEffect(() => {
        const params=getUrlParams(props.location.search)
        const payload={
            ...params
        }
        dispatch(getBrandPage(payload))
    }, [])
    const brandPageData=useSelector(state=>state.brandPageData)
    const {title,banners,products}=brandPageData.pageData
    return (
        <>
        <h3>{title}</h3>
        <div style={{margin:"0 10px"}}>
            <Carousel
                renderThumbs={()=>{}}
            >
                {
                    banners&&banners.map((banner,index)=>
                    <a 
                        key={index}
                        //必须写上block a tag才能点
                        style={{display:'block'}}
                        href={banner.navigateTo}
                    >
                        <img src={banner.img} />
                    </a>
                    )
                }
            </Carousel>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '10px 0'
                }}
            >
                {
                    products && products.map((product,index)=>
                        <Card 
                            key={index}
                            style={{
                                width: '400px',
                                height: '200px',
                                margin: '5px'
                            }}
                        >
                            <img style={{
                                width: '100%',
                                height: '100%'
                            }} src={product.img} alt="" />
                        </Card>
                    )
                }
            </div>
        </div>

            {/* {JSON.stringify(brandPageData.pageData)} */}
        </>
    )
}

export default BrandPage
