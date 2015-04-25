import SoundCloudSdk from './SoundCloudSdk';

export default {
  async getPlaylistsByUser(userId) {
    return await SoundCloudSdk.get(`/users/${userId}/playlists`);
  }
};
