import React, { PropTypes, Component } from 'react';

export default class Search extends Component {
  static propTypes = {
    q: PropTypes.string.isRequired
  };

  static contextTypes = {
    router: PropTypes.func.isRequired
  };

  static _onQueryChange(event) {
    this.setState({q: event.target.value});
  };

  static _onFormSubmit(e) {
    e.preventDefault();

    if (this.state.q.length > 1) {
      this.context.router.transitionTo('/users?q=' + this.state.q);
    }
  };

  constructor(props) {
    super(props);

    this.onQueryChange = Search._onQueryChange.bind(this);
    this.onFormSubmit = Search._onFormSubmit.bind(this);

    this.state = {
      q: props.q
    };
  };

  componentWillReceiveProps({ q }) {
    if (q !== this.state.q) {
      this.setState({ q });
    }
  };

  render() {
    return (
      <div className="jumbotron search-controls">
        <div className="container-fluid">
          <h2>Find interesting persons</h2>
          <div className="row">
            <form className="form-inline" onSubmit={this.onFormSubmit} method="GET" action="/users">
              <div className="form-group col-md-10">
                <input
                  type="text"
                  name="q"
                  className="form-control search-controls__query"
                  value={this.state.q}
                  onChange={this.onQueryChange}
                  placeholder="Enter person name" />
              </div>
              <button
                type="submit"
                className="btn btn-primary col-md-2">Search</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
}
