import React, { Component, PropTypes } from 'react';
import User from '../../components/User';

export default class Users extends Component {
  static propTypes = {
    users: PropTypes.shape({
      isInProcess: PropTypes.bool.isRequired,
      alreadySearched: PropTypes.bool.isRequired,
      users: PropTypes.array
    }).isRequired
  };

  render() {
    const { isInProcess, alreadySearched, users } = this.props.users;
    const isEmpty = users.length === 0;

    return (
      <div className="search-results">
        {users.map(this.renderUser)}

        {alreadySearched && isEmpty &&
          <h2>There are no users with {this.props.q} name</h2>
        }

        {isInProcess &&
          <h2>Loading...</h2>
        }

        {!alreadySearched && !isInProcess &&
          <h2>There will be users</h2>
        }
      </div>
    );
  };

  renderUser(user) {
    return <User user={user} key={user.id} />;
  };
}
