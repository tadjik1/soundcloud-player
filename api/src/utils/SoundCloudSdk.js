import SC from './SouncloudAPI';

const defaultParams = {
  limit: 10
};

export default {
  get(path, options = {}) {
    return new Promise((resolve, reject) => {
      SC.get(path, Object.assign({}, defaultParams, options), (res, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
};
