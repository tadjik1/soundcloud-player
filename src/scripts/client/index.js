import 'babel/polyfill';

import React from 'react';
import FluxComponent from 'flummox/component';
import router from '../shared/router';
import Flux from '../shared/Flux';
import initApp from '../shared/init';


document.addEventListener('DOMContentLoaded', () => {
  const flux = new Flux();
  if (window.flux) {
    try {
      flux.deserialize(JSON.stringify(window.flux));
    } catch (ignore) {}
  }
  initApp();

  router.run((Handler, state) => {
    React.render(
      <FluxComponent flux={flux}>
        <Handler {...state} />
      </FluxComponent>,
      document.getElementById('app')
    );
  });

  // export for http://fb.me/react-devtools
  window.React = React;
});
