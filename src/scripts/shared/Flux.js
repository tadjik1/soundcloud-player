import { Flummox } from 'flummox';
// actions
import UsersActions from './actions/UsersActions';

// stores
import UsersStore from './stores/Users/UsersStore';
import UsersSearchStore from './stores/Users/UsersSearchStore';
import usersFollowersStore from './stores/Users/usersFollowersStore';
import UsersPageStore from './stores/Users/UsersPageStore';

export default class Flux extends Flummox {
  constructor() {
    super();

    // actions
    this.createActions('users', UsersActions);

    // stores
    this.createStore('users', UsersStore, this);
    this.createStore('usersSearch', UsersSearchStore, this);
    this.createStore('usersFollowers', usersFollowersStore, this);
    this.createStore('usersPage', UsersPageStore);
  };
}
