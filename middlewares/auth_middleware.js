// Middleware wht why and how ?

// wht? 
/**For eg :- If rahul is having some health issue and there is a reputed hospital "Samrat" where he want to meet the DR Ashok but he can't directly meet him between it there are some middlewares like 
 * 1) He need to do registration
 * 2) need to take Some Testes
 * 3) other rquired things 
 * 4) Then and then only he will be able to meet DR ASHOK.
 */


//So middleware is nothing but a function in Node.js which act as middleware between routes and controller to ensure DATA VALIDATION from the postman.

// CLient req through Postman call => app => routes => controller => model => dbs

// So to ensure that the data entered through postman call is valid or not we use middleware between routes and controller

// CLient req through Postman call => app => routes => MIDDLEWARE => controller => model => dbs


/**So middleware is nothing but a function in Node.js which act as a middleware between routes and controller and takes 3 arguments
 * like req,res,next
*/



/** Create a middleware which checks if the req body is proper and correct */


const usermodel = require("../models/user.model");



const verifySignupBody = async (req,res,next)=>{
    try{
        //check for the name
        if(!req.body.name){
           return res.status(400).send({
            message : "Failed !! Name was not provided in request body"
           })
        }

        //check for the email
        if(!req.body.email){
           return res.status(400).send({
            message : "Failed !! Email was not provided in request body"
           })
        }

        //check for the userid
        if(!req.body.userid){
           return res.status(400).send({
            message : "Failed !! Userid was not provided in request body"
           })
        }

        //check if the user with the same userid is already present
        const user = await usermodel.findOne({userid : req.body.userid });

        if(user){
            return res.status(400).send({
                message : "Failed !! Sorry user with that userid already exists"
            })
        }

        next();

    }catch(err){
        console.log("Error while validating the request data",err);

        res.status(500).send({
            message : "Error while validating the request body"
        })
    }
}

const verifysigninbody = (req,res,next)=>{

    try{

        if(!req.body.userid){
            return res.status(400).send({
                message : "user id not provided"
            })
        }
        
        if(!req.body.password){
            return res.status(400).send({
                message : "Password not provided"
            })
        }
        
        next();
    }catch(err){
        req.status(500).send({
            err : "Error while validating the inputs from the user "
        })
    }
}

    

module.exports = {
    verifyData_signup : verifySignupBody ,
    //verifysignupbody object ke andhrr validation ka logic h and VerifyData is that which holds this logic.

    verifyData_signin : verifysigninbody,
}
