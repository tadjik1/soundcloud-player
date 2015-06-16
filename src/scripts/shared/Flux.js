import { Flummox } from 'flummox';
// actions
import UsersActions from './actions/UsersActions';

// stores
import * as UserStores from './stores/Users';

export default class Flux extends Flummox {
  constructor() {
    super();

    // actions
    this.createActions('users', UsersActions);

    // stores
    UserStores.registerStores(this);
  };
}
