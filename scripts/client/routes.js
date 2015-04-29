import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './App';
import Home from 'pages/home';
import Users from 'pages/users';
import Groups from 'pages/groups';
import Playlists from 'pages/playlists';
import Tracks from 'pages/tracks';
import SoundCloudCallback from 'pages/SoundCloudCallback';
import NotFound from 'pages/notfound';

export default (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route path="/users" handler={Users}/>
    <Route path="/groups" handler={Groups}/>
    <Route path="/playlists" handler={Playlists}/>
    <Route path="/tracks" handler={Tracks}/>
    <Route name="SoundCloudCallback" path="/callback" handler={SoundCloudCallback}/>
    <NotFoundRoute name="notfound" handler={NotFound}/>
  </Route>
);
