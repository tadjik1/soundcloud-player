import React, { Component } from 'react';
import FluxComponent from 'flummox/component';
import DocumentTitle from 'react-document-title';
import { compact } from 'lodash';
import User from '../../components/User';
import Users from '../../components/Users';

function pickUserId({ params }) {
  return params.userId;
}

export default class UserPage extends Component {
  static willRender(flux, state) {
    return Promise.all([
      flux.getActions('users').fetchUser(pickUserId(state)),
      flux.getActions('users').fetchFollowers(pickUserId(state)),
      flux.getActions('users').fetchFollowings(pickUserId(state))
    ]);
  };

  constructor(props) {
    super(props);

    // actions
    this.usersActions = props.flux.getActions('users');

    // stores
    this.usersStore = props.flux.getStore('users');
    this.followersStore = props.flux.getStore('usersFollowers');
    this.followingsStore = props.flux.getStore('usersFollowings');
  };

  componentWillMount() {
    this.fetchData(pickUserId(this.props));
  };

  fetchData(userId) {
    if (!userId) return;

    if (!this.usersStore.get(userId)) {
      this.usersActions.fetchUser(userId);
    }

    if (!this.followersStore.isAlreadyFetched(userId)) {
      this.usersActions.fetchFollowers(userId);
    }

    if (!this.followingsStore.isAlreadyFetched(userId)) {
      this.usersActions.fetchFollowings(userId);
    }
  };

  render() {
    const userId = pickUserId(this.props);
    return (
      <DocumentTitle title="SoundCloud Replica User">
        <div className="container-fluid groups">
          <div className="row">
            <FluxComponent
              connectToStores={{
                users: (store) => ({
                  user: store.get(userId)
                })
              }}>
              <User />
            </FluxComponent>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h1>Followers</h1>
              <FluxComponent
                connectToStores={['users', 'usersFollowers']}
                stateGetter={([usersStore, usersFollowersStore]) => ({
                  users: compact(usersFollowersStore.getFollowers(userId).map(id => usersStore.get(id))),
                  isAlreadyFetched: usersFollowersStore.isAlreadyFetched(userId),
                  isInProcess: usersFollowersStore.isInProcess(userId)
              })}>
                <Users />
              </FluxComponent>
            </div>
            <div className="col-md-6">
              <h1>Followings</h1>
              <FluxComponent
                connectToStores={['users', 'usersFollowings']}
                stateGetter={([usersStore, usersFollowingsStore]) => ({
                  users: compact(usersFollowingsStore.getFollowings(userId).map(id => usersStore.get(id))),
                  isAlreadyFetched: usersFollowingsStore.isAlreadyFetched(userId),
                  isInProcess: usersFollowingsStore.isInProcess(userId)
              })}>
                <Users />
              </FluxComponent>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  };
}
