import React, { PropTypes } from 'react';

export default class SearchForm extends React.Component {
  static propTypes = {
    doSearch: PropTypes.func.isRequired,
    queryChangeHandler: PropTypes.func.isRequired,
    sectionChangeHandler: PropTypes.func.isRequired

    //query and section state?
  };

  constructor() {
    super();
  };

  render() {
    // return some jsx
  };
}
