import Store from '../Store';
import SoundCloudAppDispatcher from '../../dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from '../../constants/SoundCloudAppConstants';

const data = Symbol();

class TracksStore extends Store {
  constructor() {
    super();

    this[data] = {};
  }

  getById(id) {
    return this[data][id];
  }
}

let tracksStore = new TracksStore();

tracksStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.FETCHED_TYPE_TRACK:
      // here we can implement our model... extend all instances, for example
      action.data.forEach((track) => {
        tracksStore[data][track.id] = track;
      });
      break;
    default:
      break;
  }
});

export default tracksStore;
