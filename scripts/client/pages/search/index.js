import React from 'react';

// actions section
import SearchStore from '../../stores/search/';

// components section
import SearchControls from '../../components/search-controls';
import SearchResults from '../../components/search-results';

let getStateFromStores = () => {
  return {
    queryParams: SearchStore.getQueryParams(),
    type: SearchStore.getType(),
    results: SearchStore.getResults()
  };
};

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();
  };

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange.bind(this));
  };

  render() {
    let state = this.state;
    let type = state.type;

    return (
      <div className="search">
        <SearchControls type={type} queryParams={state.queryParams[type]} />
        <SearchResults type={type} results={state.results} />
      </div>
    );
  };

  _onChange() {
    this.setState(getStateFromStores());
  };
}
