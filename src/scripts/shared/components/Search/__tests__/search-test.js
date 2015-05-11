/* global describe, it, expect, before */

import React from 'react/addons';
import stubRouterContext from '../../../utils/testUtils/stubRouterContext';
import Search from '../index';

const TestUtils = React.addons.TestUtils;
const Subject = stubRouterContext(Search, { q: 'lo' });

let Component, Input, Button, input, button;

describe('search component test cases', () => {
  before('render and locate element', () => {
    Component = TestUtils.renderIntoDocument(React.createElement(Subject));
    Input = TestUtils.findRenderedDOMComponentWithTag(Component, 'input');
    Button = TestUtils.findRenderedDOMComponentWithTag(Component, 'button');

    input = Input.getDOMNode();
    button = Button.getDOMNode();
  });

  it('should render input with right type', () => {
    expect(input.getAttribute('type')).to.equal('text');
  });

  it('should render input with query', () => {
    expect(input.value).to.equal('lo');
  });

  it('search button should be disabled', () => {
    expect(button.getAttribute('disabled')).to.equal('');
  });
});
