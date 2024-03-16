
const mongoose = require("mongoose");


const Prod_schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        Unique : true
    },
    Descrption : {
        type : String,
        required : true,
        minLength : 10
    },
    Price : {
        type : Number,
        required : true
    },
    Quant :{
        type : Number
    }
},{timestamps : true,versionKey : false});


module.exports = mongoose.model("Product",Prod_schema);