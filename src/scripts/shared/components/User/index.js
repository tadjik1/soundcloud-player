import React, { Component } from 'react';
import { Link } from 'react-router';

export default class User extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="col-md-6">
        <div className="media">
          <div className="media-left media-middle">
            <Link to={'/user/' + user.id}>
              <img className="media-object" src={user.avatar_url} alt={user.username} />
            </Link>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{user.username}</h4>
          </div>
        </div>
      </div>
    );
  };
}
