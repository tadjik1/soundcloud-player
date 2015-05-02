import React, { PropTypes, Component } from 'react';

//components
import SearchComponent from 'components/search';
import SearchResults from 'components/SearchResults';

//stores
import SearchStore from './stores/search';

let getStateFromStore = () => {
  const { title, placeholder } = SearchStore.getProps();
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
      <div className="groups">
        <SearchComponent title={this.state.title}
                         query={this.state.query}
                         placeholder={this.state.placeholder} />

        <SearchResults query={this.state.query} />
      </div>
    );
  };
}
