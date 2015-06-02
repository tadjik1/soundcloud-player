import React, { Component } from 'react';
import User from '../../components/User';

export default class Users extends Component {
  render() {
    const { q, isInProcess, isAlreadyFetched, users } = this.props;
    const isEmpty = users.length === 0;

    return (
      <div className="search-results">
        {users.map(this.renderUser)}

        {isAlreadyFetched && isEmpty &&
          <h2>There are no users with {q} name</h2>
        }

        {isInProcess &&
          <h2>Loading...</h2>
        }

        {!isAlreadyFetched && !isInProcess &&
          <h2>There will be users</h2>
        }
      </div>
    );
  };

  renderUser(user) {
    return <User user={user} key={user.id} />;
  };
}
