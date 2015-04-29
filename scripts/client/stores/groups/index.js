import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';
import Store from '../Store';
import { Map, Set, Seq } from 'immutable';

const data = Symbol();

class GroupsStore extends Store {
  constructor() {
    super();

    this[data] = {};
    this[data].groups = new Map(); // hash {id: group}
    this[data].searched = new Map(); // hash {query:[...ids])
    this[data].inProcess = new Set(); // [...queries]
  };

  alreadySearched(query) {
    return this[data].searched.has(query);
  };

  getGroupsByQuery(query) {
    if (!this.alreadySearched(query)) return [];

    return this[data].searched.get(query).map((id) => {
      return this[data].groups.get(id);
    });
  };

  isExpectingGroups(query) {
    return this[data].inProcess.has(query);
  };
}

let groupsStore = new GroupsStore();

groupsStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  switch (action.type) {
    case ActionTypes.REQUEST_GROUPS:
      groupsStore[data].inProcess = groupsStore[data].inProcess.add(action.query);
      groupsStore.emitChange();
      break;
    case ActionTypes.REQUEST_GROUPS_SUCCESS:
      groupsStore[data].inProcess = groupsStore[data].inProcess.delete(action.query);
      //I need to fix it! need to correctly merge groups and get all keys
      //groupsStore[data].groups = groupsStore[data].groups.merge(action.groups);
      //groupsStore[data].searched.set(action.query, action.groups.keys());
      groupsStore.emitChange();
      break;
    case ActionTypes.REQUEST_GROUPS_ERROR:
      groupsStore[data].inProcess = groupsStore[data].inProcess.delete(action.query);
      groupsStore.emitChange();
      break;
    default:
      break;
  }
});

export default groupsStore;
