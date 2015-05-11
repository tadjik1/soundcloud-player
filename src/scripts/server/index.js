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

const templateFile = path.join(__dirname, 'views/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

const app = koa();
const port = process.env.PORT || 5000;

app.use(favicon('favicon.ico'));
app.use(serve(path.join(__dirname, 'public')));
app.use(function* appHandler() {
  const flux = new Flux();

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

    html = React.renderToString(
      <FluxComponent flux={flux}>
        <Handler {...state} />
      </FluxComponent>
    );
  } catch (error) {
    throw error;
  }

  this.body = template({
    title: 'hello',
    body: html
  });
});

app.listen(port, () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log(`The server is running at http://127.0.0.1:${port}`);
  }
});
