import React from 'react';
import SearchStore from '../../../stores/search/index';
import SearchActions from '../../../actions/SearchActions';

export default class TypesSwitch extends React.Component {

  render() {
    let btns = SearchStore.getSearchEntities().map((entity) => {
      let classList = 'btn btn-default' + (this.props.type === entity.type ? ' active' : '');

      return (
        <button type="button" className={classList}
                onClick={this.updateSearchType.bind(this, entity.type)}>
          {entity.text}
        </button>
      );
    });

    return (
      <div className="btn-group" role="group">
        {btns}
      </div>
    );
  }

  updateSearchType(type) {
    if (type !== this.props.type) {
      SearchActions.updateSearchType(type);
      SearchActions.fetchData(type, this.props.params);
    }
  }
}

let searchOrder = SearchStore.getSearchEntities();

TypesSwitch.defaultProps = {
  type: searchOrder && searchOrder[0] ? searchOrder[0] : ''
};
