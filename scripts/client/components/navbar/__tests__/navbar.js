/* global describe, it */

import React, { PropTypes } from 'react';
import Addons from 'react/addons';
import stubRouterContext from '../test-stub/stubRouterContext';
import NavBar from '../navbar';

const TestUtils = Addons.addons.TestUtils;
const Subject = stubRouterContext(NavBar, {});

describe('NavBar test', () => {
  it('should render with right tagName', () => {
    let Component = TestUtils.renderIntoDocument(React.createElement(Subject));
    TestUtils.findRenderedDOMComponentWithTag(Component, 'nav');
  });
});
