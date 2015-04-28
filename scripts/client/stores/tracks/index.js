import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from 'constants/SoundCloudAppConstants';
import EntityStore from '../EntityStore';

const data = Symbol();

class TracksStore extends EntityStore {
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

let tracksStore = new TracksStore();

tracksStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRACKS:
      action.data.forEach((item) => {
        tracksStore.getData().data[item.id] = item;
      });
      tracksStore.emitChange();
      break;
    default:
      break;
  }
});

export default tracksStore;
