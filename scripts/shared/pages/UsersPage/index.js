import React, { Component, PropTypes } from 'react';
import FluxComponent from 'flummox/component';
import DocumentTitle from 'react-document-title';
import Search from 'components/Search';
import Users from 'components/Users';

export default class UsersPage extends Component {
  static propTypes = {
    query: PropTypes.shape({
      q: PropTypes.string
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      q: props.query.q || ''
    };
  };

  componentWillMount() {
    this.doSearchUsers(this.state.q);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({q: nextProps.query.q || ''});
    this.doSearchUsers(nextProps.query.q || '');
  };

  doSearchUsers(query) {
    if (query !== '') {
      this.props.flux.getActions('users').searchUsers(query);
    }
  };

  render() {
    return (
      <DocumentTitle title="SoundCloud Replica Search">
        <div className="groups">
          <Search q={this.state.q} />
          <FluxComponent
            q={this.state.q}
            connectToStores={{
              users: store => ({
                users: store.getUsers(this.state.q)
              })
            }}>
            <Users />
          </FluxComponent>
        </div>
      </DocumentTitle>
    );
  };
}
