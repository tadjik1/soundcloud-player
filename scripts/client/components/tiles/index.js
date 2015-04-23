import React from 'react';

export default class Tiles extends React.Component {

  render() {
    let tilesRendered = this.props.tiles.map((tile) => {
      return (
        <div className="col-sm-6 col-md-6">
          <a className="tile" href={tile.link}>
            <img className="tile--img" src={tile.img} />
            <div className="tile--description">
              {tile.text}
            </div>
          </a>
        </div>
      );
    });

    return (
      <div className="col-md-6 col-md-offset-3">
        {tilesRendered}
      </div>
    );
  };
}

Tiles.defaultProps = { tiles: [] };
