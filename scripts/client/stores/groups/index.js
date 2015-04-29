import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';
import Store from '../Store';
import _ from 'lodash';

class GroupsStore extends Store {
  constructor() {
    super();

    this.groups = {}; // id=>group
    this.searched = {}; //query=>[...ids]
  };

  alreadySearched(query) {
    return !!this.searched[query];
  };

  getGroupsByQuery(query) {
    if (!this.alreadySearched(query)) return [];

    return this.searched[query].map((id) => this.groups[id]);
  };
}

let groupsStore = new GroupsStore();

groupsStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  switch (action.type) {
    case ActionTypes.REQUEST_GROUPS:
      break;
    case ActionTypes.REQUEST_GROUPS_SUCCESS:
      action.groups.forEach((group) => {
        groupsStore.groups[group.id] = group;
      });
      groupsStore.searched[action.query] = _.pluck(action.groups, 'id');
      groupsStore.emitChange();
      break;
    default:
      break;
  }
});

export default groupsStore;
