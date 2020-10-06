const slugify=require("slugify")
const Products = require("../db/product.js")

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

}

module.exports=new ProductModel()