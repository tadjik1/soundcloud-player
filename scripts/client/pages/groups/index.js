import React, { PropTypes, Component } from 'react';
import DocumentTitle from 'react-document-title';
import { capitalize } from 'utils/stringFunctions';

import SearchControls from 'components/SearchControls';
import SearchResults from './components/SearchResults';

import UIStore from './stores/ui-store';

let getStateFromStore = () => {
  const { title, placeholder, url } = UIStore.getProps();
  return { title, placeholder, url };
};

let parseQuery = (params) => {
  const { query } = params;
  return query.q || '';
};

export default class GroupsPage extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = getStateFromStore();
  };

  render() {
    const q = parseQuery(this.props);
    return (
      <DocumentTitle title={q ? capitalize(q) + ' Search' : 'SoundCloud Replica Search'}>
        <div className="groups">
          <SearchControls title={this.state.title}
                          query={q}
                          url={this.state.url}
                          placeholder={this.state.placeholder} />
          <SearchResults q={q} />
        </div>
      </DocumentTitle>
    );
  };
}
