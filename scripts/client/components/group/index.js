import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class GroupComponent extends Component {
  static PropTypes = {
    group: PropTypes.shape({
      id: PropTypes.string.isRequired,
      artwork_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      short_description: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const group = this.props.group;
    return (
      <div className="col-md-6">
        <div className="media">
          <div className="media-left media-top">
            <Link to={'/group/' + group.id}>
              <img className="media-object" src={group.artwork_url} alt={group.name} />
            </Link>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{group.name.slice(0, 45) + '…'}</h4>
            <p>{group.short_description.slice(0, 45) + '…'}</p>
            <p>
              <Link to={'/users?group=' + group.id}>Members
                <span className="badge">{group.members_count}</span>
              </Link>
            </p>
            <p>
              <Link to={'/tracks?group=' + group.id}>Tracks
                <span className="badge">{group.track_count}</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
}
