// @flow
import React, { PureComponent, PropTypes } from 'react';
import { mount } from 'enzyme';
import { beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import { dragDropContext, draggable, droppable } from '../../../src/';
import DragHandle from '../../../src/view/drag-handle/drag-handle';
import storeKey from '../../../src/state/get-store-key';
import { dispatchWindowMouseEvent, liftWithMouse, withKeyboard } from './util';
import type { DraggableLocation, DraggableId, DroppableId } from '../../../src/types';
import type { Hooks } from '../../../src/view/drag-drop-context/hooks';

const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');
const windowMouseUp = dispatchWindowMouseEvent.bind(null, 'mouseup');
const cancelWithKeyboard = withKeyboard('Escape');

class App extends PureComponent {
  // Part of react's api is to use flow types for this.
  // Sadly cannot use flow
  static contextTypes = {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return <div>hi there</div>;
  }
}

describe.only('DragDropContext', () => {
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

  it('should pass through props to the unconnected component', () => {
    const Connected = dragDropContext()(App);
    const wrapper = mount(<Connected superhero="batman" />);

    expect(wrapper.find(App).props().superhero).to.equal('batman');
  });

  describe('hooks', () => {
    let clock;
    let hooks: Hooks = {};
    let wrapper;

    const draggableId: DraggableId = 'drag-1';
    const droppableId: DroppableId = 'drop-1';

    const listBox = {
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
      height: 100,
      width: 100,
    };

    const itemBox = {
      top: 20,
      right: 80,
      bottom: 80,
      left: 20,
      height: 60,
      width: 60,
    };

    const getMountedApp = () => {
      const Item = (() => {
        class ItemUnconnected extends PureComponent {
          props: {|
            innerRef: Function,
          |}
          render() {
            return (
              <div ref={this.props.innerRef}>
                Hello world
              </div>
            );
          }
        }
        const provide = () => ({
          id: draggableId,
        });

        return draggable('ITEM', provide)(ItemUnconnected);
      })();
      const List = (() => {
        class ListUnconnected extends PureComponent {
          props: {|
            innerRef: Function,
            children?: any,
          |}
          render() {
            return (
              <div ref={this.props.innerRef}>
                {this.props.children}
              </div>
            );
          }
        }
        const provide = () => ({
          id: droppableId,
        });
        return droppable('ITEM', 'vertical', provide)(ListUnconnected);
      })();
      const Root = (() => {
        const RootUnconnected = ({ children }) => children;
        return dragDropContext(hooks)(RootUnconnected);
      })();

      sinon.stub(Element.prototype, 'getBoundingClientRect');

      // First is to get the center position of the draggable
      Element.prototype.getBoundingClientRect.onCall(0).returns(itemBox);

      // Second is to get the dimensions of the list (parent)
      Element.prototype.getBoundingClientRect.onCall(1).returns(listBox);

      // Third is to get the dimensions of the item (child)
      Element.prototype.getBoundingClientRect.onCall(2).returns(itemBox);

      // stubbing out
      sinon.stub(window, 'getComputedStyle').returns({
        marginTop: '0',
        marginRight: '0',
        marginBottom: '0',
        marginLeft: '0',
      });

      return mount(
        <Root>
          <List>
            <Item />
          </List>
        </Root>
      );
    };

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      hooks = {
        onDragStart: sinon.stub(),
        onDragEnd: sinon.stub(),
      };
      wrapper = getMountedApp();
    });

    afterEach(() => {
      clock.restore();

      // clean up any loose events
      wrapper.unmount();

      // clean up any stubs
      if (Element.prototype.getBoundingClientRect.restore) {
        Element.prototype.getBoundingClientRect.restore();
      }
      if (window.getComputedStyle.restore) {
        window.getComputedStyle.restore();
      }
    });

    const drag = (() => {
      const start = () => {
        liftWithMouse(
          wrapper.find(DragHandle),
          itemBox.left + 1,
          itemBox.bottom + 1
        );
        // Need to wait for the nested async lift action to complete
        // this takes two async actions. However, this caller should not
        // know that - so ticking '10ms' to indicate that this is a nested async
        clock.tick(10);
      };

      const move = () => windowMouseMove(10, 20);

      const stop = () => {
        windowMouseUp();

        // flush the return to home animation
        requestAnimationFrame.flush();

        // animation finishing waits a tick before calling the callback
        clock.tick();
      };

      const cancel = () => {
        cancelWithKeyboard(wrapper.find(DragHandle));
      };

      const perform = () => {
        start();
        move();
        stop();
      };

      return { start, move, stop, cancel, perform };
    })();

    describe('drag start', () => {
      it('should call the onDragStart hook when a drag starts', () => {
        drag.start();

        const args = hooks.onDragStart.args[0];
        const start: DraggableLocation = {
          droppableId,
          index: 0,
        };
        expect(hooks.onDragStart.called).to.equal(true);
        expect(args[0]).to.equal(draggableId);
        expect(args[1]).to.deep.equal(start);
      });

      it('should not call onDragStart while the drag is occurring', () => {
        drag.start();
        expect(hooks.onDragStart.calledOnce).to.equal(true);

        drag.move();

        // should not have called on drag start again
        expect(hooks.onDragStart.calledOnce).to.equal(true);
      });
    });

    describe('on drag end', () => {
      it('should call the onDragEnd hook when a drag ends', () => {
        drag.perform();

        expect(hooks.onDragEnd.called).to.equal(true);
      });

      it('should call the onDragEnd hook when a drag ends when instantly stopped', () => {
        drag.start();
        drag.stop();

        expect(hooks.onDragEnd.called).to.equal(true);
      });

      it.only('should call onDragEnd when a drag is canceled', () => {
        drag.start();
        drag.cancel();

        expect(hooks.onDragEnd.called).to.equal(true);
      });

      it('should allow subsequent drags', () => {
        drag.perform();
        expect(hooks.onDragStart.calledOnce).to.equal(true);
        expect(hooks.onDragEnd.calledOnce).to.equal(true);

        drag.perform();
        expect(hooks.onDragStart.calledTwice).to.equal(true);
        expect(hooks.onDragEnd.calledTwice).to.equal(true);
      });
    });
  });
});
