import React from 'react';

import QueryString from './query-string';
import TypesSwitch from './types-switch';
import TracksParams from './tracks-params';

import { DataTypes } from 'constants/SoundCloudAppConstants';

export default class SearchControls extends React.Component {

  render() {
    let withoutTracks = (
      <div>
        <QueryString query={this.props.queryParams.q}
                     updateQuery={this.props.updateQuery}
                     searchQuery={this.props.searchQuery} />
        <TypesSwitch type={this.props.type}
                     changeType={this.props.changeType} />
      </div>
    );

    let withTracks = (
      <div>
        <QueryString query={this.props.queryParams.q}
                     updateQuery={this.props.updateQuery}
                     searchQuery={this.props.searchQuery} />
        <TypesSwitch type={this.props.type}
                     changeType={this.props.changeType} />
        <TracksParams params={this.props.queryParams}/>
      </div>
    );

    // not very good decision above, but can't figure out better solution
    // anyway, it's still better than mess up with "display: none" --
    // we just put necessary elements to DOM, that's it
    return this.props.type === DataTypes.TRACKS ? withTracks : withoutTracks;
  }
}

// I guess it would be very heavy object =/
SearchControls.defaultProps = {
  type: DataTypes.TRACKS
};
