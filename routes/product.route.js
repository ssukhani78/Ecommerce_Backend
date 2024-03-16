
const prod_controller = require("../controller/product.controller");
const prod_middleware = require("../middlewares/product_middleware");
const catg_middleware = require("../middlewares/category_middleware");


module.exports = (app)=>{
    /**For Creating new product the URL :-    localhost : 8110/ecom/api/v1/create_product */
    app.post("/ecom/api/v1/create_product",[catg_middleware.tokenverification,catg_middleware.IsAdmin_Check,prod_middleware.Create_Product_reqbody_Verification],prod_controller.create_Prod);
    
    
    /**For getting the existing product the URL :-    localhost : 8110/ecom/api/v1/get_product */
    app.get("/ecom/api/v1/get_product",prod_middleware.get_product_validate,prod_controller.Get_Product);
    
    
    /**For Deleting the existing product the URL :-    localhost : 8110/ecom/api/v1/delete_product */
    app.delete("/ecom/api/v1/delete_product",[catg_middleware.tokenverification,catg_middleware.IsAdmin_Check,prod_middleware.Del_prod_validate],prod_controller.Delete_product);
    
    /**For Updating the existing product the URL :-    localhost : 8110/ecom/api/v1/Update_product */
    app.put("/ecom/api/v1/Update_product",prod_controller.Update_product);
}