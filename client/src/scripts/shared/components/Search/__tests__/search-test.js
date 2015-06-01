/* global describe, it, expect, before */

import React from 'react/addons';
import Search from '../index';

const TestUtils = React.addons.TestUtils;

let Component, Input, Button, input, button;

function handleSubmit(query) {
  console.log(query);
}

describe('search component test cases', () => {
  before('render and locate element', () => {
    Component = TestUtils.renderIntoDocument(
      <Search q="lo" action="/someurl" placeholder="search" title="search" handleSubmit={handleSubmit} />
    );
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

  it('should invoke change handler and set state', () => {
    TestUtils.Simulate.change(input, {target: {value: 'Hello, world'}});
    expect(Component.state.q).to.equal('Hello, world');
  });
});
