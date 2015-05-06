import { Store } from 'flummox';

class GroupsStore extends Store {
  constructor(flux) {
    super();

    const groupsActions = flux.getActions('groups');
    this.registerAsync(groupsActions.searchGroups,
      this.handleBeginSearch,
      this.handleSuccessSearch,
      this.handleFailedSearch
    );

    this.state = {
      groups: [],
      searched: {},
      inProcess: []
    };
  };

  handleBeginSearch(response) {
    console.log('Begin Search: ', response);
  };

  handleSuccessSearch(response) {
    console.log('Success Search: ', response);
  };

  handleFailedSearch(response) {
    console.log('Failed Search: ', response);
  };

  getGroup(id) {
    return { id, title: 'hello world' };
  }
}
