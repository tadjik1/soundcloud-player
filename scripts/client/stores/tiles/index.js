import { Set } from 'immutable';
import Store from '../Store';

const data = Symbol();

class TilesStore extends Store {
  constructor() {
    super();

    this[data] = {
      tiles: new Set([
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
      ])
    };
  };

  getTiles() {
    return this[data].tiles;
  };
}

export default new TilesStore();
