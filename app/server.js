var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    app = express();

app.use(morgan())
// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname,'../')));
//setup the body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up jade/pug for templating.
app.set('view engine', 'pug');

app.get("/",(req,res)=>{
  return res.render("index")
});
app.post("/builds",(req,res)=>{
  return "ok";
})
app.get("/users",(req,res)=>{

})
//add a user
app.post("/users",(req,res)=>{

})
app.get("/users/:id",(req,res)=>{

});
module.exports = app;
