import SoundCloudAppDispatcher from '../dispatcher/SoundCloudAppDispatcher';
//import SoundCloudApiUtils from '../utils/SoundCloudApiUtils';
import { ActionTypes, DataTypes } from '../constants/SoundCloudAppConstants';
//import { DataTypes } from '../constants/SoundCloudAppConstants';
import QueryCache from 'utils/CustomRelay';

let getSearchEntities = (type) => {
  let methodName = '';
  let updateEvent = '';

  switch (type) {
    case DataTypes.GROUPS:
      methodName = 'searchGroups';
      updateEvent = 'RECEIVE_GROUPS';
      break;
    case DataTypes.TRACKS:
      methodName = 'searchTracks';
      updateEvent = 'RECEIVE_TRACKS';
      break;
    case DataTypes.USERS:
      methodName = 'searchUsers';
      updateEvent = 'RECEIVE_USERS';
      break;
    default:
      break;
  }

  return {
    method: methodName,
    update: updateEvent
  };
};

export default {
  async updateQueryString(query, params, type) {
    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_QUERY,
      query: query
    });

    let variables = getSearchEntities(type);
    let need = QueryCache.checkCache(variables.method, params);

    if (!need) {
      let res = await QueryCache.fetch(variables.method, params);

      SoundCloudAppDispatcher.dispatch({
        type: ActionTypes[variables.update],
        data: res
      });
    }
  },

  applyData(type, params, results) {
    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes['RECEIVE_' + type],
      data: results,
      queryType: 'search',
      params: params
    });
  },

  async updateSearchType(type, params) {
    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TYPE,
      newType: type
    });

    let variables = getSearchEntities(type);
    let need = QueryCache.checkCache(variables.method, params);

    if (!need) {
      let res = await QueryCache.fetch(variables.method, params);

      SoundCloudAppDispatcher.dispatch({
        type: ActionTypes[variables.update],
        data: res
      });
    }
  }
};
