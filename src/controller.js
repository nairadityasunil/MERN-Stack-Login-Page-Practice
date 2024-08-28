// Header files
require("./db/connection"); // Including database connection file in the project
const emp_model = require("./models/emp_model"); // Importing employee model

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Process.env.port => will provide dynamic port number on the host server
const hbs = require("hbs"); // For using partials or components in the front end
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({ extended: true }));


// All The necessary paths
// Telling application to use a static folder
const static_path = path.join(__dirname, "../public"); // __dirname returns current directory name
const templates_path = path.join(__dirname, "../templates/views"); // Path for frontend view files
const partials_path = path.join(__dirname, "../templates/partials"); // Path for frontend view files
app.use(express.static(static_path)); // by default it will return index.html if file exists in mentioned folder by that name else nothing
hbs.registerPartials(partials_path); // Registring partials so that they can be sent to the front end along with the views -> Prtials are same as components in Laravel
app.set("view engine", "hbs");
app.set('views', templates_path);


// All Routes Related to register employee
app.get('/register', (req, res) => {
    console.log("Redirecting to Register Page ... ");
    res.render("register");
});

app.post('/save_employee', async(req, res) => {
    try {
        console.log("Saving Employee Details ...");
        const register_emp = new emp_model({
            f_name: req.body.firstName,
            l_name: req.body.lastName,
            department: req.body.department,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password,
        });

        if (register_emp.save()) {
            console.log("Employee Details Saved ...");
            res.send("<script>alert('Employee Details Saved Successfully !!!');window.location.href = '/register'; </script>");
        }
        else {
            console.log("Employee Details Not Saved ...");
            res.send("<script>alert('Employee Details Not Saved !!!');window.location.href = '/register'; </script>");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

// ALl routes related to login
app.get('/login', (req, res) => {
    console.log("Redirecting to Login Page ... ");
    res.render("login");
});

app.post('/authenticate',async(req,res)=>{
    try{
        var in_email = req.body.email;
        var in_password = req.body.password;

        var user = await emp_model.findOne({email : in_email});
        if (user)
        {
            if(in_password === user.password)
            {
                console.log("Login Successfull");
                res.send("<script>alert('Welcome "+user.f_name+" "+user.l_name+" !!!');window.location.href = '/login'; </script>");
            }
            else
            {
                console.log("Invalid Login Credentials");
                res.send("<script>alert('Invalid Login Credentials !!!'); window.location.href = '/login'; </script>");
            }
        }
        else
        {
            console.log("Invalid Login Credentials");
            res.send("<script>alert('Invalid Login Credentials !!!'); window.location.href = '/login'; </script>");
        }
    } catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
});

app.listen(port, () => {
    console.log("Server is running at port no : " + port);
});