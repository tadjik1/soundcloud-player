import React, { PropTypes, Component } from 'react';
import Tiles from '../../components/tiles';
import TilesStore from '../../stores/tiles';

export default class HomePage extends Component {

  constructor (props) {
    super(props);

    this.state = {
      tiles: TilesStore.getTiles()
    };
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
  };

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
        <Tiles tiles={this.state.tiles} />
      </div>
    );
  };
}
