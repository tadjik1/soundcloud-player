import React from 'react';
import { DataTypes } from '../../constants/SoundCloudAppConstants';

import UserEntity from './user/';
import GroupEntity from './group/';
import TrackEntity from './track/';

export default class SingleEntity extends React.Component {
  render() {
    let el;

    switch (this.props.type) {
      case DataTypes.TYPE_TRACK:
        el = (<TrackEntity />);
        break;
      case DataTypes.TYPE_GROUP:
        el = (<GroupEntity />);
        break;
      case DataTypes.TYPE_USER:
        el = (<UserEntity />);
        break;
      default:
        el = (<div>Something went wrong...</div>);
    }

    return el;
  }
}
