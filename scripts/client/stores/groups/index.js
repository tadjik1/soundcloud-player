import EntityStore from '../EntityStore';
import SoundCloudAppDispatcher from '../../dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from '../../constants/SoundCloudAppConstants';

const data = Symbol();

class GroupsStore extends EntityStore {
  constructor() {
    super();

    this[data] = {
      data: {}
    };
  }

  getData() {
    return this[data];
  }
}

let groupsStore = new GroupsStore();

groupsStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_GROUPS:
      action.data.forEach((item) => {
        groupsStore.getData().data[item.id] = item;
      });
      groupsStore.emitChange();
      break;
    default:
      break;
  }
});

export default groupsStore;
