import React, { Component } from 'react';

export default class HomePage extends Component {
  render() {
    return (
      <div className="clearfix">
        <h1 className="tac title">
          SoundCloud Replica
        </h1>
        <div className="col-md-8 col-md-offset-2 description tac">
          This is an attempt to build robust software inspired by Flux ideology.
          It has a typical stack consisting of facebook React, Dispatcher and basic concept of
          Stores and Action Lists.
          By its functionality it's pretty similar to SoundCloud and has some it's pages, that's it.
          And, of course, it uses Babel for all ES6 and even ES7 (async/await in particular)
          and WebPack as development environment.
        </div>
      </div>
    );
  };
}
