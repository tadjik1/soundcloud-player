import React from 'react';
import { RouteHandler } from 'react-router';

import NavBar from 'components/Navbar';
import Footer from 'components/Footer';

export default class App extends React.Component {
  render() {
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
