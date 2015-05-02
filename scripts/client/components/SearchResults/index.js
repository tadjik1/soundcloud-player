import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
//components
import GroupComponent from 'components/group';
//stores
import GroupsStore from 'stores/groups';
//actions
import GroupActionCreators from 'actions/view/GroupActionCreators';

let getState = (query) => {
  return {
    groups: GroupsStore.getGroupsByQuery(query)
  };
};

export default class SearchResults extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      groups: []
    };
  };

  componentDidMount() {
    GroupsStore.addChangeListener(this._onChange.bind(this));

    this.queryDidChange(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.queryDidChange(nextProps);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(this.state.groups, nextState.groups);
  };

  queryDidChange(props) {
    const { query } = props;
    if (query.length > 1) {
      GroupActionCreators.searchGroups(query);
      this.setState(getState(query));
    }
  };

  render() {
    const query = this.props.query;
    const groups = this.state.groups;

    const queryIsEmpty = query.length === 0;
    const isEmpty = groups.length === 0;
    const isFetching = GroupsStore.isExpectingGroups(query);

    return (
      <div className="search-results">
        {groups.map((group) =>
          <GroupComponent group={group} key={group.id} />
        )}

        {!queryIsEmpty && isEmpty && !isFetching &&
          <h2>There are no groups with {query} title</h2>
        }

        {!queryIsEmpty && isEmpty && isFetching &&
          <h2>Loading...</h2>
        }

        {queryIsEmpty &&
          <h2>There will be groups</h2>
        }
      </div>
    );
  };

  _onChange() {
    this.setState(getState(this.props.query));
  }
}
