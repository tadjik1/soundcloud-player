import React from 'react';
import TrackActions from '../../actions/TrackActions';
import UserActions from '../../actions/UserActions';
import TracksStore from '../../stores/tracks/tracks';
import UsersStore from '../../stores/users/users';

let getStateFromStores = () => {
  return {
    tracks: TracksStore.getAllTracks(),
    users: UsersStore.getAllUsers()
  };
};

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      query: ''
    }, getStateFromStores());
  };

  componentDidMount() {
    TracksStore.addChangeListener(this._onChange.bind(this));
    UsersStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    TracksStore.removeChangeListener(this._onChange.bind(this));
    UsersStore.removeChangeListener(this._onChange.bind(this));
  };

  doSearch(event) {
    let query = this.state.query;

    TrackActions.search(query);
    UserActions.search(query);

    event.preventDefault();
  };

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  };

  render() {
    let query = this.state.query;
    return (
      <div className="search">
        <div className="jumbotron">
          <form onSubmit={this.doSearch.bind(this)}>
            <div className="form-group">
              <label htmlFor="query">Search:</label>
              <input type="text" className="form-control" value={query} onChange={this.handleChange.bind(this)} id="query" placeholder="Enter your query" />
            </div>
            <div className="radio">
              <label>
                <input type="radio" name="section" value="users" />
                  Users
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="section" value="tracks" />
                    Tracks
                  </label>
                </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  };

  _onChange() {
    this.setState(getStateFromStores());
  };
}
