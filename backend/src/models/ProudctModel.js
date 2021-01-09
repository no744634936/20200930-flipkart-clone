const slugify=require("slugify")
const Products = require("../db/product.js")
const Categories =require("../db/category.js")


class ProductModel{


    createProduct = async (name, price, description,quantity, category, createdBy,test,productPictures) => {
        const newProduct = new Products({
            name,
            quantity,
            category,
            slug: slugify(name),
            price,
            description,
            productPictures,
            category,
            createdBy,
            test,
        })
        let response = await newProduct.save();
        return response;
    }

    getProductsBySlug=async(slug)=>{

        let category= await Categories.findOne({slug:slug}).select("_id");
       console.log(category);
        let products={}
        if(category){
            products=await Products.find({category:category._id});
        }
        if(products.length>0){
            return {
                products,
                productsByPrice:{
                    under5k:products.filter(product=>product.price<=5000),
                    under10k:products.filter(product=>product.price<=10000),
                    under20k:products.filter(product=>product.price>10000 && product.price<=20000),
                    under30k:products.filter(product=>product.price>20000 && product.price<=30000),
                }
            }
        }else{
            return {}
        }
    }

    getProductDetailsById=async(productId)=>{
       let response=await Products.find({_id:productId});
       return response[0];
        
    }

}

module.exports=new ProductModel()