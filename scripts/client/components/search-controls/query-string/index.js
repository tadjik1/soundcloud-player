import React from 'react';

export default class QueryString extends React.Component {
  render() {
    return (
      <form className="form-inline">
        <div className="form-group col-md-10">
          <label className="hidden">Search</label>
          <input className="col-md-12"
                 type="text" placeholder="looking for..."
                 onChange={this.updateQuery.bind(this)}
                 value={this.props.query} />
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
    this.props.updateQuery(event.target.value);
  }

  searchQuery(event) {
    this.props.searchQuery(event);
  }
}
