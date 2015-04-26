import SoundCloudSdk from './SoundCloudSdk';

export default {
  async getPlaylistsByUser(userId) {
    return await SoundCloudSdk.get(`/users/${userId}/playlists`);
  },

  async searchTracks(query) {
    return await SoundCloudSdk.get('/tracks', { q: query });
  },

  async searchUsers(query) {
    return await SoundCloudSdk.get('/users', { q: query });
  },

  async authenticate() {
    return await SoundCloudSdk.authenticate();
  }
};
