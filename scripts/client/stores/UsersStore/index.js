import _ from 'lodash';
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
      users: [],
      searched: {},
      inProcess: []
    };
  };

  handleBeginSearch(action) {
    const { actionArgs } = action;
    const query = actionArgs[0];
    this.state.inProcess.push(query);
    this.setState(this.state);
  };

  handleSuccessSearch({ query, response }) {
    this._removeFromProcess(query);
    const { users } = response.entities;
    const { result } = response;
    if (users) {
      this.state.users = _.merge(this.state.users, users);
      this.state.searched[query] = result;
    } else {
      this.state.searched[query] = [];
    }
    this.setState(this.state);
  };

  handleFailedSearch({ query, err }) {
    console.warn(err);
    this._removeFromProcess(query);
    this.state.searched[query] = [];
    this.setState(this.state);
  };

  isInProcess(query) {
    return this.state.inProcess.includes(query);
  };

  isAlreadySearched(query) {
    return !!this.state.searched[query];
  };

  getUsers(query) {
    const isInProcess = this.isInProcess(query);
    const alreadySearched = this.isAlreadySearched(query);
    const users = alreadySearched ? this.state.searched[query].map(id => this.state.users[id]) : [];

    return { isInProcess, alreadySearched, users };
  };

  _removeFromProcess(query) {
    const index = this.state.inProcess.indexOf(query);
    if (index !== -1) {
      this.state.inProcess.splice(index, 1);
    }
  };
}
