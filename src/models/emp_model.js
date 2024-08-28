// Model of the emp_table
const mongoose = require("mongoose");

// Defining structure of the table
const emp_table = new mongoose.Schema({
    f_name:{
        type:String,
        required:true
    },
    l_name:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});

// creating collection
const emp_model = new mongoose.model("emp_details", emp_table); // Creates a Mongoose model named employees using the emp_table schema.
module.exports = emp_model; // making it available for import in other files.