import React from 'react';
import UserStore from 'stores/profile';
import UserActions from 'actions/UserAction';

let getUserInfo = () => {
  return {
    isLogin: UserStore.isLogin(),
    userName: UserStore.get('username')
  };
};

export default class LoginComponent extends React.Component {
  constructor() {
    super();

    this.state = getUserInfo();
    UserActions.getMe();
  };

  componentDidMount() {
    UserStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange.bind(this));
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isLogin && nextState.isLogin !== this.state.isLogin) UserActions.getMe();
  };

  handleClick() {
    if (this.state.isLogin) return true;  //if already login just redirect to profile page

    UserActions.doLogin();
  };

  render() {
    let href = this.state.isLogin ? '/profile' : '#';
    let title = this.state.isLogin ? this.state.userName : 'Login';
    return (
      <li>
        <a href={href} onClick={this.handleClick.bind(this)}>{title}</a>
      </li>
    );
  };

  _onChange() {
    this.setState(getUserInfo());
  };
}
