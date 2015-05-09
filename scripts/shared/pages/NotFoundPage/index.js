import React, { Component, PropTypes } from 'react';

export default class NotfoundPage extends Component {
  static propTypes = {
    flux: PropTypes.any
  };

  static contextTypes = {
    flux: PropTypes.any
  };

  render() {
    return (
      <h1>Sorry, the page you are looking doesn't exist.</h1>
    );
  };
}
