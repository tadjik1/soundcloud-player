import React, { Component, PropTypes } from 'react';
import GroupActionCreators from 'actions/view/GroupActionCreators';
import GroupsStore from 'stores/groups';
import GroupComponent from 'components/group';

let requestGroups = (q) => {
  GroupActionCreators.searchGroups(q);
};

let getStateFromStore = (q) => {
  return {groups: GroupsStore.getGroupsByQuery(q)};
};

export default class SearchResults extends Component {
  static propTypes = {
    q: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.onChange = this._onChange.bind(this);
    this.state = getStateFromStore(props.q);
  };

  componentWillMount() {
    GroupsStore.addChangeListener(this.onChange);
    requestGroups(this.props.q);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.q !== nextProps.q) {
      requestGroups(nextProps.q);
      this.setState(getStateFromStore(nextProps.q));
    }
  };

  componentWillUnmount() {
    GroupsStore.removeChangeListener(this.onChange);
  };

  render() {
    const groups = this.state.groups;
    const query = this.props.q;

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
    this.setState(getStateFromStore(this.props.q));
  };
}
