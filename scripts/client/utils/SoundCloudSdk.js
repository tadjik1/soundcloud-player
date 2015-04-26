const defaultParams = {
  limit: 10
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
  },

  async authenticate() {
    return new Promise((resolve, reject) => {
      SC.connect(() => {
        SC.get('/me', (me, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(me);
          }
        });
      });
    });
  }
};
