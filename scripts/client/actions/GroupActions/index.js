import GroupsAPI from 'api/GroupsAPI';
import { Actions } from 'flummox';

export default class GroupsActions extends Actions {
  searchGroups(query) {
    return GroupsAPI.searchGroups(query);
  }
}
