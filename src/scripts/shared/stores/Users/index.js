import UsersStore from './UsersStore';
import UsersSearchStore from './UsersSearchStore';
import usersFollowersStore from './usersFollowersStore';
import UsersPageStore from './UsersPageStore';

export default {
  registerStores(flux) {
    flux.createStore('users', UsersStore, flux);
    flux.createStore('usersSearch', UsersSearchStore, flux);
    flux.createStore('usersFollowers', usersFollowersStore, flux);
    flux.createStore('usersPage', UsersPageStore);
  }
};
