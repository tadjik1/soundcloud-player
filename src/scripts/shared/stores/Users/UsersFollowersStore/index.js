import { Store } from 'flummox';
import { has, without, includes } from 'lodash';

export default class usersFollowersStore extends Store {
  constructor(flux) {
		super();

		const usersActions = flux.getActions('users');

		this.registerAsync(usersActions.fetchFollowers,
		  this.handleBeginFetch,
		  this.handleSuccessFetch,
		  this.handleFailedFetch
		);

    this.state = {
      followers: {},
      inProcess: []
    };
  };

  static serialize(state) {
    return JSON.stringify({
			followers: state.followers,
			inProcess: state.inProcess
    });
  };

  static deserialize(str) {
    const state = JSON.parse(str);
    return {
			followers: state.followers,
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
			followers: Object.assign({}, this.state.followers, {[id]: result}),
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
    return has(this.state.followers, id);
  };

  getFollowers(id) {
    return this.state.followers[id] || [];
  };
}
