import React from 'react';
import { RouteHandler } from 'react-router';

import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <RouteHandler {...this.props} key={this.props.pathname}/>
        <Footer/>
      </div>
    );
  }
}
