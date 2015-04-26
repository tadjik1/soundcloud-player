import SoundCloudAppDispatcher from '../../dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from '../../constants/SoundCloudAppConstants';

export default function (searchStore) {
  searchStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
    switch (action.type) {
      case ActionTypes.UPDATE_QUERY:

        searchStore[data].tracks = tracksStore[data].tracks.merge(action.tracks);
        tracksStore.emitChange();
        break;
      default:
        break;
    }
  });

  return searchStore;
}
