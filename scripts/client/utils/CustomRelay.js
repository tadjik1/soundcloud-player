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
  async fetch(methodName, params = {}) {
    let id = hash(Object.assign({}, {name: methodName}, sortKeys(params)));

    if (!cache[id]) {
      cache[id] = SoundCloudApi[methodName](params);
    }
    return cache[id];
  }
};
