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

class Savable {
  save = () => {
    let clsName = this.constructor.name;
  }
}

class User {

  constructor(id, name, surname) {
    super();
    this.id = id
    this.name = name
    this.surname= surname
  }
}

class Game {
  constructor() {
    super();
  }
  startSession = (id) => {

  }
  endSession = () => {

  }
  addUser = () => {

  }
  removeUser = () => {

  }
}
class Session {
  constructor(id) {
    //data in session user,time_limit,current_time,status
  }
  start = () =>{

  }
  stop = () => {

  }

}

class SessionList {
  constructor() {
    this.sessions = {};
  }
  appendSession = (session) =>{
    this.sessions[session.id] = session
  }
  removeSession = () =>{

  }
}

class Evaluator {
  constructor(language) {

  }
  evaluate = (script) => {
      return output
  }
  test = (args,expected_output) => {

  }
}
