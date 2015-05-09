import fs from 'fs';
import _ from 'lodash';

import React from 'react';
import FluxComponent from 'flummox/component';
import Router from 'react-router';
import routes from '../shared/routes';
import AppFlux from '../shared/AppFlux';

const templateFile = './views/index.html';
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

export default function(app) {
  app.use(function* appHandler() {
    const flux = new AppFlux();

    const router = Router.create({
      routes: routes,
      location: this.url,
      onError: error => {
        throw error;
      }
    });

    let appString;

    try {
      router.run((Handler, state) => {
        appString = React.renderToString(
          <FluxComponent flux={flux}>
            <Handler {...state} />
          </FluxComponent>
        );

        this.body = template({
          body: appString
        });
      });
    } catch (error) {
      throw error;
    }
  });
}
