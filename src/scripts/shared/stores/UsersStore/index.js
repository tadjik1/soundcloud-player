import { merge } from 'lodash';
import { Store } from 'flummox';

export default class UsersStore extends Store {
  constructor(flux) {
    super();

    const usersActions = flux.getActions('users');
    this.registerAsync(usersActions.searchUsers,
      this.handleBeginSearch,
      this.handleSuccessSearch,
      this.handleFailedSearch
    );

    this.state = {
      users: {},
      searched: {},
      inProcess: []
    };
  };

  static serialize(state) {
    return JSON.stringify(state);
  };

  static deserialize(state) {
    return JSON.parse(state);
  };

  handleBeginSearch(query) {
    this.state.inProcess.push(query);
    this.setState();
  };

  /*
    TODO: decide what to do with this piece of code
          cause right now it looks like a shit.
  */
  handleSuccessSearch({ query, response }) {
    this._removeFromProcess(query);
    const { users } = response.entities;
    const { result } = response;
    if (users) {
      this.state.searched[query] = result;
    } else {
      this.state.searched[query] = [];
    }
    this.setState({
      users: merge(this.state.users, users || {})
    });
  };

  handleFailedSearch({ query, err }) {
    console.warn(err);
    this._removeFromProcess(query);
    this.state.searched[query] = [];
    this.setState();
  };

  isInProcess(query) {
    return this.state.inProcess.includes(query);
  };

  isAlreadySearched(query) {
    return !!this.state.searched[query];
  };

  getUsersByQuery(query) {
    const ids = this.state.searched[query] || [];
    return ids.map(id => this.state.users[id]);
  };

  _removeFromProcess(query) {
    const index = this.state.inProcess.indexOf(query);
    if (index !== -1) {
      this.state.inProcess.splice(index, 1);
    }
  };
}
