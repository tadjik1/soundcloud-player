import React, { Component, PropTypes } from 'react';
import { Flux } from 'flummox';
import FluxComponent from 'flummox/component';
import DocumentTitle from 'react-document-title';
import Search from '../../components/Search';
import Users from '../../components/Users';

function pickQuery(props) {
  return props.query.q || '';
}

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

    // it's like a decorator for binding context
    this.handleSubmit = this.handleSubmit.bind(this);

    // shortcuts for a stores and action creators
    this.usersStore = props.flux.getStore('users');
    this.usersActions = props.flux.getActions('users');
  };

  componentWillMount() {
    this.doSearchUsers(pickQuery(this.props));
  };

  componentWillReceiveProps(nextProps) {
    this.doSearchUsers(pickQuery(nextProps));
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
    const query = pickQuery(this.props);
    return (
      <DocumentTitle title="SoundCloud Replica Search">

        <div className="groups">

          <FluxComponent
            q={query}
            handleSubmit={this.handleSubmit}
            connectToStores={{
              usersPage: (store) => ({
                title: store.getTitle(),
                placeholder: store.getPlaceholder(),
                action: store.getAction()
              })
            }}>
            <Search />
          </FluxComponent>

          <FluxComponent
            q={query}
            connectToStores={{
              users: (store, props) => ({
                users: store.getUsersByQuery(props.q),
                isAlreadySearched: store.isAlreadySearched(props.q),
                isInProcess: store.isInProcess(props.q)
              })
            }}>
            <Users />

          </FluxComponent>

        </div>

      </DocumentTitle>
    );
  };
}
