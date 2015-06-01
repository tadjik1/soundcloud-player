import { Map } from 'immutable';
import { Store } from 'flummox';
import selectn from 'selectn';

export default class UsersStore extends Store {
  constructor(flux) {
    super();

    flux.addListener('dispatch', payload => {
      this.handleNewUsers(payload);
    });

    this.state = {
      users: new Map()
    };
  };

  static serialize(state) {
    return JSON.stringify({
      users: state.users.toJS()
    });
  };

  static deserialize(str) {
    const state = JSON.parse(str);
    return {
      users: new Map(state.users)
    };
  };

  handleNewUsers({ body }) {
    const responseUsers = selectn('response.entities.users', body);

    if (responseUsers) {
      const users = this.state.users.withMutations(map => {
        Object.keys(responseUsers).forEach(id =>
          map.set(id.toString(), responseUsers[id])
        );
      });

      this.setState({
        users
      });
    }
  };

  get(id) {
    return this.state.users.get(id.toString());
  };
}
