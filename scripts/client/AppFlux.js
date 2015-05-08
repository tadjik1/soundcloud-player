import { Flux } from 'flummox';
import UsersActions from 'actions/UsersActions';
import UsersStore from 'stores/UsersStore';

export default class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions('users', UsersActions, this);
    this.createStore('users', UsersStore, this);
  };
}
