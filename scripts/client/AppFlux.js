import { Flummox } from 'flummox';
import GroupActions from 'actions/GroupActions';
import GroupsStore from 'stores/GroupsStore';

export default class AppFlux extends Flux {
  constructor() {
    super();

    const groupActions = this.createActions('groups', GroupActions);
    this.createStore('groups', GroupsStore, { groupActions });
  }
}
