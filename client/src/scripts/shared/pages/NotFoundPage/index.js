import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

export default class NotfoundPage extends Component {
  render() {
    return (
      <DocumentTitle title="SoundCloud Replica">
        <h1>Sorry, the page you are looking doesn't exist.</h1>
      </DocumentTitle>
    );
  };
}
