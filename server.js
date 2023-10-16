const express = require('express');
const dotenv = require('dotenv'); //to establish a path to env file || separate secrets with source-code used for colaborative environment
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');



const app = express();
dotenv.config({path : 'config.env'}); 
const PORT = process.env.PORT ||8080 //creating a port variable in config.env

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname)) command is used if ejs present in separate folder

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css"))); //create a vpath /css and use it in project no need to specify full dirname
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})