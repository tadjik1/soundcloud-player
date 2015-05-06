import SoundCloudSDK from 'utils/SoundCloudSDK';

export default {
  searchGroups(query) {
    return SoundCloudSDK.get(`/groups?q=${query}`);
  }
};
