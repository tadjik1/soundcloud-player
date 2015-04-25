export default {
  async get(path) {
    console.log(path);
    return [{a: 1}, {b: 2}];
  }
};
