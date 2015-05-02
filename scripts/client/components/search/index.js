import React, { Component, PropTypes } from 'react';

let parseQuery = (query) => {
  return query.replace(/\s+/g, ' ').trim();
};

export default class SearchControls extends Component {
  constructor(props) {
    super(props);

    this.state = {q: props.query};
  };

  static contextTypes = {
    router: PropTypes.func.isRequired
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.state.q) {
      this.setState({
        q: nextProps.query || ''
      });
    }
  };

  render() {
    return (
      <div className="jumbotron search-controls">
        <div className="container-fluid">
          <h2>{this.props.title}</h2>
          <div className="row">
            <form className="form-inline" onSubmit={this.onFormSubmit.bind(this)}>
              <div className="form-group col-md-10">
                <input
                  type="text"
                  className="form-control search-controls__query"
                  value={this.state.q}
                  onChange={this.onQueryChange.bind(this)}
                  placeholder={this.props.placeholder} />
              </div>
              <button
                type="submit"
                className="btn btn-primary col-md-2"
                disabled={this.state.q.length < 1}>Search</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  onFormSubmit(event) {
    event.preventDefault();
    const query = parseQuery(this.state.q);
    if (query.length > 1) {
      this.context.router.transitionTo('/groups?q=' + query);
    }
  };

  onQueryChange(event) {
    this.setState({q: event.target.value});
  };
}
