/** 
 * Post request for creating category project :- with url 
 *              
 *          localhost : 8110/ecom/api/v1/categories
 */

const categ_controller = require("../controller/category.controller");
const categ_middleware = require("../middlewares/category_middleware");

module.exports = (app)=>{
    app.post("/ecom/api/v1/categories",[categ_middleware.tokenverification,categ_middleware.IsAdmin_Check],[categ_middleware.Create_validator],categ_controller.create_New_Category);
    
                            // OR
    // app.post("/ecom/api/v1/categories",[categ_middleware.tokenverification,categ_middleware.IsAdmin_Check,categ_middleware.Create_validator],categ_controller.create_New_Category);



    /** Get Category using URL :-  localhost : 8110/ecom/api/v1/get_categories*/
    app.get("/ecom/api/v1/get_categories",[categ_middleware.tokenverification,categ_middleware.validate_Get_catg_body],categ_controller.getcategory);


    /**Delete category using url :-   localhost : 8110/ecom/api/v1/delete_category */
    app.delete("/ecom/api/v1/delete_category",[categ_middleware.tokenverification,categ_middleware.IsAdmin_Check,categ_middleware.Validate_Delete_Body],categ_controller.Delete_category);
    
    /**Update category using url :-   localhost : 8110/ecom/api/v1/update_category */
    app.put("/ecom/api/v1/update_category",[categ_middleware.tokenverification,categ_middleware.IsAdmin_Check,categ_middleware.Validate_Update_Body],categ_controller.Update_category);
}

//Note :- Customer can only get the category details and for getting the category detail he/she should have token 
// whereas the ADMIN can create category , delete category and can update category but the admin also should have token for it