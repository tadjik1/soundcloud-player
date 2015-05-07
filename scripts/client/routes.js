import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'components/App';
import HomePage from 'pages/HomePage';
import UsersPage from 'pages/UsersPage';
import NotFoundPage from 'pages/NotFoundPage';
import SoundCloudCallback from 'pages/SoundCloudCallback';

export default (
  <Route handler={App}>
    <DefaultRoute name="home" handler={HomePage}/>
    <Route name="users" path="/users" handler={UsersPage}/>
    <Route name="SoundCloudCallback" path="/callback" handler={SoundCloudCallback}/>
    <NotFoundRoute name="notfound" handler={NotFoundPage}/>
  </Route>
);
