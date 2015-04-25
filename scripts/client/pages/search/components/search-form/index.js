import React, { PropTypes } from 'react';

export default class SearchForm extends React.Component {
  static propTypes = {
    doSearch: PropTypes.func.isRequired,
    queryChangeHandler: PropTypes.func.isRequired,
    sectionChangeHandler: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      query: '',
      section: 'users'
    };
  };

  render() {
    let doSearch = this.props.doSearch;
    let queryChangeHandler = this.props.queryChangeHandler;
    let sectionChangeHandler = this.props.sectionChangeHandler;
    let query = this.state.query;
    let section = this.state.section;
    return (
      <form onSubmit={doSearch}>
        <div className="form-group">
          <label htmlFor="query">Search:</label>
          <input type="text" className="form-control" value={query} onChange={queryChangeHandler} id="query" placeholder="Enter your query" />
        </div>
        <div className="radio">
          <label>
            <input type="radio" onChange={sectionChangeHandler} name="section" value="users" checked={section === 'users'} />
            Users
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" onChange={sectionChangeHandler} name="section" value="tracks" checked={section === 'tracks'} />
            Tracks
          </label>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  };
}
