import React from 'react';
import { DataTypes } from 'constants/SoundCloudAppConstants';
import SearchStore from 'stores/search';

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
    this.props.changeType(type);
  }
}

TypesSwitch.defaultProps = {
  type: DataTypes.TRACKS
};
