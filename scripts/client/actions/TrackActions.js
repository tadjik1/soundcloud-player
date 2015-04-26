import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import SoundCloudApiUtils from 'utils/SoundCloudApiUtils';
import { ActionTypes } from 'constants/SoundCloudAppConstants';

export default {
  async search(query) {
    let tracks = await SoundCloudApiUtils.searchTracks(query);

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_TRACKS,
      tracks: tracks
    });
  }
};
