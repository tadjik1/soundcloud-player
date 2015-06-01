import { Store } from 'flummox';
import selectn from 'selectn';

export default class UsersStore extends Store {
  constructor(flux) {
    super();

    flux.addListener('dispatch', this.handleNewUsers.bind(this));

    this.state = {
      users: {}
    };
  };

  static serialize(state) {
    return JSON.stringify({
      users: state.users
    });
  };

  static deserialize(str) {
    const state = JSON.parse(str);
    return {
      users: state.users
    };
  };

  handleNewUsers({ body }) {
    const responseUsers = selectn('response.entities.users', body);

    if (responseUsers) {
      this.setState({
        users: Object.assign({}, this.state.users, responseUsers)
      });
    }
  };

  get(id) {
    return this.state.users[id.toString()];
  };
}
