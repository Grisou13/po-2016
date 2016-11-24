import AppDispatcher from '../dispatchers/Dispatcher';
import Constants from '../constants/Constants.js';

export default {
  thingOne: (params) => {
    AppDispatcher.handleAction({
      type: Constants.THING_ONE,
      data: data
    });
  },
  thingTwo: (params) => {
    AppDispatcher.handleAction({
      type: Constants.THING_TWO,
      data: data
    });
  }
}
