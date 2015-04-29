import React, { Component, PropTypes } from 'react';

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
      <div className="col-md-4">
        <div className="thumbnail">
          <img src={group.artwork_url} alt={group.name} />
          <div className="caption">
            <h3>{group.name}</h3>
            <p>{group.short_description}</p>
            <p>
              <a href="#" className="btn btn-primary" role="button">Join the group</a>
            </p>
          </div>
        </div>
      </div>
    );
  };
}
