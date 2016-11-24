
//check if user is logged in
let user = getParameterByName("user");
if(user){
  client.record.has(user, (err,has) => {
    if(!has) return redirectHome()
  })
}
else{
  redirectHome()
}

//##############
//
//
// Session join
//
//
//#############
(function(){

  let join_sessions = document.querySelectorAll(".join-session");
  if(join_sessions)
  {
    join_sessions.forEach((el)=>{
      let sessionId = el.dataset.session;

    })
  }

}())
//##############
//
//
// Populate session list
//
//
//#############

(function(){
  client.record.getList("sessions").whenReady( sessions => {
    log(sessions.getEntries())
    sessions.getEntries().forEach( session => {
      let games = document.querySelectorAll(".game")
      games.forEach( el => {
        let id = el.id;
        let link = document.createElement("a");
        link.classList.add("game-active game-session")
        let url = addToUrl("game",id,el.href)
        session.listen("status", (status) => {//check for updates and if the session finishes
          if(status == "finished")
            el.removeChild(link)
        })
        if(session.game && session.game == id)
          link.href = addToUrl("session",session.name,url)
        el.appendChild(a)
      })
    })

  })



}())

//##############
//
//
// Session creation
//
//
//#############
(function($){
  let create_session =  document.querySelector("#start-session");
  let game = getParameterByName("game")//just remove the #


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
  let game_links = document.querySelectorAll("a.create-session");

  if(game_links){
    game_links.forEach((el)=>{
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
}(jQuery))
