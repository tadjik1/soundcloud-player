import SoundCloudSDK from '../utils/SoundCloudSDK';
import {
  normalizeUserArrayResponse,
  normalizeUserResponse } from '../utils/APIUtils/user';

export default {
  search(query) {
    return new Promise((resolve, reject) => {
      let promise = SoundCloudSDK.get(`/users.json?q=${query}`);
      promise.then(users => resolve({ response: normalizeUserArrayResponse(users), query }));
      promise.catch(err => reject({ query, err }));
    });
  },

  fetchUser(userId) {
    return new Promise((resolve, reject) => {
      let promise = SoundCloudSDK.get(`/users/${userId}.json`);
      promise.then(user => resolve({ response: normalizeUserResponse(user) }));
      promise.catch(err => reject({ err }));
    });
  }
};
