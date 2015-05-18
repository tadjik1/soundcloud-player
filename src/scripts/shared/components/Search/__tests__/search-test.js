/* global describe, it, expect, before */

import React from 'react/addons';
import stubRouterContext from '../../../utils/testUtils/stubRouterContext';
import Search from '../index';

const TestUtils = React.addons.TestUtils;
const Subject = stubRouterContext(Search, {
  q: 'lo',
  action: '/someurl',
  placeholder: 'search',
  title: 'search',
  handleSubmit: () => {}
});

let Component, Input, Button, input, button;

describe('search component test cases', () => {
  before('render and locate element', () => {
    Component = TestUtils.renderIntoDocument(React.createElement(Subject));
    Input = TestUtils.findRenderedDOMComponentWithTag(Component, 'input');
    Button = TestUtils.findRenderedDOMComponentWithTag(Component, 'button');
    // Form = TestUtils.findRenderedDOMComponentWithTag(Component, 'form');

    input = Input.getDOMNode();
    button = Button.getDOMNode();
    // form = Form.getDOMNode();
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

  it('should invoke change handler and set state', () => {
    //TestUtils.Simulate.click(input);
    //TestUtils.Simulate.change(input, {target: {value: 'Hello, world'}});
    //TestUtils.Simulate.submit(form);
  });
});
