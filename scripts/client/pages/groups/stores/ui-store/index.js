import Store from 'stores/Store';

class GroupsPageStore extends Store {
  constructor() {
    super();

    this.props = {
      title: 'Find interesting groups',
      placeholder: 'Enter group title',
      url: '/groups'
    };
  };

  getProps() {
    return this.props;
  };
}

export default new GroupsPageStore();
