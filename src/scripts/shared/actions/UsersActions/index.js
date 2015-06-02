import { Actions } from 'flummox';
import UsersAPI from '../../api/UsersAPI';

export default class UsersActions extends Actions {
  searchUsers(query) {
    return UsersAPI.search(query);
  };

  fetchFollowers(id) {
    return UsersAPI.fetchFollowers(id);
  };

  fetchFollowings(id) {
    return UsersAPI.fetchFollowings(id);
  };

  fetchUser(userId) {
    return UsersAPI.fetchUser(userId);
  };
}
