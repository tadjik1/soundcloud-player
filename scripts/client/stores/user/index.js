import SoundCloudAppDispatcher from '../../dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from '../../constants/SoundCloudAppConstants';
import Store from '../Store';

const data = Symbol();

class UserStore extends Store {
  constructor() {
    super();

    this[data] = {
      isLogin: false,
      user: {}
    };
  };

  get(field) {
    return this[data].user[field];
  };

  isLogin() {
    return this[data].isLogin;
  };
}

let userStore = new UserStore();

userStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      userStore[data].isLogin = true;
      userStore[data].user = action.user;
      userStore.emitChange();
      break;

    case ActionTypes.USER_LOGOUT:
      userStore[data].isLogin = false;
      userStore[data].user = {};
      userStore.emitChange();
      break;

    default:
      break;
  }
});

export default userStore;
