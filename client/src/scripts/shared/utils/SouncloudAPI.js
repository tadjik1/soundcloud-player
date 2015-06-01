import querystring from 'querystring';
import request from 'superagent';

const SOUNDCLOUDURL = 'http://api.soundcloud.com';

let serializeOptions = (options) => {
  return querystring.stringify(options);
};

let addQuestionMark = (path) => {
  return path.indexOf('?') !== -1 ? path + '&' : path + '?';
};

let params = {};

export default {

  initialize(options = {}) {
    Object.keys(options).forEach((key) => {
      params[key] = options[key];
    });
  },

  get(path, options, cb) {
    const url = SOUNDCLOUDURL + addQuestionMark(path) + serializeOptions(Object.assign({}, options, params));

    request
      .get(url)
      .end((err, res) => cb(res.body, err));
  }

};
