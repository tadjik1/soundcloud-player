import SoundCloudSDK from '../utils/SoundCloudSDK';
import { normalizeUserArrayResponse } from '../utils/APIUtils/user';

export default {
  search(query) {
    return new Promise((resolve, reject) => {
      let promise = SoundCloudSDK.get(`/users?q=${query}`);
      promise.then(users => resolve({ response: normalizeUserArrayResponse(users), query }));
      promise.catch(err => reject({ query, err }));
    });
  }
};
