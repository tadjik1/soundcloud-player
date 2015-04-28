import React from 'react';
import { DataTypes } from '../../constants/SoundCloudAppConstants';

import UserEntity from './user/';
import GroupEntity from './group/';
import TrackEntity from './track/';

export default class SingleEntity extends React.Component {
  render() {
    let el;

    switch (this.props.type) {
      case DataTypes.TRACKS:
        el = (<TrackEntity data={this.props.data} />);
        break;
      case DataTypes.GROUPS:
        el = (<GroupEntity data={this.props.data} />);
        break;
      case DataTypes.USERS:
        el = (<UserEntity data={this.props.data} />);
        break;
      default:
        el = (<div>Something went wrong...</div>);
    }

    return el;
  }
}
