import React, { PropTypes, Component } from 'react';
//shared components
import SearchComponent from 'components/search';
import GroupComponent from 'components/group';

//it's "global" stores and actions. we use it for manipulate real data
import GroupsStore from 'stores/groups';
import GroupActionCreators from 'actions/view/GroupActionCreators';

//it's our "local" stores and (actions?). we use it only for UI
import SearchStore from './stores/search';
import SearchActionCreators from './actions/search';

let getStateFromSearchStore = () => {
  const { title, placeholder, query } = SearchStore.getProps();
  return { title, placeholder, query };
};

let getStateFromGroupsStore = (query) => {
  const groups = GroupsStore.getGroupsByQuery(query);
  return { groups };
};

export default class GroupsPage extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign(
      {},
      getStateFromSearchStore(),
      getStateFromGroupsStore('')
    );
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
  };

  componentDidMount() {
    GroupsStore.addChangeListener(this._onGroupsStoreChange.bind(this));
    SearchStore.addChangeListener(this._onSearchStoreChange.bind(this));
  };

  componentWillUnmount() {
    GroupsStore.removeChangeListener(this._onGroupsStoreChange.bind(this));
    SearchStore.removeChangeListener(this._onSearchStoreChange.bind(this));
  };

  onSearchFormSubmit(event) {
    event.preventDefault();

    GroupActionCreators.searchGroups(this.state.query);
  };

  onQueryChange(event) {
    SearchActionCreators.setQuery(event.target.value);
  };

  render() {
    return (
      <div className="groups">
        <SearchComponent title={this.state.title}
                         query={this.state.query}
                         placeholder={this.state.placeholder}
                         onSearchFormSubmit={this.onSearchFormSubmit.bind(this)}
                         onQueryChange={this.onQueryChange.bind(this)} />
        <div className="row">
          {this.state.groups.length ? this.renderGroups() : <p>Enter group title</p>}
        </div>
      </div>
    );
  };

  renderGroups() {
    return (
      this.state.groups.map((group) => <GroupComponent group={group} key={group.id} />)
    );
  };

  _onGroupsStoreChange() {
    this.setState(Object.assign(
      this.state,
      getStateFromGroupsStore(this.state.query)
    ));
  };

  _onSearchStoreChange() {
    this.setState(Object.assign(
      this.state,
      getStateFromSearchStore()
    ));
  }
}
