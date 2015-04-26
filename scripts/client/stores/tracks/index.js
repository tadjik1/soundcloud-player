import { Set } from 'immutable';

import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from 'constants/SoundCloudAppConstants';
import Store from '../Store';

const data = Symbol();

class TracksStore extends Store {
  constructor() {
    super();

    this[data] = {
      tracks: new Set([])
    };
  };

  getAllTracks() {
    return this[data].tracks;
  };
}

let tracksStore = new TracksStore();

tracksStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRACKS:
      tracksStore[data].tracks = tracksStore[data].tracks.merge(action.tracks);
      tracksStore.emitChange();
      break;
    default:
      break;
  }
});

export default tracksStore;
