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

    try {
      Router.run(routes, this.url, (Root, state) => {
        const html = React.renderToString(
          <FluxComponent flux={flux}>
            <Root {...state} />
          </FluxComponent>
        );

        console.log(html);

        this.body = 'lala';
      });
    } catch (error) {
      throw error;
    }
  });
}
