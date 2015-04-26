import React from 'react';
import SearchActions from '../../../actions/SearchActions';

export default class QueryString extends React.Component {
  render() {
    return (
      <form className="form-inline">
        <div className="form-group col-md-10">
          <label className="hidden">Search</label>
          <input className="col-md-12"
                 type="text" placeholder="looking for..."
                 onChange={this.updateQuery}
                 value={this.props.params.q} />
        </div>
        <div className="form-group col-md-2">
          <button className="col-md-12" type="submit" onClick={this.searchQuery.bind(this)}>
            Search
          </button>
        </div>
      </form>
    );
  }

  updateQuery(event) {
    SearchActions.updateQueryString(event.target.value);
  }

  searchQuery(event) {
    event.preventDefault();
    SearchActions.fetchData(this.props.type, this.props.params);
  }
}
