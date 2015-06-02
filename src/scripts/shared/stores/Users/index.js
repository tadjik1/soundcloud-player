import UsersStore from './UsersStore';
import UsersSearchStore from './UsersSearchStore';
import UsersFollowersStore from './usersFollowersStore';
import UsersFollowingsStore from './usersFollowingsStore';
import UsersPageStore from './UsersPageStore';

export default {
  registerStores(flux) {
    flux.createStore('users', UsersStore, flux);
    flux.createStore('usersSearch', UsersSearchStore, flux);
    flux.createStore('usersFollowers', UsersFollowersStore, flux);
    flux.createStore('usersFollowings', UsersFollowingsStore, flux);
    flux.createStore('usersPage', UsersPageStore);
  }
};
