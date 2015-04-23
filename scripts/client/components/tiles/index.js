import React from 'react';

export default class Tiles extends React.Component {
  render () {
    var tiles = [
      {
        link: '/search',
        text: 'Search',
        img: '/img/search.jpg'
      },
      {
        link: '/users',
        text: 'User list',
        img: '/img/users.jpg'
      }
    ];

    var tilesRendered = tiles.map((tile) => {
      return (
        <a href={tile.link}>
          <img src={tile.img} />
          <div>
            {tile.text}
          </div>
        </a>
      );
    });

    return (
      <div>
        {tilesRendered}
      </div>
    );
  }
}

