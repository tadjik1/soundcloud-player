import React from 'react';

import SingleEntity from '../single-entity/';

export default class SearchResults extends React.Component {

  render() {
    let res = this.props.results.map((el) => {
      return (
        <SingleEntity type={this.props.type} data={el} />
      );
    });

    return (
      <div>
        Here would be our search results
        {res}
      </div>
    );
  }

}

SearchResults.defaultProps = {
  type: '',
  results: []
};
