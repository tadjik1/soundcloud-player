import React, { PropTypes, Component } from 'react';
import { RouteHandler } from 'react-router';

import NavBar from 'components/Navbar';
import Footer from 'components/Footer';

export default class AppHandler extends Component {
  static contextTypes = {
    flux: PropTypes.any
  };

  static propTypes = {
    flux: PropTypes.any
  };

  render() {
    console.log(this.props, this.context);
    return (
      <div>
        <div className="container-fluid">
          <NavBar {...this.props} />
          <RouteHandler {...this.props} key={this.props.pathname}/>
        </div>
        <Footer/>
      </div>
    );
  };
}
