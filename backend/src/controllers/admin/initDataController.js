const initDataModel =require('../../models/admin/initDataModel.js')
class initDataController {


    
    products_data=async (ctx,next)=>{
        let result=await initDataModel.get_product_and_category_data();
        ctx.body= result;
    }
}

module.exports=new initDataController()