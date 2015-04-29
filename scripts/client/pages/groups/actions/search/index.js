import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/SearchActionTypes';

export default {
  setQuery(query) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SET_QUERY,
      query
    });
  }
};
