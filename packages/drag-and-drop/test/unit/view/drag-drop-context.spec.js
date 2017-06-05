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
import type { DraggableLocation, DraggableId, DroppableId, DragResult, Position } from '../../../src/types';
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

    // both our list and item have the same dimenions for now
    const fakeBox = {
      top: 0,
      right: 100,
      bottom: 100,
      left: 0,
      height: 100,
      width: 100,
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

      // Both list and item will have the same dimensions
      sinon.stub(Element.prototype, 'getBoundingClientRect').returns(fakeBox);

      // Stubbing out totally - not including margins in this
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
      const point: Position = {
        x: fakeBox.left + 1,
        y: fakeBox.top - 1,
      };

      const start = () => {
        liftWithMouse(
          wrapper.find(DragHandle),
          point.x,
          point.y,
        );
        // Need to wait for the nested async lift action to complete
        // this takes two async actions. However, this caller should not
        // know that - so ticking '10ms' to indicate that this is a nested async
        clock.tick(10);
      };

      const move = () => windowMouseMove(point.x, point.y - 1);

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

    const expected = (() => {
      const start: DraggableLocation = {
        droppableId,
        index: 0,
      };
      const end: DraggableLocation = {
        droppableId,
        index: 0,
      };

      const completed: DragResult = {
        draggableId,
        source: start,
        destination: end,
      };

      const cancelled: DragResult = {
        draggableId,
        source: start,
        destination: null,
      };

      return { completed, cancelled };
    })();

    const wasDragStarted = (amountOfDrags?: number = 1) => {
      expect(hooks.onDragStart.callCount).to.equal(amountOfDrags);
      expect(hooks.onDragStart.args[amountOfDrags - 1])
            .to.deep.equal([draggableId, expected.completed.source]);
    };

    const wasDragCompleted = (amountOfDrags?: number = 1) => {
      expect(hooks.onDragEnd.callCount).to.equal(amountOfDrags);
      expect(hooks.onDragEnd.args[amountOfDrags - 1][0])
            .to.deep.equal(expected.completed);
    };

    const wasDragCancelled = (amountOfDrags?: number = 1) => {
      expect(hooks.onDragEnd.callCount).to.equal(amountOfDrags);
      expect(hooks.onDragEnd.args[amountOfDrags - 1][0])
          .to.deep.equal(expected.cancelled);
    };

    describe('drag start', () => {
      it('should call the onDragStart hook when a drag starts', () => {
        drag.start();

        const args = hooks.onDragStart.args[0];
        wasDragStarted();
      });

      it('should not call onDragStart while the drag is occurring', () => {
        drag.start();
        wasDragStarted();

        drag.move();

        // should not have called on drag start again
        expect(hooks.onDragStart.calledOnce).to.equal(true);
      });
    });

    describe('drag end', () => {
      it('should call the onDragEnd hook when a drag ends', () => {
        drag.perform();

        wasDragCompleted();
      });

      it('should call the onDragEnd hook when a drag ends when instantly stopped', () => {
        drag.start();
        drag.stop();

        wasDragCompleted();
      });
    });

    describe('drag cancel', () => {
      it('should call onDragEnd when a drag is canceled', () => {
        drag.start();
        drag.move();
        drag.cancel();

        wasDragCancelled();
      });

      it('should call onDragEnd when a drag is canceled instantly', () => {
        drag.start();
        drag.cancel();

        wasDragCancelled();
      });
    });

    describe('subsequent drags', () => {
      it('should publish subsequent drags', () => {
        drag.perform();
        wasDragStarted(1);
        wasDragCompleted(1);

        drag.perform();
        wasDragStarted(2);
        wasDragCompleted(2);
      });

      it('should publish subsequent drags after a cancel', () => {
        drag.start();
        drag.cancel();
        wasDragStarted(1);
        wasDragCancelled(1);

        drag.perform();
        wasDragStarted(2);
        wasDragCompleted(2);
      });
    });
  });
});
