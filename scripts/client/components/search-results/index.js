import React from 'react';

import ListEntities from '../list-entities/';

export default class SearchResults extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Found ... results
        </h2>
        <ListEntities type={this.props.type} results={this.props.results} />
      </div>
    );
  }
}
