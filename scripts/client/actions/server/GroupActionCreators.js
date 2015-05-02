import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';

export default {
  handleGroupsSuccess(groups, query) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_GROUPS_SUCCESS,
      groups,
      query
    });
  },

  handleGroupsError(err) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_GROUPS_ERROR,
      err
    });
  }
};
