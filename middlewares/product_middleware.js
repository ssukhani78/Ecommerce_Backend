


const create_Productverification = (req,res,next)=>{
    try{

        if(!req.body.name){
            return res.status(404).send({
                required : "Product Name is Required"
            })
        }
        
        
        if(!req.body.Price){
            return res.status(404).send({
                required : "Product Price is not mentioned"
            })
        }
        
        if(!req.body.Quant){
            return res.status(404).send({
                required : "Product Available Quantity is not mentioned"
            })
        }
        
        next();
    }catch(err){
        return res.status(500).send({
            ERROR : "Something went WRONG While Validating the Product Request Body..!! :("
        })
    }
}


const get_product_Validate = (req,res,next)=>{
    try{

        if(!req.body.name){
            return res.status(404).send({
                REQUIRED : "Product Name is REQUIRED to find the product"
            })
        }
        
        next();
    }catch(err){
        console.log("Error while validating the get product details ",err);
        res.status(500).send({
            Error : "Error while validating the get product details"
        })
    }
}

const Delete_prod_Validate = (req,res,next)=>{
    try{

        if(!req.body.name){
            return res.status(404).send({
                Mess : "Product Name is required for deleting the product"
            })
        }
        
        next();
    }catch(err){
        console.log("Something wrong happened while validating the delete product body ",err);
        return res.status(500).send({
            ERROR : "Something wrong happened while validating the delete product body"
        })
    }
}

const update_prod_verify = (req,res,next)=>{
    try{
        if(!req.body.name && !req.body.newname){
            return res.status(404).send({
                Mess : "Product Name and Newname is required for Updating the product"
            })
        }

        if(!req.body.name){
            return res.status(404).send({
                Mess : "Product Name is required for Updating the product"
            })
        }

        if(!req.body.newname){
            return res.status(404).send({
                Mess : "Product Newname is required for Updating the product"
            })
        }

        next();
    }catch(err){
        console.log("Something wrong happened while validating the Update product body ",err);
        return res.status(500).send({
            ERROR : "Something wrong happened while validating the Update product body"
        })
    }
}

module.exports = {
    Create_Product_reqbody_Verification : create_Productverification ,
    get_product_validate : get_product_Validate,
    Del_prod_validate : Delete_prod_Validate,
    update_Prod_validate : update_prod_verify
}