import React from 'react';

export default class TrackEntity extends React.Component {

  render() {
    let item = this.props.data;

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={item.waveform_url} alt={item.description} />
            <div className="caption">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

