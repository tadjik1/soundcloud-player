const defaultParams = {
};

export default {
  async get(path, options = {}) {
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
