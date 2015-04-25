import React from 'react';
import TrackActions from '../../actions/TrackActions';
import UserActions from '../../actions/UserActions';

export default class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  };

  doSearch(event) {
    event.preventDefault();

    let query = this.state.query;

    TrackActions.search(query);
    UserActions.search(query);
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
          <form>
            <div className="form-group">
              <label htmlFor="query">Search:</label>
              <input type="text" className="form-control" value={query} onChange={this.handleChange.bind(this)} id="query" placeholder="Enter your query" />
            </div>
            <button type="submit" className="btn btn-default" onClick={this.doSearch.bind(this)}>Submit</button>
          </form>
        </div>
      </div>
    );
  };
}
