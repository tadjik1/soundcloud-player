import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class User extends Component {
  static PropTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired,
    flux: PropTypes.any
  };

  static contextTypes = {
    flux: PropTypes.any
  };

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
