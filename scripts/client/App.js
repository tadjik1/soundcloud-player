import React from 'react';

import NavBar from './components/navbar/navbar';
import HomePage from './pages/home/index';
import Footer from './components/footer/footer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <HomePage />
        <Footer/>
      </div>
    );
  }
}
