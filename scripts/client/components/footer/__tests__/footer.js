/* global describe, it */

import React from 'react/addons';
import Footer from '../footer';

const TestUtils = React.addons.TestUtils;


describe('it\'s an example of tests suite', () => {
  it('should be truth', () => {

    var Component = TestUtils.renderIntoDocument(React.createElement(Footer));

    TestUtils.findRenderedDOMComponentWithTag(Component, 'footer');

  });
});
