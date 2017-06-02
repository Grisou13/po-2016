import AppDispatcher from '../dispatchers/Dispatcher';
import Constants from '../constants/Constants.js';

export default {
  getGame: (id) => {
    AppDispatcher.handleAction({
      type: Constants.GAME_REQUEST,
      data: ...id
    });
  },
  getSessions: (id) => {
    AppDispatcher.handleAction({
      type: Constants.THING_TWO,
      data: data
    });
  }
}
