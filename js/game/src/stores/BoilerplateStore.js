import AppDispatcher from '../dispatchers/Dispatcher';
import Constants from '../constants/Constants';
import {EventEmitter} from 'events';

var data = {}

class BoilerplateStore extends EventEmitter {
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

var _BoilerplateStore = new BoilerplateStore();
export default _BoilerplateStore;

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
