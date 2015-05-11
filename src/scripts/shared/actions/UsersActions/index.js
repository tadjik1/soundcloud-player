import { Actions } from 'flummox';
import UsersAPI from '../../api/UsersAPI';

export default class UsersActions extends Actions {
  constructor(flux) {
    super();

    this.flux = flux;
  };

  searchUsers(query) {
    const store = this.flux.getStore('users');
    const { isInProcess, isAlreadySearched } = {
      isInProcess: store.isInProcess(query),
      isAlreadySearched: store.isAlreadySearched(query)
    };
    if (isInProcess || isAlreadySearched) return;
    return UsersAPI.search(query);
  };
}
