import React from 'react';

export default class LoginPage extends React.Component {
  constructor() {
    super();

    try {
      window.opener.setTimeout(window.opener.SC.connectCallback, 1);
    } catch (ignore) {}
  };

  render() {
    return (
      <h1>This popup should automatically close in a few seconds</h1>
    );
  };
}
