const express = require("express");
const path = require("path");
require('./db/conn');
const User =require("./models/usermessage");
const hbs =require("hbs"); 
var bodyParser = require('body-parser') 
const  registerPartials  = require("hbs");
const app = express();

const port = process.env.PORT || 12000;

//setting the path
const staticpath = path.join(__dirname,"../public");
const partialspath = path.join(__dirname,"./templates/partials");
const templatespath= path.join(__dirname,"./templates/views");

const views = path.join(__dirname,"views")
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
 app.use(express.static(views))
app.set("view engine","hbs");
app.set("views",templatespath);
hbs.registerPartials(partialspath);





//routing path
app.get("",(req,res)=>{
    res.render("index");

})

app.post("/contact",async(req,res)=>{
    try{
        //res.send(res.body);
        const userData = new User(req.body);
         await userData.save();
         res.status(201).render("index");
       }catch(error){
        res.status(500).send(error)
    }

})


//server create
app.listen(port,()=>{
    console.log(`server is running is port no ${port}`);

})