/** It's time to create route after creating a logic for User Or after controller 
 * 
 * route ~ Intercept the request
*/


/**
 * POST localhost : 8110/ecom/api/v1/auth/signup
 * 
 * I want to intercept this request
 */

// In the whole process app is the main player/ big boss cuz :-

// In our case using express we created app so "app" is a main player or big boss of the game

/** client request deta h toh sabse pahele big boss mtlb App req letaa h pahele firr wohh deta h route ko then route deta h conttoller ko then controller detaa model ko aurr firr model database sai data nikal krr return krta h */

// conclusion :- App => route => controller => model => Database then  db returns => controller returns => route returns => app 


// Client request => App request => route request => controller request=> model request=> Database then returns => controller then returns => route then returns => app then returns => client

const auth_controller = require("../controller/auth.controller"); // C:\Users\91903\OneDrive\Desktop\Backend_21_Days\ecommerce_project\server.js
const auth_MW = require("../middlewares/auth_middleware");

module.exports = (app)=>{ //app takes the client req so app is the main player over here.!
//     app.post("/ecom/api/v1/auth/signup", toh hand over krr dena)

        app.post("/ecom/api/v1/auth/signup",[auth_MW.verifyData_signup],auth_controller.signup);

        /**Route for sigin
         * localhost : 8110/ecom/api/v1/auth/signin
         */
        app.post("/ecom/api/v1/auth/signin",[auth_MW.verifyData_signin],auth_controller.signin);
}
