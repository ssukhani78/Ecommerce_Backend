/**
 * 1) This will be the starting file of the project so we need to run it on the server so first we will bring "express" dependency
 *  */
const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")

const app = express(); // express is used to create a server and always remember the typeof express is function.

const server_config = require("./configuration/server_config");
const db_config = require("./configuration/db.config");
// console.log(typeof mongoose,typeof express);

const user_module = require("./models/user.model")

// Postman req/data bejj rha h json file mai and App jo h woh node.js prr chal rha h joo sirf js Object smjta h so hamko ekk line likhni pdegi that says :- app use express.json means convert the req into js object 

app.use(express.json()); // Middle-ware 

//This above line means "Dude app whenever uhh get json file uhh have to read it as js object"


/**
 * 3) Create an admin user at the starting of the application if not already present
 */

/**
 * 5) now itzz time to create controller
 */
// connection with mongodb
mongoose.connect(db_config.Db_url); // always keep the customizable things in the configuration

const db = mongoose.connection;

db.on("error",()=>{
    console.log("error while connecting to database");
})

db.once("open",()=>{
    console.log("Succesfully connected with mongo database");

    init(); // 4) initialize the database with admin
})


async function init(){
    //check if user already exists or not .
    try{

        let user = await user_module.findOne({userid : "admin"});
        
        if(user){
            console.log("Admin user already exists");
            return;
        }
    }catch(err){
        console.log("Error while reading the data from database :(",err);
    }

    //if not exists then create a admin user
    try{

        user = await user_module.create({
            name : "umair",
            userid : "admin",
            password : bcryptjs.hashSync("UmairKadmin432",9), // were storing the password in a normal string which is not safe so we tried to encrypt it using dependency
            email : "admin4526@gmail.com",
            userType : "ADMIN"
        })
        
        console.log("Admin created :- ",user);
    }catch(err){
        console.log("Error while creating admin :(");
    }

}   


/** Stich the route to the server */

require("./routes/auth.route")(app); // calling routes and passing "app" as js object
require("./routes/category.route")(app); // Calling the category route by passing "app"[i.e server] as an object
require("./routes/product.route")(app); // calling the product route by passing "app"[i.e server] as an object


/**
 * 2) Start the server 
 * */


app.listen(server_config.PORT , ()=>{
    console.log("Server started at port no. :- ",server_config.PORT);
})