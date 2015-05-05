import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';
import { normalizeGroupArrayResponse } from 'utils/APIUtils/group';


export default {
  handleGroupsSuccess(groups, query) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_GROUPS_SUCCESS,
      result: normalizeGroupArrayResponse(groups),
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
