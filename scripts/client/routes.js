import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './App';
import Home from './pages/home';
import Search from './pages/search';
import Login from './pages/login';
import SoundCloudCallback from './pages/SoundCloudCallback';
import NotFound from './pages/notfound';

export default (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="search" path="/search" handler={Search}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="SoundCloudCallback" path="/callback" handler={SoundCloudCallback}/>
    <NotFoundRoute name="notfound" handler={NotFound}/>
  </Route>
);
