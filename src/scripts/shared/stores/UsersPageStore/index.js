import { Store } from 'flummox';

export default class UsersPageStore extends Store {

  getTitle() {
    return 'Find interesting persons';
  };

  getPlaceholder() {
    return 'Enter person name';
  };

  getAction() {
    return '/users';
  }

}
