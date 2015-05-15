import 'babel/polyfill';
import koa from 'koa';
import favicon from 'koa-favicon';
import serve from 'koa-static';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import React from 'react';
import FluxComponent from 'flummox/component';
import Router from 'react-router';
import routes from '../shared/routes';
import Flux from '../shared/Flux';
import initApp from '../shared/init';

const templateFile = path.join(__dirname, 'views/index-nodejs.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

const app = koa();
const port = process.env.PORT || 5000;

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(serve(path.join(__dirname, 'public')));
app.use(function* appHandler() {
  const flux = new Flux();

  initApp();

  const router = Router.create({
    routes: routes,
    location: this.url,
    onError: error => {
      throw error;
    },
    onAbort: abortReason => {
      throw new Error(abortReason);
    }
  });

  let html;

  try {
    const { Handler, state } = yield new Promise((resolve) => {
      router.run((_Handler, _state) => {
        resolve({ Handler: _Handler, state: _state });
      });
    });

    yield state.routes.map((route) => {
    //  call willRender on all routes to get async data
      return route.handler.willRender && route.handler.willRender(flux, state);
    }).filter(Boolean);

    html = React.renderToString(
      <FluxComponent flux={flux}>
        <Handler {...state} />
      </FluxComponent>
    );

    this.body = template({
      title: 'hello',
      body: html,
      flux: flux.serialize()
    });
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log(`The server is running at http://127.0.0.1:${port}`);
  }
});
