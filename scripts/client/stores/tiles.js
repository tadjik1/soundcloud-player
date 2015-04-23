var _data = {};

_data.tiles = [
      {
        link: '/search',
        text: 'Search',
        img: '/assets/img/search.jpg'
      },
      {
        link: '/profile',
        text: 'Your profile',
        img: 'assets/img/profile.png'
      }
    ];

export default {
  getTiles: () => {
    return _data.tiles;
  }
}