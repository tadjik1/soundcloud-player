import { Store } from 'flummox';

export default class UsersPageStore extends Store {

  constructor() {
    super();

    this.state = {
      title: 'Find interesting persons',
      placeholder: 'Enter person name',
      action: '/users'
    };
  };

  getTitle() {
    return this.state.title;
  };

  getPlaceholder() {
    return this.state.placeholder;
  };

  getAction() {
    return this.state.action;
  };

}
