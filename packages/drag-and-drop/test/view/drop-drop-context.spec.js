// @flow
import React, { PureComponent, PropTypes } from 'react';
import { mount } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import { dragDropContext } from '../../src/';
import storeKey from '../../src/state/get-store-key';

class App extends PureComponent {
  static contextTypes = {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return <div>hello world!</div>;
  }
}

describe('DragDropContext', () => {
  it('should put a store on the context', () => {
    const Connected = dragDropContext()(App);

    // using react test utils to allow access to nested contexts
    const tree = TestUtils.renderIntoDocument(
      <Connected />
    );

    const app = TestUtils.findRenderedComponentWithType(tree, App);

    expect(app.context[storeKey]).to.have.property('dispatch').that.is.a('function');
    expect(app.context[storeKey]).to.have.property('getState').that.is.a('function');
    expect(app.context[storeKey]).to.have.property('subscribe').that.is.a('function');
  });

  describe('hooks', () => {
    it('should call the onDragStart hook when a drag starts', () => {

    });

    it('should call the onDragEnd hook when a drag ends', () => {

    });
  });
});
