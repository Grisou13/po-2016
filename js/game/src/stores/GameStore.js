import AppDispatcher from '../dispatchers/Dispatcher';
import Constants from '../constants/Constants';
import {EventEmitter} from 'events';

var data = {}

class GameStore extends EventEmitter {
  getState() {
    return data
  }
  emitChange() {
    this.emit('CHANGE');
  }
  addChangeListener(cb) {
    this.on('CHANGE', cb);
  }
  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}

var _GameStore = new GameStore();
export default _GameStore;

AppDispatcher.register((payload) => {
  var action = payload.action;
  switch(action.type) {
    case Constants.THING_ONE:
      break;
    case Constants.THING_TWO:
      break;
    default:
      break;
  }
});
