import SoundCloudAppDispatcher from '../dispatcher/SoundCloudAppDispatcher';
import SoundCloudApiUtils from '../utils/SoundCloudApiUtils';
//import { ActionTypes } from '../constants/SoundCloudAppConstants';

export default {
  async getPlaylistsByUser(userId) {
    let playlists = await SoundCloudApiUtils.getPlaylistsByUser(userId);

    SoundCloudAppDispatcher.dispatch({
      type: 'GET_PLAYLISTS_BY_USER', //ActionTypes.GET_PLAYLISTS_BY_USER
      playlists: playlists,
      userId: userId
    });
  }
};
