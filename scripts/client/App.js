import React from 'react';
import { RouteHandler } from 'react-router';

import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';

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
