import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './App';
import Home from 'pages/home';
import SoundCloudCallback from 'pages/SoundCloudCallback';
import NotFound from 'pages/notfound';

export default (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="SoundCloudCallback" path="/callback" handler={SoundCloudCallback}/>
    <NotFoundRoute name="notfound" handler={NotFound}/>
  </Route>
);
