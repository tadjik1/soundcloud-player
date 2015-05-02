import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';
import Store from '../Store';
import { Map, Set } from 'immutable';

const data = Symbol();
/**
 * function for paring plain javascript array with groups to immutable map
 * with {groupId: group, ...} structure
 * @param groups {Array} - array with groups
 * @returns {{groups: Object, ids: {}}}
 */
let parseGroups = (groups) => {
  let objWithGroups = {};
  let arrWithIds = [];

  groups.forEach((group) => {
    objWithGroups[group.id] = group;
    arrWithIds.push('' + group.id);
  });

  return {
    groups: new Map(objWithGroups),
    ids: arrWithIds
  };
};

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
      const { groups, ids } = parseGroups(action.groups);
      groupsStore[data].groups = groupsStore[data].groups.merge(groups);
      groupsStore[data].searched = groupsStore[data].searched.set(action.query, ids);
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
