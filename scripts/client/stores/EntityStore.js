import Store from './Store';
import { convertQueryParamsToString } from 'utils/funcs';

export default class EntityStore extends Store {
  constructor() {
    super();
  }

  searchByQuery(params) {
    return this.getData().searchQueries.get(convertQueryParamsToString(params));
  }

  checkSearchedByQuery(params) {
    return this._data.searchQueries.has(convertQueryParamsToString(params));
  }

  getByIds(arr) {
    let data = this.getData().data;

    return arr.map((id) => {
      return data[id];
    });
  }

}
