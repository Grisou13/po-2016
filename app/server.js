var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    app = express();
const { spawn } = require('child_process');
const deepstream = require("deepstream.io-client-js")
const ds = deepstream("localhost:8000").login();
ds.on('error', ( error, event, topic ) =>  console.log("error : ",error, event, topic) );
// TODO: add a database for gods sake

const {User,SessionStatus,Session,SessionList} = require('./helpers')
let sessions = new SessionList();
let games = {
  "algo": {
    "name":"algo",
    "input":"something really awesome",
    "output":"another game",
    "time_limit":600000 //time in ms
  }
};
let users = {

};
var fs = require('fs');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(morgan("combined",{stream:accessLogStream}))
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
app.post("/register",(req,res)=>{

})
app.get("/games/new",(req,res)=>{

})
app.get("/games",(req,res)=>{
  return res.render("games",{games:games})
})
app.get("/sessions",(req,res)=>{
  return res.render("session_list",{sessions:SessionList.sessions});
})
app.post("/api/sessions", (req,res) => {
  let name = "sessions/"+ds.getUid()
  ds.record.getRecord(name).whenReady(() => {
    return res.json({name})
  })
})
ds.event.listen('^new/.*', (eventName, isSubscribed, response) => {
  console.log(eventName) // 'news/sports'
  if (isSubscribed) {

    console.log(response);
    // if () {
    //   response.accept()
    //   // start publishing data via `client.event.emit(eventName, /* data */)`
    // } else {
    //   repsonse.reject() // let deepstream ask another provider
    // }
  } else {
    // stop publishing data
  }
})
ds.event.subscribe("eval/session", data => {
  if(!data.name) return false;
  ds.record.has(data.name, (err,has)=>{
    if(!has) return false;
    let currentSession = ds.record.getRecord(data.name).get();

  })


})
ds.event.subscribe("new/user", data => {
  console.log("new user");
  users[data.id] = data
  console.log(data);
})
ds.event.subscribe("new/session", data => {
  let sess = ds.record.getRecord(data.id)
  if(data.game != null)//if there is no time limit, its a game session
    sess.set({time_limit:games[data.game]["time_limit"]})//TODO refactor this and get a better way to get time
  sess.whenReady(record => {
    setInterval(sess.time_limit);
  })

})
module.exports = app;
