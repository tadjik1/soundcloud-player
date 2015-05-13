import { Actions } from 'flummox';
import UsersAPI from '../../api/UsersAPI';

export default class UsersActions extends Actions {
  searchUsers(query) {
    return UsersAPI.search(query);
  };
}
