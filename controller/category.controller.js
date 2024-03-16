
const category_model = require("../models/category.model");


exports.create_New_Category = async (req, res) => {

    //Read the request body
    const request_body = req.body;

    //Create the category
    //Check whether it already exists or not
    //If not exists then insert in the database using mongoose
    //Return the response

    const category_obj = {
        name: request_body.name,
        Description: request_body.Description
    }

    try {

        const alreadyexist = await category_model.findOne({ name: req.body.name });

        if (alreadyexist) {
            return res.status(400).send({
                mess: "This Category already exist in Database"
            })
        }

    } catch (err) {
        console.log("Error while finding the category in the database ", err);
        return res.status(500).send({
            mess: "Error while finding the category in the database"
        })
    }

    try {

        const obj_C = await category_model.create(category_obj);

        res.status(201).send(obj_C);

    } catch (err) {
        console.log("error while creating new category :(", err);
        res.status(500).send({
            Error: "Error while creating new category :("
        })
    }


}



exports.getcategory = async (req,res)=>{

    //get the requestbody for the category name
    //find and send the category details if exist else return an error
    try{

        const IsAvailable = await category_model.findOne({name : req.body.name});
        
        if(!IsAvailable){
            return res.status(404).send({
                message : "Category Not found..!!!"
            })
        }
        
        return res.status(200).send(IsAvailable);
    }catch(err){
        console.log("Error in finding the category in the db ",err);

        return res.status(401).send({
            messs : "Error in finding the category in the db"
        })
    }

}



exports.Delete_category = async (req,res)=>{
    //Get the request body for deleting the category
    //find the given category exists or not if exists then delete it and if it doesn't exist then show the error message
    try{

        const categ = await category_model.findOne({name : req.body.name});
        // console.log(categ.name);
        
        if(categ == null){
            return res.status(404).send({
                Message : "Category Not found !!!"
            })
        }
    }catch(err){
        res.status(500).send({
            mess : "error in searching the category"
        })
    }

    try{
        const deleted = await category_model.deleteOne({ name :  req.body.name});

        return res.status(200).send({deletedObject: req.body.name,
             mess : "Category Successfully deleted"});

    }catch(err){
        console.log("Error while deleting the category ",err);

        return res.status(500).send({
            ERROR : "Error while deleting the category"
        })
    }

}



exports.Update_category = async (req,res)=>{
    //Read request body of category from user
        const request_body = req.body;
    // Then find that e=category in the category model
    try{

        const found = await category_model.findOne({"name" : request_body.name});
        //if doesn't exist then return an error message by showing CATEGORY NOT FOUND!!!
        
        if(found==null){
            return res.status(404).send({
                Mess : "Category not found"
            })
        }
    }catch(err){
        console.log("Error searching category",err);
        return res.status(500).send({
            mess : "Error searching category"
        })
    }
    
    //If exist then make the changes in the name passed by the user
    try{
        const updated  = await category_model.updateOne({name : request_body.name} , {$set : {name : request_body.newname}});

        return res.status(200).send({updated ,
            Mess : "Successfully updated the category name :- " + request_body.newname
        });
    }catch(err){
        console.log("error while updation ",err);
        return res.status(500).send({
            Mess : "Error while updating the category"
        })
    }
}