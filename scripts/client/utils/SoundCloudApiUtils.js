import SoundCloudSDK from './SoundCloudSDK';

//let utils = {
//  async getPlaylistsByUser(userId) {
//    return await SoundCloudSDK.get(`/users/${userId}/playlists`);
//  }
//};
//
//['tracks', 'users', 'groups'].forEach((type) => {
//  utils['search' + capitalize(type)] = async (params) => {
//    return await SoundCloudSDK.get('/' + type, params);
//  };
//});
//
//// without any checks because it invokes only once now
//function capitalize(str) {
//  return str[0].toUpperCase() + str.slice(1);
//}

export default {
  async getPlaylistsByUser(userId) {
    return await SoundCloudSDK.get(`/users/${userId}/playlists`);
  },

  async searchTracks(params) {
    return await SoundCloudSDK.get('/tracks', params);
  },

  async searchUsers(params) {
    return await SoundCloudSDK.get('/users', params);
  },

  async searchGroups(params) {
    return await SoundCloudSDK.get('/groups', params);
  },

  async authenticate() {
    return await SoundCloudSDK.authenticate();
  }
};

//export default utils;
