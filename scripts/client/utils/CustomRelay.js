import SoundCloudApi from 'utils/SoundCloudApiUtils';
import hash from 'object-hash';

/**
 * cache = {
 *  hash: {
 *    status: 'pending'|'failed'|'success',
 *    data: JSON,
 *    receiveDate: Date,
 *    expired?: Number
 *  }
 * }
 * */

let cache = {};
let sortKeys = (obj) => {
  let keys = Object.keys(obj).sort(),
      newObj = {};

  keys.forEach((key) => newObj[key] = obj[key]);
  return newObj;
};

export default {
  pending: {},

  checkCache(methodName, params = {}) {
    let id = this.calcHash(methodName, params);

    return !!cache[id];
  },

  async fetch(methodName, params = {}) {
    let id = this.calcHash(methodName, params),
        res;

    if (!cache[id]) {
      if (!this.pending[id]) {
        this.pending[id] = SoundCloudApi[methodName](params);
      }
      console.log(this.pending[id]);
      res = await this.pending[id];
      delete this.pending[id];

      cache[id] = {
        data: res.map ? res.map((item) => {
          return item.id;
        }) : res
      };
    }
    return res;
  },

  fetchImmediately(methodName, params = {}) {
    let id = this.calcHash(methodName, params);
    let results = [];

    if (cache[id]) results = cache[id].data;

    return results;
  },

  calcHash(methodName, params) {
    return hash(Object.assign({}, {name: methodName}, sortKeys(params)));
  }

};
