import React, { Component, PropTypes } from 'react';
import GroupComponent from 'components/group';

import GroupsStore from 'stores/groups';

let getStateFromStore = (query) => {
  const groups = GroupsStore.getGroupsByQuery(query);
  return { groups };
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
  };

  componentWillUnmount() {
    GroupsStore.removeChangeListener(this._onChange.bind(this));
  };

  render() {
    const query = this.props.query;
    const groups = this.state.groups;

    const isEmpty = groups.length === 0;
    const isFetching = GroupsStore.isExpectingGroups(query);

    return (
      <div>
        {groups.map((group) =>
          <GroupComponent group={group} key={group.id} />
        )}

        {isEmpty && !isFetching &&
          <h2>There are no groups with {query} title</h2>
        }

        {isEmpty && isFetching &&
          <h2>Loading...</h2>
        }
      </div>
    );
  };

  _onChange() {
    this.setState(getStateFromStore(this.props.query));
  }
}
