import SoundCloudAppDispatcher from '../dispatcher/SoundCloudAppDispatcher';
import SoundCloudApiUtils from '../utils/SoundCloudApiUtils';
import { ActionTypes } from '../constants/SoundCloudAppConstants';

export default {
  async search(query) {
    let users = await SoundCloudApiUtils.searchUsers(query);

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_USERS,
      users: users
    });
  }
};
