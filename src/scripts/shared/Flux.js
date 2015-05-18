import { Flummox } from 'flummox';
import UsersActions from './actions/UsersActions';
import UsersStore from './stores/UsersStore';

export default class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('users', UsersActions);
    this.createStore('users', UsersStore, this);
  };
}
