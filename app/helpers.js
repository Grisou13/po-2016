var SessionStatus = {
  STARTED:"started",
  ENDED:"ended",
  QUITED:"quited",
  FINISHED:"finished",
  FAILED:"failed",
  WAITING:"waiting"
}
var

class User {

  constructor(id, username) {
    super();
    this.id = id
    this.username = username
  }
}
class Game {
  constructor() {
    super();
  }
  startSession = () => {

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

  }
  appendSession = () =>{

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
