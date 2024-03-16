
/**
 * category should include :- Name and Descryption of it
 */

const mongoose = require("mongoose");



const category_schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },

    Description : {
        type : String,
        required : true
    }
},{timestamps : true , versionKey : false})


module.exports = mongoose.model("Catergory",category_schema);