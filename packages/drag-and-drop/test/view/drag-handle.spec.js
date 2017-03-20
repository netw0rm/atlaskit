// @flow
import React, { PureComponent } from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import type { ReactWrapper } from 'enzyme';
import DragHandle, { getCursor } from '../../src/view/drag-handle/drag-handle';
import type { Callbacks } from '../../src/view/drag-handle';
// import createDragHandle from '../../src/view/drag-handle/create-drag-handle';

const describe = window.describe;
const it = window.it;
const beforeEach = window.beforeEach;
const afterEach = window.afterEach;

const primaryButton: number = 0;
const auxiliaryButton: number = 1;

class Child extends PureComponent {
  render() {
    return <div>hello world!</div>;
  }
}

const getStubCallbacks = (): Callbacks => ({
  onLift: sinon.stub(),
  onKeyLift: sinon.stub(),
  onMove: sinon.stub(),
  onMoveForward: sinon.stub(),
  onMoveBackward: sinon.stub(),
  onDrop: sinon.stub(),
  onCancel: sinon.stub(),
});

const liftWithMouse = (wrapper: ReactWrapper<any>,
  clientX?: number = 0,
  clientY?: number = 0,
  button?: number = primaryButton,
  options?: Object = {},
): void =>
  wrapper.simulate('mousedown', { button, clientX, clientY, ...options });

const dispatchWindowMouseEvent = (
  eventName: string,
  clientX?: number = 0,
  clientY?: number = 0,
  button?: number = primaryButton,
) => {
  const event = new window.MouseEvent(eventName, {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX,
    clientY,
    button,
  });
  window.dispatchEvent(event);
};

const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');
const windowMouseDown = dispatchWindowMouseEvent.bind(null, 'mousedown');
const windowMouseUp = dispatchWindowMouseEvent.bind(null, 'mouseup');

const withKeyboard = (key: string): Function =>
  (wrapper: ReactWrapper<any>, options?: Object = {}) =>
    wrapper.simulate('keydown', { key, ...options });

const liftWithKeyboard = withKeyboard(' ');
const dropWithKeyboard = withKeyboard(' ');
const cancelWithKeyboard = withKeyboard('Escape');
const tabWithKeyboard = withKeyboard('Tab');
const moveBackwardWithKeyboard = withKeyboard('ArrowUp');
const moveForwardWithKeyboard = withKeyboard('ArrowDown');

const wereAnyCallbacksCalled = (callbacks: Callbacks): boolean =>
  Object.keys(callbacks).some(key =>
    callbacks[key].called
  );

const areWindowEventsBound = (wrapper: ReactWrapper<any>, callbacks: Callbacks): boolean => {
  const eventsThatShouldDoNothing: Function[] = [
    windowMouseUp,
    windowMouseMove,
    windowMouseDown,
  ];

  const getCallbackCallCount = (): number =>
    Object.keys(callbacks).sort()
      .map((key: string): number => callbacks[key].callCount)
      .reduce((previous, current) => previous + current, 0);

  const beforeCount = getCallbackCallCount();
  eventsThatShouldDoNothing.forEach((fn: Function) => fn(wrapper));
  const afterCount = getCallbackCallCount();

  return beforeCount !== afterCount;
};

const isDragging = (wrapper: ReactWrapper<any>) =>
  wrapper.state().draggingWith !== null;

const wasDragCancelled = (wrapper: ReactWrapper<any>, callbacks: Callbacks): boolean =>
  !areWindowEventsBound(wrapper, callbacks) &&
  callbacks.onCancel.called;

const wasDragCancelledByError = (wrapper: ReactWrapper<any>, callbacks: Callbacks): boolean =>
  wasDragCancelled(wrapper, callbacks) &&
  console.error.called;

describe('Drag handle', () => {
  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });

  describe('navigation', () => {
    it('should be selectable when dragging is enabled', () => {
      const wrapper = mount(
        <DragHandle
          {...getStubCallbacks()}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      expect(wrapper.find('div').first().props().tabIndex).to.equal('0');
    });

    it('should not be selectable when dragging is not enabled', () => {
      const wrapper = mount(
        <DragHandle
          {...getStubCallbacks()}
          isEnabled={false}
        >
          <Child />
        </DragHandle>
      );

      expect(wrapper.find('div').first().props()).to.not.have.property('tabIndex');
    });

    it('should allow tabbing to another draggable while not dragging', () => {
      const stub = sinon.stub();
      const wrapper = mount(
        <DragHandle
          {...getStubCallbacks()}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      tabWithKeyboard(wrapper, { preventDefault: stub });

      expect(stub.called).to.equal(false);
    });

    it('should not allow tabbing to another draggable while dragging', () => {
      const stub = sinon.stub();
      const wrapper = mount(
        <DragHandle
          {...getStubCallbacks()}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      liftWithMouse(wrapper);

      // try to tab away
      tabWithKeyboard(wrapper, { preventDefault: stub });

      expect(stub.called).to.equal(true);
    });
  });

  describe('cursor', () => {
    it('should use standard cursor when dragging is not enabled', () => {
      expect(getCursor(false, false)).to.equal('auto');
    });

    it('should use a grab cursor when dragging is enabled and the user is not dragging', () => {
      expect(getCursor(true, false)).to.equal('grab');
    });

    it('should use a grabbing cursor when dragging is enabled and the user is dragging', () => {
      expect(getCursor(true, true)).to.equal('grabbing');
    });
  });

  describe('mouse dragging', () => {
    describe('lift', () => {
      it('should call `lift` with the current mouse down position when lifted', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper, 50, 100);

        expect(callbacks.onLift.calledWithExactly({ x: 50, y: 100 })).to.equal(true);
      });

      it('should cancel a current keyboard drag', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper);

        liftWithMouse(wrapper);

        expect(wasDragCancelled(wrapper, callbacks)).to.equal(true);
      });

      it('should not cancel a keyboard drag if there is no current one', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper);

        expect(callbacks.onCancel.called).to.equal(false);
      });

      it('should cancel the current drag and log an error if there is already dragging with a mouse', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper);
        liftWithMouse(wrapper);

        expect(wasDragCancelledByError(wrapper, callbacks)).to.equal(true);
      });

      it('should not do anything if dragging is not enabled', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled={false}
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper);

        expect(wereAnyCallbacksCalled(callbacks)).to.equal(false);
      });

      it('should not do anything if not using the primary mouse button', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper, 0, 0, auxiliaryButton);

        expect(wereAnyCallbacksCalled(callbacks)).to.equal(false);
      });

      it('should prevent the event from propagating', () => {
        const stopPropagation = sinon.stub();
        const wrapper = mount(
          <DragHandle
            {...getStubCallbacks()}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper, 0, 0, primaryButton, { stopPropagation });

        expect(stopPropagation.called).to.equal(true);
      });

      it('should not prevent the event from propagating if not lifting', () => {
        const stopPropagation = sinon.stub();
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...getStubCallbacks()}
            isEnabled={false}
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper, 0, 0, primaryButton, { stopPropagation });

        expect(stopPropagation.called).to.equal(false);

        // Being super paranoid and checking that no other side effects occurred
        expect(wereAnyCallbacksCalled(callbacks)).to.equal(false);
      });
    });

    describe('move', () => {
      let wrapper;
      let callbacks;
      beforeEach(() => {
        callbacks = getStubCallbacks();
        wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );
      });

      afterEach(() => {
        // clear up any lingering handlers
        wrapper.unmount();
      });

      it('should publish `move` with the current mouse position', () => {
        liftWithMouse(wrapper);

        windowMouseMove(10, 20);

        expect(callbacks.onMove.calledWithExactly({ x: 10, y: 20 })).to.equal(true);
      });

      it('should not do anything if not using the primary mouse button', () => {
        liftWithMouse(wrapper);

        windowMouseMove(10, 20, auxiliaryButton);

        expect(callbacks.onMove.called).to.equal(false);
      });

      it('should publish `move` even when the mouse event is outside the dragging element', () => {
        // This test is sort of redundant given that the mousemove
        // event is not attached to the element, but rather to the window.
        // While the functionality is executed elsewhere, it is worth
        // calling out here as an explicit requirement of DragHandle.
        liftWithMouse(wrapper);

        windowMouseMove(20000, 10000);

        expect(callbacks.onMove.calledWithExactly({ x: 20000, y: 10000 })).to.equal(true);
      });

      it('should cancel a drag and log an error mouse down event occurs on the window before a mouse up', () => {
        liftWithMouse(wrapper);

        windowMouseDown();

        expect(wasDragCancelledByError(wrapper, callbacks)).to.equal(true);
      });

      it('should cancel a drag when the escape key is pressed', () => {
        liftWithMouse(wrapper);

        cancelWithKeyboard(wrapper);

        expect(wasDragCancelled(wrapper, callbacks)).to.equal(true);
      });

      it('should not move if attempting to move backward with the keyboard', () => {
        liftWithMouse(wrapper);

        moveBackwardWithKeyboard(wrapper);

        expect(callbacks.onMove.called).to.equal(false);
        expect(callbacks.onMoveBackward.called).to.equal(false);
      });

      it('should not move if attempting to move forward with the keyboard', () => {
        liftWithMouse(wrapper);

        moveForwardWithKeyboard(wrapper);

        expect(callbacks.onMove.called).to.equal(false);
        expect(callbacks.onMoveForward.called).to.equal(false);
      });
    });

    describe('drop', () => {
      const wasDropped = (wrapper: ReactComponent<any>, callbacks: Callbacks) =>
        callbacks.onDrop.called &&
        !areWindowEventsBound(wrapper, callbacks) &&
        !isDragging(wrapper);


      it('should drop when you release the primary button', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper);
        windowMouseUp(wrapper);

        expect(wasDropped(wrapper, callbacks)).to.equal(true);
      });

      it('should drop when you release any button', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper);
        windowMouseUp(wrapper, 0, 0, auxiliaryButton);

        expect(wasDropped(wrapper, callbacks)).to.equal(true);
      });

      it('should drop when you press spacebar', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithMouse(wrapper);
        dropWithKeyboard(wrapper);

        expect(wasDropped(wrapper, callbacks)).to.equal(true);
      });
    });
  });

  describe('keyboard dragging', () => {
    describe('lift', () => {
      it('should not lift if dragging is disabled', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled={false}
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper);

        expect(callbacks.onLift.called).to.equal(false);
        expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);
        expect(isDragging(wrapper)).to.equal(false);
      });

      it('should lift on a spacebar press', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper);

        expect(callbacks.onKeyLift.called).to.equal(true);
        expect(isDragging(wrapper)).to.equal(true);
      });

      it('should not scroll the page when pressing spacebar', () => {
        const stub = sinon.stub();
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper, { preventDefault: stub });

        expect(stub.called).to.equal(true);
      });
    });

    describe('move', () => {
      it('should do nothing if not lifted', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        moveForwardWithKeyboard(wrapper);

        expect(isDragging(wrapper)).to.equal(false);
        expect(callbacks.onMoveBackward.called).to.equal(false);
      });

      describe('moving backward', () => {
        let wrapper;
        let callbacks;
        let preventDefault;

        beforeEach(() => {
          preventDefault = sinon.stub();
          callbacks = getStubCallbacks();
          wrapper = mount(
            <DragHandle
              {...callbacks}
              isEnabled
            >
              <Child />
            </DragHandle>
          );

          liftWithKeyboard(wrapper);
          moveBackwardWithKeyboard(wrapper, { preventDefault });
        });

        afterEach(() => {
          wrapper.unmount();
        });

        it('should move backward', () => {
          expect(callbacks.onMoveBackward.called).to.equal(true);
        });

        it('should prevent scrolling', () => {
          expect(preventDefault.called).to.equal(true);
        });
      });

      describe('moving forward', () => {
        let wrapper;
        let callbacks;
        let preventDefault;

        beforeEach(() => {
          preventDefault = sinon.stub();
          callbacks = getStubCallbacks();
          wrapper = mount(
            <DragHandle
              {...callbacks}
              isEnabled
            >
              <Child />
            </DragHandle>
          );

          liftWithKeyboard(wrapper);
          moveForwardWithKeyboard(wrapper, { preventDefault });
        });

        afterEach(() => {
          wrapper.unmount();
        });

        it('should move forward', () => {
          expect(callbacks.onMoveForward.called).to.equal(true);
        });

        it('should prevent scrolling', () => {
          expect(preventDefault.called).to.equal(true);
        });
      });
    });

    describe('drop', () => {
      it('should lift if the item is not dragging when pressing spacebar', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper);

        expect(callbacks.onKeyLift.called).to.equal(true);
        expect(isDragging(wrapper)).to.equal(true);
      });

      it('should drop on a spacebar press after a lift', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper);
        dropWithKeyboard(wrapper);

        expect(callbacks.onDrop.called).to.equal(true);
        expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);
      });

      it('should not drop on a mouse up event', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper);
        windowMouseUp(wrapper);

        expect(isDragging(wrapper)).to.equal(true);
        expect(callbacks.onDrop.called).to.equal(false);
      });
    });

    describe('cancel', () => {
      it('should not do anything if not dragging', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        cancelWithKeyboard(wrapper);

        expect(wereAnyCallbacksCalled(wrapper)).to.equal(false);
        expect(isDragging(wrapper)).to.equal(false);
      });

      it('should cancel when the user presses escape', () => {
        const callbacks = getStubCallbacks();
        const wrapper = mount(
          <DragHandle
            {...callbacks}
            isEnabled
          >
            <Child />
          </DragHandle>
        );

        liftWithKeyboard(wrapper);
        cancelWithKeyboard(wrapper);

        expect(callbacks.onCancel.called).to.equal(true);
        expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);
      });
    });
  });

  describe('mid drag disabling', () => {
    it('should not cancel drags if there is nothing dragging', () => {
      const callbacks = getStubCallbacks();
      const wrapper = mount(
        <DragHandle
          {...callbacks}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      wrapper.setProps({ isEnabled: false });

      expect(callbacks.onCancel.called).to.equal(false);
      expect(wereAnyCallbacksCalled(wrapper)).to.equal(false);
    });

    it('should cancel a current mouse drag', () => {
      const callbacks = getStubCallbacks();
      const wrapper = mount(
        <DragHandle
          {...callbacks}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      liftWithMouse(wrapper);
      wrapper.setProps({ isEnabled: false });

      expect(callbacks.onCancel.called).to.equal(true);
      expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);
    });

    it('should cancel a current keyboard drag', () => {
      const callbacks = getStubCallbacks();
      const wrapper = mount(
        <DragHandle
          {...callbacks}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      liftWithKeyboard(wrapper);
      wrapper.setProps({ isEnabled: false });

      expect(callbacks.onCancel.called).to.equal(true);
      expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);
    });
  });

  describe('subsequent drags', () => {
    it('should be possible to do another drag after one finishes', () => {
      const callbacks = getStubCallbacks();
      const wrapper = mount(
        <DragHandle
          {...callbacks}
          isEnabled
        >
          <Child />
        </DragHandle>
      );
      const dragAndDrop = () => {
        liftWithMouse(wrapper);
        windowMouseMove(wrapper);
        windowMouseUp(wrapper);
      };

      dragAndDrop();

      expect(callbacks.onLift.callCount).to.equal(1);
      expect(callbacks.onMove.callCount).to.equal(1);
      expect(callbacks.onDrop.callCount).to.equal(1);
      expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);

      dragAndDrop();

      expect(callbacks.onLift.callCount).to.equal(2);
      expect(callbacks.onMove.callCount).to.equal(2);
      expect(callbacks.onDrop.callCount).to.equal(2);
      expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);
    });
  });

  describe('unmounting', () => {
    it('should not do anything if nothing is dragging', () => {
      const callbacks = getStubCallbacks();
      const wrapper = mount(
        <DragHandle
          {...callbacks}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      wrapper.unmount();

      expect(wereAnyCallbacksCalled(wrapper)).to.equal(false);
    });

    it('should cancel the current drag and clean up event handlers if there is a current drag', () => {
      const callbacks = getStubCallbacks();
      const wrapper = mount(
        <DragHandle
          {...callbacks}
          isEnabled
        >
          <Child />
        </DragHandle>
      );

      liftWithKeyboard(wrapper);
      wrapper.unmount();

      expect(callbacks.onCancel.called).to.equal(true);
      expect(areWindowEventsBound(wrapper, callbacks)).to.equal(false);
    });
  });

  describe('make drag handle', () => {

  });
});
