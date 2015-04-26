import { Set } from 'immutable';

import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from 'constants/SoundCloudAppConstants';
import Store from '../Store';

const data = Symbol();

class UsersStore extends Store {
  constructor() {
    super();

    this[data] = {
      users: new Set([])
    };
  };

  getAllUsers() {
    return this[data].users;
  };

  get(id) {
    return this[data].users.filter((user) => user.id === id);
  }
}

let usersStore = new UsersStore();

usersStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_USERS:
      usersStore[data].users = usersStore[data].users.merge(action.users);
      usersStore.emitChange();
      break;
    default:
      break;
  }
});

export default usersStore;
