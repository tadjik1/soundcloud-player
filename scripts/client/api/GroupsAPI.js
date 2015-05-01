import SoundCloudSDK from 'utils/SoundCloudSDK';
import { Map } from 'immutable';
import GroupServerActionCreators from 'actions/server/GroupActionCreators';

/**
 * parseGroups - function that parses groups array, and get
 * hash {group.name: group} instead of plain array
 *
 * @param groups - array of groups
 * @return {*} - hash with this structure:
 *
 * {group1Name: group1, group2Name: group2, ...}
 */
let parseGroups = (groups) => {
  let obj = {};
  let names = [];

  groups.forEach((group) => {
    const name = group.name.replace(/ /ig, '_').toLowerCase();
    names.push(name);
    obj[name] = group;
  });

  return {groups: groups, names: names};
};

export default {
  async searchGroups(query) {
    try {
      let groups = await SoundCloudSDK.get(`/groups?q=${query}`);
      GroupServerActionCreators.handleGroupsSuccess(
        new Map(parseGroups(groups).groups),
        parseGroups(groups).names,
        query
      );
    } catch (err) {
      GroupServerActionCreators.handleGroupsError(err, query);
    }
  }
};
