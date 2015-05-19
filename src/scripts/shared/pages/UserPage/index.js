import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

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
    return (
      <DocumentTitle title="SoundCloud Replica Home">
        <div className="clearfix">
          <h1 className="tac title">
            SoundCloud Replica
          </h1>
          <div className="col-md-8 col-md-offset-2 description tac">
            This is User Page
          </div>
        </div>
      </DocumentTitle>
    );
  };
}
