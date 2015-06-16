import React, { Component, PropTypes } from 'react';
import FluxComponent from 'flummox/component';
import DocumentTitle from 'react-document-title';
import { compact } from 'lodash';
import Search from '../../components/Search';
import Users from '../../components/Users';

function pickQuery(props) {
  return props.query.q || '';
}

export default class UsersPage extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired
  };

  static willRender(flux, state) {
    return flux.getActions('users').searchUsers(pickQuery(state));
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.usersStore = props.flux.getStore('users');
    this.usersSearchStore = props.flux.getStore('usersSearch');
    this.usersActions = props.flux.getActions('users');
  };

  componentWillMount() {
    this.doSearchUsers(pickQuery(this.props));
  };

  componentWillReceiveProps(nextProps) {
    this.doSearchUsers(pickQuery(nextProps));
  };

  doSearchUsers(query) {
    if (!this.usersSearchStore.isAlreadySearched(query)) {
      this.usersActions.searchUsers(query);
    }
  };

  handleSubmit(query) {
    if (query.length > 1) {
      this.context.router.transitionTo('/users?q=' + query);
    }
  };

  render() {
    const query = pickQuery(this.props);
    return (
      <DocumentTitle title="SoundCloud Replica Search">
        <div className="groups">
          <FluxComponent
            q={query}
            handleSubmit={this.handleSubmit}
            connectToStores={'usersPage'}
            stateGetter={(usersPageStore) => ({
              title: usersPageStore.getTitle(),
              placeholder: usersPageStore.getPlaceholder(),
              action: usersPageStore.getAction()
          })}>
            <Search />
          </FluxComponent>

          <FluxComponent
            q={query}
            connectToStores={['users', 'usersSearch']}
            stateGetter={([usersStore, usersSearchStore], props) => ({
              users: compact(usersSearchStore.getUsersByQuery(props.q).map(id => usersStore.get(id))),
              isAlreadyFetched: usersSearchStore.isAlreadySearched(props.q),
              isInProcess: usersSearchStore.isInProcess(props.q)
          })}>
            <Users />
          </FluxComponent>
        </div>
      </DocumentTitle>
    );
  };
}
