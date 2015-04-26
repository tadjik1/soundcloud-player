import SoundCloudAppDispatcher from 'dispatcher/SoundCloudAppDispatcher';
import SoundCloudApiUtils from 'utils/SoundCloudApiUtils';
import { ActionTypes } from 'constants/SoundCloudAppConstants';

export default {
  async doLogin() {
    let user = await SoundCloudApiUtils.authenticate();

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.USER_LOGIN,
      user: user
    });
  }
};
