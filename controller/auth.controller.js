/**
 * i need to write the controller / 
 *          OR
 * Logic to Register a user 
 */


// So we know that in this the client "REQUEST" for something and the server "RESPOND" to it. So it is also known as Request Response Cycle.

// so basically yeah jo controller h uske pass donoo ka control hona chhaiye like "Client req" and "Server response".

//Here ,the "signup" is not the reserved keyword we can use any meaningful word instead of it

const bcrypt = require("bcryptjs");
const usermodel = require("../models/user.model");

const jwt = require("jsonwebtoken");
const secret = require("../configuration/auth.config");

exports.signup = async (req, res) => {

    /**
     * Logic to create the user
     */

    //1. Read the request body.
    const request_body = req.body; // This will get me the request body of JS Object.
    // so "req.body" gives the JS OBJECT.


    //2. After that , we have to Insert data in the Users Colletion in Mongodb.
    const userobj = {
        name: request_body.name,
        userid: request_body.userid,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8), // 8 act as a salting 
        email: request_body.email
    }

    try {
        const user_created = await usermodel.create(userobj);

        /**
         *  Succesfully created then return the response
         */

        // we don't want to display the password as it is sensitive info that must be hidden so uskee liye ekk dusra object banaya h joo sirf basic details user ko display kregaa if data is accepted
        const resp_obj = {
            name: user_created.name,
            userid: user_created.userid,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }

        res.status(201).send(resp_obj); // 201 indicates the something has been successfully created and then we have returned it to user

    } catch (err) {
        console.log("Error while registering the user :(");

        res.status(500).send({
            message: "Some error happened while registering the user"
        });//500 indicates some kindaaa "internal server error"
    }

    //3. Returns the response back to the user.
}




exports.signin = async (req, res) => {
    //1 check the provided userid already exists or not in our dbs
    const user = await usermodel.findOne({ userid: req.body.userid });

    if (user == null) {
        return res.status(400).send({
            message: "User id not valid"
        })
    }

    //2 Check the password entered match the password in the database or not
    const checkpassword = bcrypt.compareSync(req.body.password, user.password);
    /** This inbuild comparesync function converts the password entered into encryption and then it compares the password with the password of that user in the database */

    //for checking pass only 1 way is that :- convert the entered password into encryption then compare that encypted entered pass with the encrypted pass in the database.

    if (!checkpassword) {
        return res.status(401).send({
            message: "Invalid password Entered"
        })
    }

    //3 If all the above are done and perfect then give the access token with some TTL(time to live ~ Expiry time).

    const token = jwt.sign({id : user.userid }, secret.securitystring, {
        expiresIn: 180 //60 seconds which means 1 min is the expiry time fot the webtoken
    })

    res.status(200).send({
        name: user.name,
        userid: user.userid,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}






