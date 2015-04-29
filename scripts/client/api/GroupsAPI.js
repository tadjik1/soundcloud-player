import SoundCloudSDK from 'utils/SoundCloudSDK';
import GroupServerActionCreators from 'actions/server/GroupActionCreators';

export default {
  async searchGroups(query) {
    try {
      let groups = await SoundCloudSDK.get(`/groups?q=${query}`);
      GroupServerActionCreators.handleGroupsSuccess(groups, query);
    } catch (err) {
      GroupServerActionCreators.handleGroupsError(err);
    }
  }
};
