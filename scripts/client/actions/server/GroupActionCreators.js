import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';
import { normalizeGroupArrayResponse } from 'utils/APIUtils/group';


export default {
  handleGroupsSuccess(groups, query) {
    console.log(normalizeGroupArrayResponse(groups)); //TODO: need to implement this parsing
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
