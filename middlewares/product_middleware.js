
const product_schema = require("../models/Product.model")

const create_Productverification = async (req, res, next) => {
    try {

        if (!req.body.name) {
            return res.status(404).send({
                required: "Product Name is Required"
            })
        }


        if (!req.body.Price) {
            return res.status(404).send({
                required: "Product Price is not mentioned"
            })
        }

        if (!req.body.Quant) {
            return res.status(404).send({
                required: "Product Available Quantity is not mentioned"
            })
        }

        const exists = await product_schema.findOne({ name: req.body.name });

        if (exists) {
            return res.status(404).send({
                Duplicate: "Product with that name already exists..!!"
            })
        }

        next();
    } catch (err) {
        return res.status(500).send({
            ERROR: "Something went WRONG While Validating the Product Request Body..!! :("
        })
    }
}


const get_product_Validate = (req, res, next) => {
    try {

        if (!req.body.name) {
            return res.status(404).send({
                REQUIRED: "Product Name is REQUIRED to find the product"
            })
        }

        next();
    } catch (err) {
        console.log("Error while validating the get product details ", err);
        res.status(500).send({
            Error: "Error while validating the get product details"
        })
    }
}

const Delete_prod_Validate = async (req, res, next) => {
    try {

        if (!req.body.name) {
            return res.status(404).send({
                Mess: "Product Name is required for deleting the product"
            })
        }

        const prod_found = await product_schema.findOne({ name: req.body.name });
        try {

            console.log(prod_found);

            if (!prod_found) {
                return res.status(404).send({
                    Mess: "Product Not Found..!!!"
                })
            }

        } catch (err) {
            return res.status(404).send({
                Mess: "Somehing went wrong during finding the product"
            })
        }

        next();
    } catch (err) {
        console.log("Something wrong happened while validating the delete product body ", err);
        return res.status(500).send({
            ERROR: "Something wrong happened while validating the delete product body"
        })
    }
}

const update_prod_verify = async (req, res, next) => {
    try {
        if (!req.body.name && !req.body.newname) {
            return res.status(404).send({
                Mess: "Product Name and Newname is required for Updating the product"
            })
        }

        if (!req.body.name) {
            return res.status(404).send({
                Mess: "Product Name is required for Updating the product"
            })
        }

        if (!req.body.newname) {
            return res.status(404).send({
                Mess: "Product Newname is required for Updating the product"
            })
        }

        try {

            // find the product in the model
            const found = await product_schema.findOne({ name: req.body.name });

            // console.log(found);

            // if doesn't exist
            if (!found) {
                return res.status(404).send({
                    mess: "Product Not Found in the model :("
                })
            }

        } catch (err) {
            console.log("Couldn't find Error :- ", err);

            return res.status(500).send({
                Error: "Something went wrong"
            })
        }

        next();
    } catch (err) {
        console.log("Something wrong happened while validating the Update product body ", err);
        return res.status(500).send({
            ERROR: "Something wrong happened while validating the Update product body"
        })
    }
}

module.exports = {
    Create_Product_reqbody_Verification: create_Productverification,
    get_product_validate: get_product_Validate,
    Del_prod_validate: Delete_prod_Validate,
    update_Prod_validate: update_prod_verify
}