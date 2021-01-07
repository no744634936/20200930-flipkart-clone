import React, {Fragment,useState,useEffect} from 'react'
import getUrlParams from '../../helper/getUrlParams'
import Layout from '../layout/Layout'
import BrandPage from './ProductBrandPage/brandPage.js'
import ProductStore from './productStore/productStroe'

const ProductListPage=(props)=>{

    const renderContent=(props)=>{
        // console.log("props",props);
        let params=getUrlParams(props.location.search)
        let content=null
        switch(params.type){
            case "store":
                content=<ProductStore {...props}/>
                break;
            case "page":
                content=<BrandPage  {...props}/>
                break;
            default:
                content=null;
        }
        return content;
    }
   return(
       <Layout>
           {renderContent(props)}
       </Layout>
   )
}

export default ProductListPage