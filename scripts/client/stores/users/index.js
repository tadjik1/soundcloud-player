import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from 'constants/SoundCloudAppConstants';
import EntityStore from '../EntityStore';

const data = Symbol();

class UsersStore extends EntityStore {
  constructor() {
    super();

    this[data] = {
      data: {}
    };
  };

  getAllUsers() {
    return this[data].users;
  };

  get(id) {
    return this[data].users.filter((user) => user.id === id);
  }

  getData() {
    return this[data];
  }
}

let usersStore = new UsersStore();

usersStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_USERS:
      console.log('receiving...users', action.data);
      action.data.forEach((item) => {
        usersStore.getData().data[item.id] = item;
      });
      console.log(usersStore.getData().data);
      usersStore.emitChange();
      break;
    default:
      break;
  }
});

export default usersStore;

