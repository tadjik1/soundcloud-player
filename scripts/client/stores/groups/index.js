import Store from '../Store';
import SoundCloudAppDispatcher from '../../dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from '../../constants/SoundCloudAppConstants';

const data = Symbol();

class GroupsStore extends Store {
  constructor() {
    super();

    this[data] = {};
  }

  getById(id) {
    return this[data][id];
  }
}

let groupsStore = new GroupsStore();

groupsStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.FETCHED_TYPE_GROUP:
      // here we can implement our model... extend all instances, for example
      action.data.forEach((group) => {
        groupsStore[data][group.id] = group;
      });
      break;
    default:
      break;
  }
});

export default groupsStore;
