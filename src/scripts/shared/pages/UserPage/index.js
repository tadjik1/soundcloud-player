import React, { Component } from 'react';
import FluxComponent from 'flummox/component';
import DocumentTitle from 'react-document-title';
import User from '../../components/User';

function pickUserId({ params }) {
  return params.userId;
}

export default class UserPage extends Component {

  constructor(props) {
    super(props);

    // actions
    this.usersActions = props.flux.getActions('users');

    // stores
    this.usersStore = props.flux.getStore('users');
  };

  componentWillMount() {
    this.doFetchUser(pickUserId(this.props));
  };

  doFetchUser(userId) {
    if (userId && !this.usersStore.isAlreadyFetched(userId)) {
      this.usersActions.fetchUser(userId);
    }
  };

  render() {
    const id = pickUserId(this.props);
    return (
      <div className="container-fluid groups">
        <div className="row">
          <FluxComponent
            connectToStores={{
            users: (store) => ({
              user: store.getUserById(id)
            })
          }}>
            <User />
          </FluxComponent>
        </div>
      </div>
    );
  };
}
