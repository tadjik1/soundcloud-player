import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/GroupActionTypes';
import Store from '../Store';

const data = Symbol();

class GroupsStore extends Store {
  constructor() {
    super();

    this[data] = {};
    this[data].groups = {}; // hash {id: group}
    this[data].searched = {}; // hash {query:[...ids])
    this[data].inProcess = []; // [...queries]
  };

  alreadySearched(query) {
    return Object.keys(this[data].searched).indexOf(query) !== -1;
  };

  isExpectingGroups(query) {
    return this[data].inProcess.indexOf(query) !== -1;
  };

  getGroupsByQuery(query) {
    if (!this.alreadySearched(query)) return [];

    return this[data].searched[query].map((id) => {
      return this[data].groups[id];
    });
  };
}

let groupsStore = new GroupsStore();
let removeQuery = (arr, query) => {
  const index = arr.indexOf(query);
  if (index !== -1) {
    arr.splice(index, 1);
  }
};

groupsStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  switch (action.type) {
    case ActionTypes.REQUEST_GROUPS:
      groupsStore[data].inProcess.push(action.query);
      groupsStore.emitChange();
      break;
    case ActionTypes.REQUEST_GROUPS_SUCCESS:
      removeQuery(groupsStore[data].inProcess, action.query);
      const { result } = action;
      groupsStore[data].groups = Object.assign(groupsStore[data].groups, result.entities.groups);
      groupsStore[data].searched[action.query] = result.result;
      groupsStore.emitChange();
      break;
    case ActionTypes.REQUEST_GROUPS_ERROR:
      removeQuery(groupsStore[data].inProcess, action.query);
      groupsStore.emitChange();
      break;
    default:
      break;
  }
});

export default groupsStore;
