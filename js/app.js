//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const log = console.log;
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function addToUrl(name,value,url){
  if (!url) {
    url = window.location.href;
  }
  if(!value){
    value = "";
  }
  var separator = (url.indexOf("?")===-1)?"?":"&";
  return url + separator + name + "=" + value;
}
var host = window.location.hostname;
var client = window.client = deepstream(host+':8000').login()
client.on('error', ( error, event, topic ) =>  console.log("error : ",error, event, topic) );
let register = document.querySelector("#register-button")
if(register)
  register.addEventListener('click', e =>{
    //e.preventDefault();
    console.log(e.target);
    const self = e.target;
    let form = document.querySelector(self.dataset.form);
    //modal.modal();
    // let modal = document.createElement("form");
    // let username = document.createElement("input");
    // username.type = "text";
    // modal.appendChild(username);
    // document.appendChild(modal);
    // modal.class="modal modal-new-user";
    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      let users = client.record.getList(`users`);
      let id = `users/${client.getUid()}`;
      let u = {
        id:id,
        name:document.querySelector("input#user-name").value,
        surname:document.querySelector("input#user-surname").value
      };
      // let image = Webcam.snap((data_uri)=>{
      //   let raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
      //   return raw_image_data;
      // }); //http://mycodingtricks.com/javascript/webcam-api/
      client.record.getRecord( id ).set(u);
      users.addEntry(id);
      client.event.emit("new/user",u);
      window.location.assign("/games?user="+id);
    })

  })

(function($){
  let create_session =  document.querySelector("#start-session");
  let game = window.location.hash.substring(1,window.location.hash.length);//just remove the #
  if(create_session)
  {
    create_session.addEventListener("click", (e) => {
      e.preventDefault()
    })
  }
  let join_sessions = document.querySelectorAll(".join-session");
  if(join_sessions)
  {
    join_sessions.forEach((el)=>{
      let sessionId = el.dataset.session;

    })
  }

}(jQuery))
  let user = getParameterByName("user");
if(user){
  client.record.getRecord(user).whenReady(r => {
    if(!r.id) return window.location.pathname == "/" ? false : window.location.assign("/")
  })
}
else{
  log("no user")
}
let createSession = (game = null) => {


  let id = "sessions/"+client.getUid();
  let sessionData = {
    user:getParameterByName("user"),
    game:game,
    status:"pending",
    id:id
  }
  client.record.getRecord(id).set(sessionData);
  client.record.getList("sessions").append(id);
  client.event.emit("new/session",sessionData);
  return id;
}
let game_links = document.querySelectorAll("a.game-link");
log(game_links);
if(game_links){
  game_links.forEach((el)=>{
    console.log(el)
    el.addEventListener("click",(e)=>{
      e.preventDefault();
      let self = e.target;

      session_id = createSession(self.datasert.id);
      let url = addToUrl("session",session_id);
      url = addToUrl("game",self.dataset.id,url);
      self.href=url;
      log(url)
      window.location.assign(url);//add the session id to the url params
    })

  })

}
