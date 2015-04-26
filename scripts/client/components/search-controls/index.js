import React from 'react';

import QueryString from './query-string';
import TypesSwitch from './types-switch';
import TracksParams from './tracks-params';

export default class SearchControls extends React.Component {

  render() {
    let withTracks = (
      <div>
        <QueryString type={this.props.type} params={this.props.queryParams} />
        <TypesSwitch type={this.props.type} />
      </div>
    );

    let withoutTracks = (
      <div>
        <QueryString type={this.props.type} params={this.props.queryParams} />
        <TypesSwitch type={this.props.type} params={this.props.queryParams} />
        <TracksParams params={this.props.queryParams}/>
      </div>
    );

    // not very good decision, but can't figure out better solution
    // anyway, it's still better than mess up with "display: none" --
    // we just put necessary elements to DOM, that's it
    return this.props.type === 'tracks' ? withTracks : withoutTracks;
  }
}

// I guess it would be very heavy object =/
SearchControls.defaultProps = {

};
