import { without, has } from 'lodash';
import { Store } from 'flummox';

export default class UsersSearchStore extends Store {
  constructor(flux) {
    super();

    const usersActions = flux.getActions('users');

    this.registerAsync(usersActions.searchUsers,
      this.handleBeginSearch,
      this.handleSuccessSearch,
      this.handleFailedSearch
    );

    this.state = {
      searched: {},
      inProcess: []
    };
  };

  static serialize(state) {
    return JSON.stringify({
      searched: state.searched,
      inProcess: state.inProcess
    });
  };

  static deserialize(str) {
    const state = JSON.parse(str);
    return {
      searched: state.searched,
      inProcess: state.inProcess
    };
  };

  handleBeginSearch(query) {
    console.log('begin');
    this.setState({
      inProcess: [].concat(this.state.inProcess, [query])
    });
  };

  handleSuccessSearch({ query, response }) {
    console.log('success');
    const { result } = response;

    this.setState({
      searched: Object.assign({}, this.state.searched, {[query]: result}),
      inProcess: without(this.state.inProcess, query)
    });
  };

  handleFailedSearch({ query, err }) {
    console.warn(err);
    this.setState({
      inProcess: without(this.state.inProcess, query)
    });
  };

  isInProcess(query) {
    return has(this.state.inProcess, query);
  };

  isAlreadySearched(query) {
    return has(this.state.searched, query);
  };

  getUsersByQuery(query) {
    return this.state.searched[query] || [];
  };
}
