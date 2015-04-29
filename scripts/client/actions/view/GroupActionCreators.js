import AppDispatcher from 'dispatcher/AppDispatcher';
import GroupsAPI from 'api/GroupsAPI';
import GroupsStore from 'stores/groups';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';

export default {
  async searchGroups(query) {
    if (GroupsStore.alreadySearched(query)) return;

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_GROUPS,
      query
    });

    GroupsAPI.searchGroups(query);
  }
};
