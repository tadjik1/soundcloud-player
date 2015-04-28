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
  DataTypes.TRACKS,
  DataTypes.USERS,
  DataTypes.GROUPS
];

let TYPE_STORES = {};

TYPE_STORES[DataTypes.TRACKS] = TracksStore;
TYPE_STORES[DataTypes.USERS] = UsersStore;
TYPE_STORES[DataTypes.GROUPS] = GroupsStore;

class SearchStore extends Store {
  constructor() {
    super();

    this[data] = {
      // actually, it could be implemented as array of plain strings
      // but this structure is a bit more flexible
      searchEntities: new Set([
        {
          type: DataTypes.TRACKS,
          text: 'Tracks'
        },
        {
          type: DataTypes.USERS,
          text: 'Users'
        },
        {
          type: DataTypes.GROUPS,
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
      type: DataTypes.TRACKS
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
    default:
      break;
  }
});

export default searchStore;

