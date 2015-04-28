import React from 'react';
import UserStore from 'stores/profile';
import UserActions from 'actions/UserAction';

let getUserInfo = () => {
  return UserStore.getUserInfo();
};

export default class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {};
    UserActions.getMe();
  };

  componentDidMount() {
    UserStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange.bind(this));
  };

  render() {
    let user = this.state;
    return (
      <div className="profile">
        <div className="page-header">
          <h1>Welcome to your profile</h1>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={user.avatar_url} alt={user.username} />
                <div className="caption">
                  <h3>{user.username}</h3>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  };

  _onChange() {
    this.setState(getUserInfo());
  };
}
