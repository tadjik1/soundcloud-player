import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
  };

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">SoundCloud Replica</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/groups">Groups</Link></li>
              <li><Link to="/playlists">Playlists</Link></li>
              <li><Link to="/tracks">Tracks</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
}
