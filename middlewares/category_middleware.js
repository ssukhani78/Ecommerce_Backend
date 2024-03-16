// Not added in the route of the category...!!

const jwt = require("jsonwebtoken");
const secret_key = require("../configuration/auth.config");
const usermodel = require("../models/user.model");

const Validate_Category = (req, res, next) => {
    try {

        if (!req.body.name && !req.body.Description) {
            return res.status(400).send({
                ERROR: "Name of the category and its descrption is required"
            })
        }

        if (!req.body.name) {
            return res.status(400).send({
                ERROR: "Name of the category REQUIRED..!!!"
            })
        }

        if (!req.body.Description) {
            return res.status(400).send({
                ERROR: "Description is required for the category"
            })
        }

        next();

    } catch (err) {
        console.log("Error while validating the Category input :(", err);

        return res.status(500).send({
            Mess: "Error while validating the Category input :("
        })
    }
}


const validate_deletebody = (req,res,next)=>{
    try{
        
        if(!req.body.name){
            return res.status(404).send({
                REQUIRED : "Name of the Category is required"
            })
        }
        
        next();
    }catch(err){
        res.status(500).send({
            error : "Error while validating delete request body"
        })
    }
}


const Validate_updateBody = (req,res,next)=>{
    try{

        if(!req.body.name){
            res.status(404).send({
                Error : "Current Category Name is Required..!!"
            })
        }
        
        
        if(!req.body.newname){
            res.status(404).send({
                Error : "New Name for the Category is Required..!!"
            })
        }
        
        next();
    }catch(err){
        console.log("Error while validating the Update request Body ",err);
        res.status(500).send({
            Mess : "Error while validating the Update request Body "
        })
    }
}



const verifyToken = (req, res, next) => {
    //check if the token is present in the header or not
    const token = req.headers['x-access-token'];
    try{ 
        if (!token) {
            return res.status(403).send({
                ERROR: "No token found : Unauthorized"
            })
        }
    }catch(err){
        res.status(500).send({
            Error : "Something wrong happened "
        })
    }


    // If exists then check whether it is valid or not

    jwt.verify(token, secret_key.securitystring, async (err, decoded) => {
        if (err) {
             return res.status(401).send({
                message: "UNAUTHORIZED !!"
            })
        }

        // console.log(( decoded.id )); // for cross verification and understanding purpose

        try {
            const userrr = await usermodel.findOne({ userid: decoded.id })

            if (!userrr) {
                res.status(401).send({
                    message: "Unauthorized, this user for this token doesn't exists"
                })
            }

            req.user = userrr; // set req.user as the user 
            next();

        } catch (err) {
            console.log("Error !! ");
            res.status(500).send({
                ERROR: "SOMETHING IS GOING WRONG"
            })
        }
    })


}


const IsAdmin = (req, res, next) => {
    const USER = req.user;

    console.log(USER);

    if (USER && USER.userType == "ADMIN") {
        next();
    } else {
        res.status(401).send({
            Mess: "Only Admin Users are allowed to access this endpoint"
        })
    }
}


module.exports = {
    Create_validator: Validate_Category,
    Validate_Delete_Body : validate_deletebody,
    Validate_Update_Body : Validate_updateBody,
    tokenverification: verifyToken,
    IsAdmin_Check: IsAdmin
}