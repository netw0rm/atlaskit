// @flow
import React, { PureComponent } from 'react';
import { describe, it, afterEach, beforeEach } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import sinon from 'sinon';
import DragHandle, { sloppyClickThreshold } from '../../../src/view/drag-handle/drag-handle';
// eslint-disable-next-line no-duplicate-imports
import type { Callbacks } from '../../../src/view/drag-handle/drag-handle';
import createDragHandle from '../../../src/view/drag-handle/';
import { dispatchWindowMouseEvent, mouseEvent, withKeyboard } from '../user-input-util';
import type { Position } from '../../../src/types';

const primaryButton: number = 0;
const auxiliaryButton: number = 1;

const getStubCallbacks = (): Callbacks => ({
  onLift: sinon.stub(),
  onKeyLift: sinon.stub(),
  onMove: sinon.stub(),
  onMoveForward: sinon.stub(),
  onMoveBackward: sinon.stub(),
  onDrop: sinon.stub(),
  onCancel: sinon.stub(),
});

type CallBacksCalledFn = {|
  onLift?: number,
  onKeyLift?: number,
  onMove?: number,
  onMoveForward?: number,
  onMoveBackward?: number,
  onDrop?: number,
  onCancel?: number,
|}

const callbacksCalled = (callbacks: Callbacks) => ({
  onLift = 0,
  onKeyLift = 0,
  onMove = 0,
  onMoveForward = 0,
  onMoveBackward = 0,
  onDrop = 0,
  onCancel = 0,
}: CallBacksCalledFn = {}) => callbacks.onLift.callCount === onLift &&
  callbacks.onKeyLift.callCount === onKeyLift &&
  callbacks.onMove.callCount === onMove &&
  callbacks.onMoveForward.callCount === onMoveForward &&
  callbacks.onMoveBackward.callCount === onMoveBackward &&
  callbacks.onDrop.callCount === onDrop &&
  callbacks.onCancel.callCount === onCancel;

const whereAnyCallbacksCalled = (callbacks: Callbacks) =>
  !callbacksCalled(callbacks)();

class Child extends PureComponent {
  props: {
    handleProps?: Object,
  }
  render() {
    return (
      <div {...this.props.handleProps}>
        Drag me!
      </div>
    );
  }
}

const windowMouseUp = dispatchWindowMouseEvent.bind(null, 'mouseup');
const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');
const mouseDown = mouseEvent.bind(null, 'mousedown');
const click = mouseEvent.bind(null, 'click');
const pressEscape = withKeyboard('Escape');
const pressSpacebar = withKeyboard(' ');
const pressArrowUp = withKeyboard('ArrowUp');
const pressArrowDown = withKeyboard('ArrowDown');
const pressTab = withKeyboard('Tab');
const pressEnter = withKeyboard('Enter');

describe('drag handle', () => {
  let callbacks: Callbacks;
  let wrapper: ReactWrapper;

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
    wrapper.unmount();
  });

  describe('mouse dragging', () => {
    describe('initiation', () => {
      it('should start a drag if there was sufficient mouse movement in any direction', () => {
        const valid: Position[] = [
          { x: 0, y: sloppyClickThreshold },
          { x: 0, y: -sloppyClickThreshold },
          { x: sloppyClickThreshold, y: 0 },
          { x: -sloppyClickThreshold, y: 0 },
        ];

        valid.forEach((point: Position): void => {
          const customCallbacks = getStubCallbacks();
          const customWrapper = mount(
            <DragHandle
              {...customCallbacks}
              isEnabled
            >
              <Child />
            </DragHandle>
          );

          mouseDown(customWrapper, 0, 0);
          windowMouseMove(point.x, point.y);

          expect(customCallbacks.onLift.calledWith(point)).to.equal(true);

          customWrapper.unmount();
        });
      });

      it('should not start a drag if there was no mouse movement while mouse was pressed', () => {
        mouseDown(wrapper);
        windowMouseUp();

        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });

      it('should not start a drag if there was too little mouse movement while mouse was pressed', () => {
        mouseDown(wrapper, 0, 0);
        windowMouseMove(0, sloppyClickThreshold - 1);
        windowMouseUp(0, sloppyClickThreshold - 1);

        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });

      it('should not start a drag if not using the primary mouse button', () => {
        mouseDown(wrapper, 0, 0, auxiliaryButton);
        windowMouseMove(0, sloppyClickThreshold);

        expect(callbacksCalled(callbacks)({
          onLift: 0,
        })).to.equal(true);
      });

      describe('cancelled before moved enough', () => {
        beforeEach(() => {
          mouseDown(wrapper, 0, 0, auxiliaryButton);
          // not moved enough yet
          windowMouseMove(0, sloppyClickThreshold - 1);
          pressEscape(wrapper);

          // should normally start a drag
          windowMouseMove(0, sloppyClickThreshold);

          // should normally end a drag
          windowMouseUp();
        });

        it('should end any pending drag if the user presses Escape without calling onCancel', () => {
          expect(callbacksCalled(callbacks)({
            onLift: 0,
            onCancel: 0,
            onDrop: 0,
          })).to.equal(true);
        });

        it('should not prevent subsequent click actions if a pending drag is cancelled', () => {
          const stub = sinon.stub();

          click(wrapper, 0, 0, primaryButton, { preventDefault: stub });

          expect(stub.called).to.equal(false);
        });
      });
    });

    describe('progress', () => {
      it('should fire the onMove callback when there is drag movement', () => {
        const expected: Position = {
          x: 0,
          y: sloppyClickThreshold + 1,
        };

        mouseDown(wrapper);
        // will start the drag
        windowMouseMove(0, sloppyClickThreshold);
        // will fire the first move
        windowMouseMove(expected.x, expected.y);

        expect(callbacks.onMove.calledWith(expected)).to.equal(true);
      });

      it('should prevent keyboard submission', () => {
        const stub = sinon.stub();
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        pressEnter(wrapper, { preventDefault: stub });

        expect(stub.called).to.equal(true);
      });

      it('should prevent tabbing', () => {
        const stub = sinon.stub();
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        pressTab(wrapper, { preventDefault: stub });

        expect(stub.called).to.equal(true);
      });

      it('should not drop on spacebar', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        pressSpacebar(wrapper);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onDrop: 0,
        })).to.equal(true);
      });

      it('should prevent scrolling on spacebar', () => {
        const stub = sinon.stub();
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        pressSpacebar(wrapper, { preventDefault: stub });

        expect(stub.called).to.equal(true);
      });

      it('should not attempt to move forward or backward with arrow keys', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);

        pressArrowDown(wrapper);
        pressArrowUp(wrapper);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMoveForward: 0,
          onMoveBackward: 0,
        })).to.equal(true);
      });
    });

    describe('finish', () => {
      it('should fire an onDrop when the drag finishes', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp();

        expect(callbacks.onDrop.called).to.equal(true);
      });

      it('should stop listening to window mouse events after a drop', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp();

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onDrop: 1,
        })).to.equal(true);

        // this should have no impact
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseMove(0, sloppyClickThreshold + 1);
        windowMouseUp();
        windowMouseUp();
        windowMouseMove(0, sloppyClickThreshold + 2);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onDrop: 1,
        })).to.equal(true);
      });

      it('should fire an onDrop even when not dropping with the primary mouse button', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp(0, 0, auxiliaryButton);

        expect(callbacks.onDrop.called).to.equal(true);
      });
    });

    describe('cancel', () => {
      it('should cancel an existing drag by pressing Escape', () => {
        // start dragging
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 0,
        })).to.equal(true);

        pressEscape(wrapper);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should stop listening to mouse events after a cancel', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        // move
        windowMouseMove(0, sloppyClickThreshold + 1);
        // cancel
        pressEscape(wrapper);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);

        // these should not do anything
        windowMouseMove(0, sloppyClickThreshold + 1);
        pressEscape(wrapper);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should not do anything if there is nothing dragging', () => {
        pressEscape(wrapper);
        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });
    });

    describe('post drag click prevention', () => {
      it('should prevent clicks after a successful drag', () => {
        const stub = sinon.stub();

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp(0, sloppyClickThreshold);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onDrop: 1,
        })).to.equal(true);

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });
        expect(stub.called).to.equal(true);
      });

      it('should prevent clicks after a drag was cancelled', () => {
        const stub = sinon.stub();

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        pressEscape(wrapper);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });
        expect(stub.called).to.equal(true);
      });

      it('should not prevent a click if the sloppy click threshold was not exceeded', () => {
        const stub = sinon.stub();

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold - 1);
        windowMouseUp(0, sloppyClickThreshold - 1);
        expect(callbacksCalled(callbacks)({
          onLift: 0,
          onCancel: 0,
          onDrop: 0,
        })).to.equal(true);

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });
        expect(stub.called).to.equal(false);
      });

      describe('subsequent interactions', () => {
        it('should allow subsequent clicks through after blocking one after a drag', () => {
          mouseDown(wrapper);
          windowMouseMove(0, sloppyClickThreshold);
          windowMouseUp(0, sloppyClickThreshold);
          expect(callbacksCalled(callbacks)({
            onLift: 1,
            onDrop: 1,
          })).to.equal(true);

          const stub1 = sinon.stub();
          click(wrapper, 0, 0, primaryButton, { preventDefault: stub1 });
          expect(stub1.called).to.equal(true);

          const stub2 = sinon.stub();
          click(wrapper, 0, 0, primaryButton, { preventDefault: stub2 });
          expect(stub2.called).to.equal(false);
        });
      });
    });

    describe('disabled mid drag', () => {
      it('should cancel an existing drag', () => {
        // lift
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        // move
        windowMouseMove(0, sloppyClickThreshold + 1);
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 0,
        })).to.equal(true);

        wrapper.setProps({ isEnabled: false });
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should stop listening to mouse events', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold + 1);
        windowMouseMove(0, sloppyClickThreshold + 1);

        wrapper.setProps({ isEnabled: false });
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);

        // should have no impact
        windowMouseMove(0, sloppyClickThreshold + 1);
        windowMouseMove(0, sloppyClickThreshold + 2);
        windowMouseUp();
        windowMouseMove(0, sloppyClickThreshold + 2);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onMove: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('unmounted mid drag', () => {
      beforeEach(() => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        wrapper.unmount();
      });

      it('should call the onCancel prop', () => {
        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should unbind any window events', () => {
        windowMouseMove(0, sloppyClickThreshold + 1);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('subsequent drags', () => {
      it('should be possible to do another drag after one finishes', () => {
        Array.from({ length: 10 }, (v, k) => k).forEach((val: number) => {
          // lift
          mouseDown(wrapper);
          windowMouseMove(0, sloppyClickThreshold);
          // move
          windowMouseMove(0, sloppyClickThreshold);
          // drop
          windowMouseUp(0, sloppyClickThreshold);

          expect(callbacksCalled(callbacks)({
            onLift: val + 1,
            onMove: val + 1,
            onDrop: val + 1,
          })).to.equal(true);
        });
      });

      it('should allow drags after a cancel', () => {
        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        pressEscape(wrapper);

        expect(callbacksCalled(callbacks)({
          onLift: 1,
          onCancel: 1,
        })).to.equal(true);

        mouseDown(wrapper);
        windowMouseMove(0, sloppyClickThreshold);
        windowMouseUp(wrapper, 0, sloppyClickThreshold);

        expect(callbacksCalled(callbacks)({
          onCancel: 1,
          onLift: 2,
          onDrop: 1,
        })).to.equal(true);
      });
    });
  });

  describe('keyboard dragging', () => {
    describe('initiation', () => {
      it('should lift when a user presses the space bar', () => {
        pressSpacebar(wrapper);

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
        })).to.equal(true);
      });
    });

    describe('progress', () => {
      it('should move backward when the user presses ArrowUp', () => {
        pressSpacebar(wrapper);
        pressArrowUp(wrapper);

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onMoveBackward: 1,
        })).to.equal(true);
      });

      it('should move forward when the user presses ArrowDown', () => {
        pressSpacebar(wrapper);
        pressArrowDown(wrapper);

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onMoveForward: 1,
        })).to.equal(true);
      });

      it('should prevent tabbing away from the element while dragging', () => {
        const stub = sinon.stub();
        pressSpacebar(wrapper);

        pressTab(wrapper, { preventDefault: stub });

        expect(stub.called).to.equal(true);
      });

      it('should prevent submitting the dragging item', () => {
        const stub = sinon.stub();

        pressSpacebar(wrapper);
        pressEnter(wrapper, { preventDefault: stub });

        expect(stub.called).to.equal(true);
      });

      it('should not take into account any mouse movements', () => {
        pressSpacebar(wrapper);

        windowMouseMove();

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onMove: 0,
          onMoveForward: 0,
          onMoveBackward: 0,
        })).to.equal(true);
      });
    });

    describe('finish', () => {
      it('should drop when the user presses spacebar', () => {
        pressSpacebar(wrapper);
        pressSpacebar(wrapper);

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onDrop: 1,
        })).to.equal(true);
      });
    });

    describe('cancel', () => {
      it('should cancel the drag when the user presses escape', () => {
        pressSpacebar(wrapper);
        pressEscape(wrapper);

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });

      it('should cancel when the user pushes any mouse button', () => {
        const mouseButtons: number[] = [primaryButton, auxiliaryButton];

        mouseButtons.forEach((button: number, index: number): void => {
          pressSpacebar(wrapper);
          mouseDown(wrapper, 0, 0, button);
          // should now do nothing
          pressArrowUp(wrapper);

          expect(callbacksCalled(callbacks)({
            onKeyLift: index + 1,
            onCancel: index + 1,
          })).to.equal(true);
        });
      });

      it('should not do anything if there is nothing dragging', () => {
        pressEscape(wrapper);
        expect(whereAnyCallbacksCalled(callbacks)).to.equal(false);
      });
    });

    describe('post drag click', () => {
      it('should not prevent any clicks after a drag', () => {
        const stub = sinon.stub();
        pressSpacebar(wrapper);
        pressArrowDown(wrapper);
        pressSpacebar(wrapper);

        click(wrapper, 0, 0, primaryButton, { preventDefault: stub });

        expect(stub.called).to.equal(false);
      });
    });

    describe('disabled mid drag', () => {
      it('should cancel the current drag', () => {
        pressSpacebar(wrapper);

        wrapper.setProps({
          isEnabled: false,
        });

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('unmounted mid drag', () => {
      beforeEach(() => {
        pressSpacebar(wrapper);
        wrapper.unmount();
      });

      it('should call the onCancel prop', () => {
        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);
      });
    });

    describe('subsequent drags', () => {
      it('should be possible to do another drag after one finishes', () => {
        Array.from({ length: 10 }, (v, k) => k).forEach((val: number) => {
          pressSpacebar(wrapper);
          pressArrowDown(wrapper);
          pressSpacebar(wrapper);

          expect(callbacksCalled(callbacks)({
            onKeyLift: val + 1,
            onMoveForward: val + 1,
            onDrop: val + 1,
          })).to.equal(true);
        });
      });

      it('should allow drags after a cancel', () => {
        pressSpacebar(wrapper);
        pressEscape(wrapper);

        expect(callbacksCalled(callbacks)({
          onKeyLift: 1,
          onCancel: 1,
        })).to.equal(true);

        pressSpacebar(wrapper);
        pressSpacebar(wrapper);

        expect(callbacksCalled(callbacks)({
          onCancel: 1,
          onKeyLift: 2,
          onDrop: 1,
        })).to.equal(true);
      });
    });
  });

  describe('drag disabled', () => {
    it('should not pass any handleProps to the child', () => {
      wrapper.setProps({
        isEnabled: false,
      });

      const props: Object = wrapper.find(Child).props();

      expect(props.handleProps).to.deep.equal({});
    });
  });
});

describe('create drag handle', () => {
  it('should return a drag handle', () => {
    const callbacks = getStubCallbacks();
    const isEnabled = true;
    const wrapper = mount(createDragHandle(callbacks)(isEnabled)(<Child />));

    expect(wrapper.find(DragHandle).length).to.equal(1);
  });

  it('should apply the passed callbacks to the drag handle', () => {
    const callbacks = getStubCallbacks();
    const isEnabled = true;
    const wrapper = mount(createDragHandle(callbacks)(isEnabled)(<Child />));

    const props = wrapper.find(DragHandle).props();
    Object.keys(callbacks).forEach((key: string) => {
      expect(props[key]).to.equal(callbacks[key]);
    });
  });

  it('should allow conditional enabling of the drag handle', () => {
    const callbacks = getStubCallbacks();

    const wrapper1 = mount(createDragHandle(callbacks)(true)(<Child />));
    expect(wrapper1.props().isEnabled).to.equal(true);

    const wrapper2 = mount(createDragHandle(callbacks)(false)(<Child />));
    expect(wrapper2.props().isEnabled).to.equal(false);
  });
});
