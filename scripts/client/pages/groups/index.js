import React, { PropTypes, Component } from 'react';
//shared components
import SearchComponent from 'components/search';

//it's shared stores and actions. we use it for manipulate real data
import GroupActionCreators from 'actions/view/GroupActionCreators';

//it's our "local" stores and (actions?). we use it only for UI
//and we can not use it on other page
import SearchStore from './stores/search';
import SearchActionCreators from './actions/search';
import SearchResults from './components/SearchResults';

let getStateFromStore = () => {
  const { title, placeholder, query } = SearchStore.getProps();
  return { title, placeholder, query };
};

export default class GroupsPage extends Component {
  constructor(props) {
    super(props);

    if (props.q) SearchActionCreators.setQuery(props.query);

    this.state = getStateFromStore();
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    q: PropTypes.string
  };

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange.bind(this));
  };

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange.bind(this));
  };

  onSearchFormSubmit(event) {
    event.preventDefault();

    GroupActionCreators.searchGroups(this.state.query);
  };

  onQueryChange(event) {
    SearchActionCreators.setQuery(event.target.value);
  };

  render() {
    return (
      <div className="groups">
        <SearchComponent title={this.state.title}
                         query={this.state.query}
                         placeholder={this.state.placeholder}
                         onSearchFormSubmit={this.onSearchFormSubmit.bind(this)}
                         onQueryChange={this.onQueryChange.bind(this)} />

        <SearchResults query={this.state.query} />
      </div>
    );
  };

  _onChange() {
    this.setState(getStateFromStore());
  }
}
