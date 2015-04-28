import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import CustomRelay from 'utils/CustomRelay';
import { ActionTypes } from 'constants/SoundCloudAppConstants';

export default {
  async doLogin() {
    await CustomRelay.fetch('authenticate');

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.USER_LOGIN
    });
  },

  async getMe() {
    let user = await CustomRelay.fetch('getMe');

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_USER_INFO,
      user: user
    });
  }
};
