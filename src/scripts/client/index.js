import 'babel/polyfill';

import React from 'react';
import FluxComponent from 'flummox/component';
import router from '../shared/router';
import Flux from '../shared/Flux';

const flux = new Flux();

let SCInitializeParams = {
  client_id: '8245587a488fdb47747133be16133e4f',
  redirect_uri: 'http://127.0.0.1:3000/callback'
};

let token = localStorage.getItem('oauth_token');

if (token) {
  SCInitializeParams.access_token = token;
}

SC.initialize(SCInitializeParams);

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
