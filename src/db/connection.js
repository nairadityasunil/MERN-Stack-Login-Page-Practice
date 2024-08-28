// File for database activities
const mongoose = require("mongoose");


// Connecting with the database
mongoose.connect("mongodb://localhost:27017/employee_db").then(()=>{ // then is used for callback function if the connect function becomes successfull
    console.log("Connection With Employee Database Successfull");
}).catch((e)=>{ // If not successfull then catch will display the error
    console.log(e);
    console.log("Connection With Employee Database Unsuccessfull");
}); // Connect to mongodb server using connection string
