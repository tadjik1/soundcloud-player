import React from 'react';
import Tiles from '../../components/tiles';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>
          SoundCloud Replica
        </h1>
        <div>
          This is an attempt to build robust software inspired by Flux ideology.
          It has a typical stack consisting of facebook React, Dispatcher and basic concept of 
          Stores and Action Lists.
          By its functionality it's pretty similar to SoundCloud and has some it's pages, that's it.
          And, of course, it uses Babel for all ES6 and even ES7 (async/await in particular) 
          and WebPack as development environment.
        </div>
        <Tiles />
      </div>
    );
  }
}
