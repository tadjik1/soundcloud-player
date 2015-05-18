import React, { PropTypes, Component } from 'react';

export default class Search extends Component {
  static propTypes = {
    q: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  onQueryChange(event) {
    this.setState({q: event.target.value});
  };

  onFormSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.q);
  };

  constructor(props) {
    super(props);

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {q: props.q};
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
                className="btn btn-primary col-md-2"
                disabled={this.state.q.length < 3}>Search</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
}
