import React, { PureComponent, PropTypes } from 'react';
import { mount } from 'enzyme';
import dragDropContext from './index';
import storeKey from '../../state/get-store-key';

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

/* eslint-disable no-console */
describe('DragDropContext', () => {
  it('should put a store on the context', () => {
    // react will log an error when cannot find the correct context
    // TODO: check that tests run on build using NODE_ENV=development
    sinon.spy(console, 'error');

    const Connected = dragDropContext(App);

    mount(Connected);

    expect(console.error.called).to.equal(false);

    console.error.restore();
  });
});
