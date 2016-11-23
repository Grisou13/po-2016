var SessionStatus = {
  STARTED:"started",
  ENDED:"ended",
  QUITED:"quited",
  FINISHED:"finished",
  FAILED:"failed",
  WAITING:"waiting"
}
var users = {};
var games = {};
var sessions = {};

 class User {
  constructor(id, name, surname) {
    this.id = id
    this.name = name
    this.surname= surname
  }
}

 class Game {
  constructor() {
  }
  startSession  (id) {

  }
  endSession () {

  }
  addUser () {

  }
  removeUser () {

  }
}
class Session {
  constructor(id) {
    //data in session user,time_limit,current_time,status
  }
  start () {

  }
  stop ()  {

  }

}

class SessionList {
  constructor() {
    this.sessions = {};
  }
  appendSession (session) {
    this.sessions[session.id] = session
  }
  removeSession () {

  }
}

class Evaluator {
  constructor(language) {

  }
  evaluate (script) {
      return output
  }
  test (args,expected_output) {

  }
}
module.exports = {User, SessionList, Session, Game, SessionStatus}
