/* global describe, it */

import React from 'react/addons';
import Footer from '../index';

const TestUtils = React.addons.TestUtils;

describe('it\'s an example of tests suite', () => {
  it('should be truth', () => {
    let Component = TestUtils.renderIntoDocument(React.createElement(Footer));
    TestUtils.findRenderedDOMComponentWithTag(Component, 'footer');
  });
});