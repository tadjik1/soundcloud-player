import 'babel/polyfill';
import url from 'url';
import React from 'react';
import Router from 'react-router';

import routes from './routes';

const router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

router.run((Handler, state) => {
  React.render(
    <Handler {...state} />,
    document.body
  );
});

// export for http://fb.me/react-devtools
window.React = React;

SC.initialize({
  client_id: '8245587a488fdb47747133be16133e4f'
});

document.onclick = event => {
  let el = event.target;

  while (el && el.parentNode) {
    if (el.tagName === 'A') break;
    el = el.parentNode;
  }
  if (!el || el.tagName !== 'A') return;

  const href = el.getAttribute('href');

  if (!href) return;

  const resolvedHref = url.resolve(window.location.href, href);
  const { host, path } = url.parse(resolvedHref);

  if (host === window.location.host) {
    event.preventDefault();
    router.transitionTo(path);
  }
};
