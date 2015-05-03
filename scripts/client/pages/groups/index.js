import React, { PropTypes, Component } from 'react';
import DocumentTitle from 'react-document-title';
//components
import SearchControls from 'components/SearchControls';
import SearchResults from 'components/SearchResults';

//stores
import GroupsPageStore from './stores/groupPage';

let getStateFromStore = () => {
  const { title, placeholder } = GroupsPageStore.getProps();
  return { title, placeholder };
};

export default class GroupsPage extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, getStateFromStore(), {
      query: props.query.q || ''
    });
  };

  static contextTypes = {
    router: PropTypes.func.isRequired
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.query.q !== this.state.query) {
      this.setState({
        query: nextProps.query.q || ''
      });
    }
  };

  render() {
    return (
      <DocumentTitle title={this.state.query ? this.state.query + ' search' : 'Groups Search'}>
        <div className="groups">
          <SearchControls title={this.state.title}
                           query={this.state.query}
                           placeholder={this.state.placeholder} />

          <SearchResults query={this.state.query} />
        </div>
      </DocumentTitle>
    );
  };
}
