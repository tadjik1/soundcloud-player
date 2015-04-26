import Store from '../Store';
import SoundCloudAppDispatcher from '../../dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from '../../constants/SoundCloudAppConstants';

const data = Symbol();

class UsersStore extends Store {
  constructor() {
    super();

    this[data] = {};
  }

  getById(id) {
    return this[data][id];
  }
}

let usersStore = new UsersStore();

usersStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.FETCHED_TYPE_USER:
      // here we can implement our model... extend all instances, for example
      action.data.forEach((user) => {
        usersStore[data][user.id] = user;
      });
      break;
    default:
      break;
  }
});

export default usersStore;
