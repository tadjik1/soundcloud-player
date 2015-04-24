import EventEmmiter from 'eventemitter3';
import { Set } from 'immutable';

const data = Symbol();

class TilesStore {
  constructor() {
    Object.assign(this, new EventEmmiter());

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
