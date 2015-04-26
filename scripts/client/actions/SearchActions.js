import SoundCloudAppDispatcher from '../dispatcher/SoundCloudAppDispatcher';
import SoundCloudApiUtils from '../utils/SoundCloudApiUtils';
import { ActionTypes } from '../constants/SoundCloudAppConstants';
import { DataTypes } from '../constants/SoundCloudAppConstants';

export default {
  updateQueryString(query) {
    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_QUERY,
      query: query
    });
  },

  async fetchData(type, params) {
    let results;

    switch (type) {
      case DataTypes.TYPE_GROUP:
        results = await SoundCloudApiUtils.searchGroups(params);
        break;
      case DataTypes.TYPE_TRACK:
        results = await SoundCloudApiUtils.searchTracks(params);
        break;
      case DataTypes.TYPE_USER:
        results = await SoundCloudApiUtils.searchUsers(params);
        break;
      default:
        results = [];
    }

    console.log(ActionTypes, ['FETCHED_' + type], ActionTypes['FETCHED_' + type]);

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes['FETCHED_' + type],
      data: results
    });

    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RESULTS,
      dataType: type,
      results: results.map((result) => {
        return result.id;
      })
    });
  },

  updateSearchType(type) {
    SoundCloudAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TYPE,
      newType: type
    });
  }
};
