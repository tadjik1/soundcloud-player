import React from 'react';
import UserStore from '../../../../stores/user';
import UserActions from '../../../../actions/UserAction';

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
  };

  componentDidMount() {
    UserStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange.bind(this));
  };

  handleClick(event) {
    if (this.state.isLogin) return true;  //if already login just redirect to profile page

    //I have no idea, but it doesn't work. I don't wanna redirect user to login page - it's unnecessary.
    event.preventDefault();
    event.stopPropagation();
    UserActions.doLogin();
  };

  render() {
    let href = this.state.isLogin ? '/profile' : '/login';
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
