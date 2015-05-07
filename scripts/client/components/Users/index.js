import React, { Component } from 'react';
import User from 'components/User';

export default class Users extends Component {
  render() {
    const { isInProcess, alreadySearched, users } = this.props.users;
    const isEmpty = users.length === 0;

    return (
      <div className="search-results">
        {users.map(user => <User user={user} key={user.id} />)}

        {alreadySearched && isEmpty &&
          <h2>There are no users with this name</h2>
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
}
