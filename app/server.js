var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    app = express();
const { spawn } = require('child_process');
const deepstream = require("deepstream.io-client-js")
const client = deepstream("localhost:6020").login();
// TODO: add a database for gods sake


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
app.get("/games/new",(req,res)=>{

})
app.post("/sessions",(req,res)=>{

})

let onUserUpdate = () => {
  
}
client.record.listen('users/.*', (match, isSubscribed, response) => {
  if(!isSubscribed){
    response.accept();
    client.record.getRecord(match)
  }
})
module.exports = app;
