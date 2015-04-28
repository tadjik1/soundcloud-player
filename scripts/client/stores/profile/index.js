import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from 'constants/SoundCloudAppConstants';
import Store from '../Store';

const data = Symbol();
const StorageKey = 'oauth_token';

class UserStore extends Store {
  constructor() {
    super();

    this[data] = {
      isLogin: localStorage.getItem(StorageKey) ? true : false,
      user: {}
    };
  }

  get(field) {
    return this[data].user[field];
  }

  isLogin() {
    return this[data].isLogin;
  }

  getUserInfo() {
    return this[data].user;
  }
}

let userStore = new UserStore();

userStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      userStore[data].isLogin = true;
      localStorage.setItem(StorageKey, SC.accessToken());
      userStore.emitChange();
      break;

    case ActionTypes.RECEIVE_USER_INFO:
      userStore[data].user = action.user;
      userStore.emitChange();
      break;

    case ActionTypes.USER_LOGOUT:
      userStore[data].isLogin = false;
      userStore[data].user = {};
      localStorage.removeItem(StorageKey);
      userStore.emitChange();
      break;

    default:
      break;
  }
});

export default userStore;
