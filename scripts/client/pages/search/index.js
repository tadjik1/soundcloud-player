import React from 'react';

import { DataTypes } from 'constants/SoundCloudAppConstants';
import SoundCloudApiUtils from 'utils/SoundCloudApiUtils';
import { Set } from 'immutable';

// actions section
import SearchActions from 'actions/SearchActions';

// stores section
import SearchStore from 'stores/search';
import TracksStore from 'stores/tracks';
import UsersStore from 'stores/users';
import GroupsStore from 'stores/groups';

// components section
import SearchControls from 'components/search-controls';
import SearchResults from 'components/search-results';

import QueryStore from 'utils/CustomRelay';

let TYPE_STORES = {};

TYPE_STORES[DataTypes.TRACKS] = TracksStore;
TYPE_STORES[DataTypes.USERS] = UsersStore;
TYPE_STORES[DataTypes.GROUPS] = GroupsStore;

let getSearchMethod = (type) => {
  let methodName = '';

  switch (type) {
    case DataTypes.GROUPS:
      methodName = 'searchGroups';
      break;
    case DataTypes.TRACKS:
      methodName = 'searchTracks';
      break;
    case DataTypes.USERS:
      methodName = 'searchUsers';
      break;
    default:
      break;
  }

  return methodName;
};

let getStateFromStores = () => {
  let type = SearchStore.getType();
  let params = SearchStore.getQueryParams();

  let res = QueryStore.fetchImmediately(getSearchMethod(type), params[type]);
  console.log(type, TYPE_STORES[type], res, params);
  let results = TYPE_STORES[type].getByIds(res);

  return {
    queryParams: params,
    type: type,
    results: results
  };
};

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();
  };

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange.bind(this));
    UsersStore.addChangeListener(this._onChange.bind(this));
    GroupsStore.addChangeListener(this._onChange.bind(this));
    TracksStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange.bind(this));
    UsersStore.removeChangeListener(this._onChange.bind(this));
    GroupsStore.removeChangeListener(this._onChange.bind(this));
    TracksStore.removeChangeListener(this._onChange.bind(this));
  };

  render() {
    let state = this.state;
    let type = state.type;

    return (
      <div className="search">
        <SearchControls type={type}
                        queryParams={state.queryParams[type]}
                        updateQuery={SearchPage.updateQuery.bind(this)}
                        searchQuery={SearchPage.searchQuery.bind(this)}
                        changeType={SearchPage.changeType.bind(this)} />
        <SearchResults type={type} results={state.results} />
      </div>
    );
  };

  static updateQuery(query) {
    let type = this.state.type;
    SearchActions.updateQueryString(query, this.state.queryParams[type], type);
  };

  static changeType(type) {
    if (type !== SearchStore.getType()) {
      SearchActions.updateSearchType(type, this.state.queryParams[type]);
    }
  }

  static async searchQuery(event) {
    let type = SearchStore.getType();
    let params = SearchStore.getQueryParams();
    let results;

    if (event) {
      event.preventDefault();
    }

    if (!TYPE_STORES[type].checkSearchedByQuery(params)) {
      switch (type) {
        case DataTypes.GROUPS:
          results = await SoundCloudApiUtils.searchGroups(params);
          break;
        case DataTypes.TRACKS:
          results = await SoundCloudApiUtils.searchTracks(params);
          break;
        case DataTypes.USERS:
          results = await SoundCloudApiUtils.searchUsers(params);
          break;
        default:
          results = new Set();
      }

      SearchActions.applyData(type, params, results);
    } else {
      this.setState({
        results: TYPE_STORES[type].searchByQuery(params)
      });
    }
  };

  _onChange() {
    this.setState(getStateFromStores());
  };
}
