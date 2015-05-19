import React, { Component } from 'react';
import User from '../../components/User';

export default class Users extends Component {
  render() {
    const { q, isInProcess, isAlreadySearched, users } = this.props;
    const isEmpty = users.size === 0;

    return (
      <div className="search-results">
        {users.map(this.renderUser)}

        {isAlreadySearched && isEmpty &&
          <h2>There are no users with {q} name</h2>
        }

        {isInProcess &&
          <h2>Loading...</h2>
        }

        {!isAlreadySearched && !isInProcess &&
          <h2>There will be users</h2>
        }
      </div>
    );
  };

  renderUser(user) {
    return <User user={user} key={user.id} />;
  };
}
