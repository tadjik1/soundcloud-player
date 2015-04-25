let defaultParams = {
  limit: 10
};

export default {
  async get(path, options = {}) {
    return new Promise((resolve) => {
      SC.get(path, Object.assign({}, defaultParams, options), (res) => {
        resolve(res);
      });
    });
  }
};
