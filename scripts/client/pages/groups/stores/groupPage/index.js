import Store from 'stores/Store';

class GroupsPageStore extends Store {
  constructor() {
    super();

    this.state = {
      title: 'Find interesting groups',
      placeholder: 'Enter group title',
      query: ''
    };
  };

  getProps() {
    return this.state;
  };
}

export default new GroupsPageStore();

