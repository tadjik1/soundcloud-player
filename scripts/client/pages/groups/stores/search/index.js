import Store from 'stores/Store';
import AppDispatcher from 'dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes/SearchActionTypes';

class SearchControlsStore extends Store {
  constructor() {
    super();

    this.state = {
      title: 'Find interesting groups',
      placeholder: 'Enter group title',
      query: 'lala'
    };
  };

  getProps() {
    return this.state;
  };
}

let searchControlStore = new SearchControlsStore();

searchControlStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  switch (action.type) {
    case ActionTypes.SET_QUERY:
      searchControlStore.state.query = action.query;
      searchControlStore.emitChange();
      break;
    default:
      break;
  }
});

export default searchControlStore;

