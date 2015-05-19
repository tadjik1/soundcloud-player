import { Set, Map, List } from 'immutable';
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

    this.register(usersActions.fetchUser, this.handleNewUser);

    this.state = {
      users: new Map(),
      searched: new Map(),
      inProcess: new Set()
    };
  };

static serialize(state) {
  return JSON.stringify({
    users: state.users.toJS(),
    searched: state.searched.toJS(),
    inProcess: state.inProcess.toJS()
  });
};

static deserialize(str) {
  const state = JSON.parse(str);
  return {
    users: new Map(state.users),
    searched: new Map(state.searched),
    inProcess: new Set(state.inProcess)
  };
};

  handleBeginSearch(query) {
    this.setState({
      inProcess: this.state.inProcess.add(query)
    });
  };

  /*
    TODO: decide what to do with this piece of code
          cause right now it looks like a shit.
  */
  handleSuccessSearch({ query, response }) {
    const { entities } = response;
    const { result } = response;

    const users = this.state.users.withMutations(map => {
      Object.keys(entities.users || {}).forEach(id => map.set(Number(id), entities.users[id]));
    });

    const searched = this.state.searched.set(query, new List(result.map(id => users.get(id))));

    this.setState({
      users,
      searched,
      inProcess: this.state.inProcess.delete(query)
    });
  };

  handleNewUser({ response }) {
    const { entities } = response;

    const users = this.state.users.withMutations(map => {
      Object.keys(entities.users || {}).forEach(id => map.set(Number(id), entities.users[id]));
    });

    this.setState({
      users
    });
  };

  handleFailedSearch({ query, err }) {
    console.warn(err);
    this.setState({
      inProcess: this.state.inProcess.delete(query)
    });
  };

  isInProcess(query) {
    return this.state.inProcess.has(query);
  };

  isAlreadySearched(query) {
    return this.state.searched.has(query);
  };

  isAlreadyFetched(userId) {
    return this.state.users.has(userId);
  };

  getUserById(userId) {
    return this.state.users.get(userId);
  };

  getUsersByQuery(query) {
    return this.state.searched.get(query) || new List();
  };
}
