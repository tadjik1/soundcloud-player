import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import SoundCloudApiUtils from 'utils/SoundCloudApiUtils';
import { ActionTypes } from 'constants/SoundCloudAppConstants';

export default {
  async getPlaylistsByUser(userId) {
    let playlists = await SoundCloudApiUtils.getPlaylistsByUser(userId);

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_PLAYLISTS,
      playlists: playlists,
      userId: userId
    });
  }
};
