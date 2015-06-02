import { Store } from 'flummox';
import { has, without, includes } from 'lodash';

export default class usersFollowingsStore extends Store {
  constructor(flux) {
    super();

    const usersActions = flux.getActions('users');

    this.registerAsync(usersActions.fetchFollowings,
      this.handleBeginFetch,
      this.handleSuccessFetch,
      this.handleFailedFetch
    );

    this.state = {
      followings: {},
      inProcess: []
    };
  };

  static serialize(state) {
    return JSON.stringify({
      followings: state.followings,
      inProcess: state.inProcess
    });
  };

  static deserialize(str) {
    const state = JSON.parse(str);
    return {
      followings: state.followings,
      inProcess: state.inProcess
    };
  };

  handleBeginFetch(id) {
    this.setState({
      inProcess: [].concat(this.state.inProcess, [id])
    });
  };

  handleSuccessFetch({ id, response }) {
    const { result } = response;

    this.setState({
      followings: Object.assign({}, this.state.followings, {[id]: result}),
      inProcess: without(this.state.inProcess, id)
    });
  };

  handleFailedFetch({ id, err }) {
    console.warn(err);
    this.setState({
      inProcess: without(this.state.inProcess, id)
    });
  };

  isInProcess(id) {
    return includes(this.state.inProcess, id);
  };

  isAlreadyFetched(id) {
    return has(this.state.followings, id);
  };

  getFollowings(id) {
    return this.state.followings[id] || [];
  };
}
