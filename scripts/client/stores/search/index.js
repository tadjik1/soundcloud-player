import Store from '../Store';
import { Set } from 'immutable';
import { DataTypes } from '../../constants/SoundCloudAppConstants';
import SoundCloudAppDispatcher from '../../dispatcher/SoundCloudAppDispatcher';
import { ActionTypes } from '../../constants/SoundCloudAppConstants';

import UsersStore from '../users/';
import TracksStore from '../tracks/';
import GroupsStore from '../groups/';

const data = Symbol();

const TYPES = [
  DataTypes.TYPE_TRACK,
  DataTypes.TYPE_USER,
  DataTypes.TYPE_GROUP
];

let TYPE_STORES = {};

TYPE_STORES[DataTypes.TYPE_TRACK] = TracksStore;
TYPE_STORES[DataTypes.TYPE_USER] = UsersStore;
TYPE_STORES[DataTypes.TYPE_GROUP] = GroupsStore;

class SearchStore extends Store {
  constructor() {
    super();

    this[data] = {
      // actually, it could be implemented as array of plain strings
      // but this structure is a bit more flexible
      searchEntities: new Set([
        {
          type: DataTypes.TYPE_TRACK,
          text: 'Tracks'
        },
        {
          type: DataTypes.TYPE_USER,
          text: 'Users'
        },
        {
          type: DataTypes.TYPE_GROUP,
          text: 'Groups'
        }
      ]),
      queryParams: TYPES.reduce((p, c) => {
        p[c] = {
          q: ''
        };

        // we have to extend if constant.TYPE_TRACK, but not now

        return p;
      }, {}),
      type: DataTypes.TYPE_TRACK,
      // quite strange construction, but it is a bit more flexible
      // (if we decide to switch from plain array to any other data structure, for instance)
      results: TYPES.reduce((p, c) => {
        p[c] = [];

        return p;
      }, {})
    };
  }

  getSearchEntities() {
    return this[data].searchEntities;
  }

  getQueryParams() {
    return this[data].queryParams;
  }

  getType() {
    return this[data].type;
  }

  getResults() {
    return this[data].results[this[data].type].map((id) => {
      return TYPE_STORES[this[data].type].getById(id);
    });
  }
}

let searchStore = new SearchStore();

searchStore.dispatchToken = SoundCloudAppDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_QUERY:
      TYPES.forEach((type) => {
        searchStore[data].queryParams[type].q = action.query;
      });
      searchStore.emitChange();
      break;
    case ActionTypes.UPDATE_TYPE:
      searchStore[data].type = action.newType;
      searchStore.emitChange();
      break;
    case ActionTypes.RECEIVE_RESULTS:
      searchStore[data].results[action.dataType] = action.results;
      searchStore.emitChange();
      break;
    default:
      break;
  }
});

export default searchStore;

