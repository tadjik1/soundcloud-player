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
      user: {
        username: localStorage.getItem('username')
      }
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
      localStorage.setItem(StorageKey, SC.accessToken());
      localStorage.setItem('username', action.user.username);
      userStore.emitChange();
      break;

    case ActionTypes.USER_LOGOUT:
      userStore[data].isLogin = false;
      userStore[data].user = {};
      localStorage.removeItem(StorageKey);
      localStorage.removeItem('username');
      userStore.emitChange();
      break;

    default:
      break;
  }
});

export default userStore;
