import React, { Component } from 'react';
import FluxComponent from 'flummox/component';
import DocumentTitle from 'react-document-title';
import User from '../../components/User';
import Users from '../../components/Users';

function pickUserId({ params }) {
  return params.userId;
}

export default class UserPage extends Component {
  static willRender(flux, state) {
    return flux.getActions('users').fetchUser(pickUserId(state));
  };

  constructor(props) {
    super(props);

    // actions
    this.usersActions = props.flux.getActions('users');

    // stores
    this.usersStore = props.flux.getStore('users');
  };

  componentWillMount() {
    this.fetchUser(pickUserId(this.props));
  };

  fetchUser(userId) {
    if (userId && !this.usersStore.getUserById(userId).id) {
      this.usersActions.fetchUser(userId);
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
                  user: store.getUserById(userId)
                })
              }}>
              <User />
            </FluxComponent>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h1>Followers</h1>
              <FluxComponent
                connectToStores={{
                  users: (store) => ({
                    users: store.getFollowers(userId)
                  })
                }}>
                <Users />
              </FluxComponent>
            </div>

            <div className="col-md-6">
              <h1>Followings</h1>
              <FluxComponent
                connectToStores={{
                  users: (store) => ({
                    users: store.getFollowings(userId)
                  })
                }}>
                <Users />
              </FluxComponent>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  };
}
