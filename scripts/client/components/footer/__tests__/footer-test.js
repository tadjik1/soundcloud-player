/* global describe, it, before, expect */

import React from 'react/addons';
import Footer from '../index';

const TestUtils = React.addons.TestUtils;

let Component, footer, p;

describe('footer test suite', () => {
  before('render component', () => {
    Component = TestUtils.renderIntoDocument(React.createElement(Footer));
    footer = TestUtils.findRenderedDOMComponentWithTag(Component, 'footer');
    p = TestUtils.findRenderedDOMComponentWithTag(Component, 'p');
  });

  it('should render footer with right tag', () => {
    expect(footer.getDOMNode().tagName).to.equal('FOOTER');
  });

  it('should correctly print the years range', () => {
    expect(p.getDOMNode().textContent).to.equal('© SoundCloud Replica 2015');
  });
});
