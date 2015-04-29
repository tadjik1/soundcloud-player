import React, { Component, PropTypes } from 'react';

export default class SearchControls extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSearchFormSubmit: PropTypes.func.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="jumbotron search-controls">
        <div className="container-fluid">
          <h2>{this.props.title}</h2>
          <div className="row">
            <form className="form-inline" onSubmit={this.props.onSearchFormSubmit}>
              <div className="form-group col-md-10">
                <input
                  type="text"
                  className="form-control search-controls__query"
                  value={this.props.query}
                  onChange={this.props.onQueryChange}
                  placeholder={this.props.placeholder} />
              </div>
              <button type="submit" className="btn btn-primary col-md-2">Search</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
