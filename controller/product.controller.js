
const productmodel = require("../models/Product.model");

exports.create_Prod = async (req, res) => {
    //read the request body
    const request_body = req.body;

    //Store the request body data
    const Prod_obj = {
        name: request_body.name,
        Descrption: request_body.Descrption,
        Price: request_body.Price,
        Quant: request_body.Quant
    }

    try {

        //Store it in a database 
        const Created = await productmodel.create(Prod_obj);


        //return the response and status
        res.status(200).send(Prod_obj);
    } catch (err) {
        console.log("error while creating new product ", err);
        return res.status(404).send({
            error: "Error while creating new product"
        })
    }
}




exports.Get_Product = async (req, res) => {
    //Read request body from the user.
    //Find that product in the product model
    const prod_found = await productmodel.findOne({ name: req.body.name });
    //if not found then return an error
    if (!prod_found) {
        return res.status(404).send({
            NOT_FOUND: "Product " + req.body.name + " not found !!"
        })
    }
    //if found then return that object
    return res.status(200).send(prod_found)
}


exports.Delete_product = async (req, res) => {
    const prod_found = await productmodel.findOne({ name: req.body.name });

    try {

        const deleted = await productmodel.deleteOne({ name: req.body.name });


        const deleted_item = {
            name: prod_found.name,
            Descrption: prod_found.Descrption,
            Price: prod_found.Price,
            Quant: prod_found.Quant
        }

        console.log("Product Deleted :- " , deleted_item);

        return res.status(200).send({
            Mess: "Deleted Successfully",
            deleted_item
        })
    } catch (err) {
        console.log("Error aagayi bhai :- ",err);
        return res.status(500).send({
            Mess: "Something went wrong while Deleting the product"
        })
    }

}


exports.Update_product = async (req,res)=>{
    //Take the request body
        const request_body = req.body;

        try{

            // if found then update the name to the new name
            const updated = await productmodel.updateOne({name : request_body.name} , {$set : {name : request_body.newname}});
            
            const updated_data = await productmodel.findOne({name : request_body.newname});
            
            return res.status(200).send({
                Mess : "Successfully Updated the Product name",
                updated_data
            })
            
        }catch(err){
            console.log("Error while updating the data ",err);

            return res.status(500).send({
                Mess : "Error while updating the data"
            })
        }
    }