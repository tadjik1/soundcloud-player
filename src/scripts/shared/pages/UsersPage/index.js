import React, { Component, PropTypes } from 'react';
import { Flux } from 'flummox';
import FluxComponent from 'flummox/component';
import DocumentTitle from 'react-document-title';
import Search from '../../components/Search';
import Users from '../../components/Users';

export default class UsersPage extends Component {
  static propTypes = {
    query: PropTypes.shape({
      q: PropTypes.string
    }).isRequired,
    flux: PropTypes.instanceOf(Flux).isRequired
  };

  static contextTypes = {
    router: PropTypes.func.isRequired
  };

  static willRender(flux, state) {
    return flux.getActions('users').searchUsers(state.query.q);
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.usersStore = props.flux.getStore('users');
    this.usersActions = props.flux.getActions('users');

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
    if (query && !this.usersStore.isAlreadySearched(query)) {
      this.usersActions.searchUsers(query);
    }
  };

  handleSubmit(query) {
    if (query.length > 1) {
      this.context.router.transitionTo('/users?q=' + query);
    }
  };

  render() {
    return (
      <DocumentTitle title="SoundCloud Replica Search">
        <div className="groups">
          <Search
            q={this.state.q}
            handleSubmit={this.handleSubmit} />
          <FluxComponent
            q={this.state.q}
            connectToStores={{
              users: store => ({
                users: store.getUsersByQuery(this.state.q),
                isAlreadySearched: store.isAlreadySearched(this.state.q),
                isInProcess: store.isInProcess(this.state.q)
              })
            }}>
            <Users />
          </FluxComponent>
        </div>
      </DocumentTitle>
    );
  };
}
