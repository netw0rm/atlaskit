// @flow
/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import Draggable from '../../../src/view/draggable/draggable';
import DragHandle, { sloppyClickThreshold } from '../../../src/view/drag-handle/drag-handle';
import type {
  OwnProps,
  MapProps,
  DispatchProps,
  Provided,
} from '../../../src/view/draggable/draggable-types';
import type {
  Position,
  InitialDrag,
  DraggableId,
  TypeId,
} from '../../../src/types';
import getDimension from '../get-dimension-util';
import { dispatchWindowMouseEvent, mouseEvent } from '../user-input-util';
import storeKey from '../../../src/state/get-store-key';
import createStore from '../../../src/state/create-store';

class Item extends PureComponent {
  props: {
    provided: Provided
  }

  render() {
    const provided: Provided = this.props.provided;

    return (
      <div
        className="item"
        ref={ref => provided.innerRef(ref)}
        style={provided.containerStyle}
        {...provided.dragHandleProps}
      >
        Hello there!
      </div>
    );
  }
}

const defaultDraggableId: DraggableId = 'draggable1';
const defaultType: TypeId = 'ITEM';
const origin: Position = { x: 0, y: 0 };

const mockInitial: InitialDrag = {
  source: {
    droppableId: 'droppable1',
    index: 0,
  },
  center: { x: 50, y: 50 },
  scroll: { x: 0, y: 0 },
  selection: { x: 20, y: 20 },
  dimension: getDimension({
    id: defaultDraggableId,
    top: 0,
    right: 100,
    bottom: 100,
    left: 0,
  }),
};

const getDispatchPropsStub = (): DispatchProps => ({
  lift: sinon.stub(),
  move: sinon.stub(),
  moveForward: sinon.stub(),
  moveBackward: sinon.stub(),
  drop: sinon.stub(),
  cancel: sinon.stub(),
  dropAnimationFinished: sinon.stub(),
});

// $ExpectError - not setting children function
const defaultOwnProps: OwnProps = {
  draggableId: defaultDraggableId,
  isDragEnabled: true,
  type: defaultType,
};

// $ExpectError - not setting children function
const disabledOwnProps: OwnProps = {
  draggableId: defaultDraggableId,
  isDragEnabled: false,
  type: defaultType,
};

const notDraggingMapProps: MapProps = {
  isDropAnimating: false,
  isDragging: false,
  canAnimate: true,
  offset: origin,
  initial: null,
};

const draggingMapProps: MapProps = {
  isDropAnimating: false,
  isDragging: true,
  canAnimate: false,
  initial: mockInitial,
  offset: { x: 75, y: 75 },
};

type MountConnected = {
  ownProps?: OwnProps,
  mapProps?: MapProps,
  dispatchProps?: DispatchProps,
  Component?: any,
};

const mountDraggable = ({
  ownProps = defaultOwnProps,
  mapProps = notDraggingMapProps,
  dispatchProps = getDispatchPropsStub(),
  Component = Item,
}: MountConnected = {}): ReactWrapper => {
  const store = createStore({ onDragEnd: () => { } });
  const options = {
    context: {
      [storeKey]: store,
    },
    childContextTypes: {
      [storeKey]: React.PropTypes.shape({
        dispatch: React.PropTypes.func.isRequired,
        subscribe: React.PropTypes.func.isRequired,
        getState: React.PropTypes.func.isRequired,
      }).isRequired,
    },
  };
  return mount(
    // $ExpectError - using spread for props
    <Draggable
      {...ownProps}
      {...mapProps}
      {...dispatchProps}
    >
      {(provided: Provided) => (
        <Component
          provided={provided}
        />
      )}
    </Draggable>
    , options);
};

const mouseDown = mouseEvent.bind(null, 'mousedown');
const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');

type StartDrag = {|
  selection?: Position,
  center?: Position,
|}

const originalScroll: Position = {
  x: window.pageXOffset,
  y: window.pageYOffset,
};

const setScroll = (point: Position) => {
  window.pageXOffset = point.x;
  window.pageYOffset = point.y;
};

const stubClientRect = (center?: Position = origin): void =>
  sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
    left: 0,
    top: 0,
    right: center.x * 2,
    bottom: center.y * 2,
  });

const executeOnLift = (wrapper: ReactWrapper) => ({
    selection = origin,
    center = origin,
  }: StartDrag = {}) => {
  stubClientRect(center);

  wrapper.find(DragHandle).props().callbacks.onLift(selection);
};

const executeOnKeyLift = (wrapper: ReactWrapper) => ({
    center = origin,
  }: StartDrag = {}) => {
  stubClientRect(center);

  wrapper.find(DragHandle).props().callbacks.onKeyLift();
};

const getFromLift = (dispatchProps) => {
  const [draggableIdArg, typeArg, centerArg, scrollArg, selectionArg] =
                dispatchProps.lift.args[0];

  return {
    draggableId: draggableIdArg,
    type: typeArg,
    center: centerArg,
    scroll: scrollArg,
    selection: selectionArg,
  };
};

describe.only('Draggable - unconnected #2', () => {
  afterEach(() => {
    setScroll(originalScroll);
    if (Element.prototype.getBoundingClientRect.restore) {
      Element.prototype.getBoundingClientRect.restore();
    }
  });

  it('should not create any wrapping elements', () => {
    const wrapper: ReactWrapper = mountDraggable();

    const node = wrapper.getDOMNode();

    expect(node.className).to.equal('item');
  });

  describe('drag handle', () => {
    const startDragWithHandle = (wrapper: ReactWrapper) => ({
      selection = origin,
      center = origin,
    }: StartDrag = {}) => {
      // fake some position to get the center we want
      stubClientRect(center);

      mouseDown(wrapper, selection.x, selection.y - sloppyClickThreshold);
      windowMouseMove(selection.x, selection.y);
    };

    it('should allow you to attach a drag handle', () => {
      const dispatchProps: DispatchProps = getDispatchPropsStub();
      const wrapper = mountDraggable({
        ownProps: defaultOwnProps,
        mapProps: notDraggingMapProps,
        dispatchProps,
        Component: Item,
      });

      startDragWithHandle(wrapper.find(Item))();

      expect(dispatchProps.lift.called).to.equal(true);
    });

    describe('non standard drag handle', () => {
      class WithNestedHandle extends PureComponent {
        props: {|
          provided: Provided,
        |}
        render() {
          const provided: Provided = this.props.provided;
          return (
            <div
              ref={ref => provided.innerRef(ref)}
              style={provided.containerStyle}
            >
              <div className="cannot-drag">
                Cannot drag by me
              </div>
              <div className="can-drag" {...provided.dragHandleProps}>
                Can drag by me
              </div>
            </div>
          );
        }
      }

      it('should allow the ability to have the drag handle to be a child of the draggable', () => {
        const dispatchProps: DispatchProps = getDispatchPropsStub();
        const wrapper = mountDraggable({
          ownProps: defaultOwnProps,
          mapProps: notDraggingMapProps,
          dispatchProps,
          Component: WithNestedHandle,
        });

        startDragWithHandle(wrapper.find(WithNestedHandle).find('.can-drag'))();

        expect(dispatchProps.lift.called).to.equal(true);
      });

      it('should not drag by the draggable element', () => {
        const dispatchProps: DispatchProps = getDispatchPropsStub();
        const wrapper = mountDraggable({
          ownProps: defaultOwnProps,
          mapProps: notDraggingMapProps,
          dispatchProps,
          Component: WithNestedHandle,
        });

        startDragWithHandle(wrapper.find(WithNestedHandle))();

        expect(dispatchProps.lift.called).to.equal(false);
      });

      it('should not drag by other elements', () => {
        const dispatchProps: DispatchProps = getDispatchPropsStub();
        const wrapper = mountDraggable({
          ownProps: defaultOwnProps,
          mapProps: notDraggingMapProps,
          dispatchProps,
          Component: WithNestedHandle,
        });

        startDragWithHandle(wrapper.find(WithNestedHandle).find('.cannot-drag'))();

        expect(dispatchProps.lift.called).to.equal(false);
      });
    });

    describe('handling events', () => {
      describe('onLift', () => {
        let dispatchProps;
        let wrapper;

        beforeEach(() => {
          dispatchProps = getDispatchPropsStub();
          wrapper = mountDraggable({
            dispatchProps,
          });
        });

        afterEach(() => {
          wrapper.unmount();
        });

        it('should throw if lifted when not attached to the dom', () => {
          const customWrapper = mountDraggable();
          customWrapper.unmount();

          expect(() => executeOnLift(customWrapper)()).to.throw();
        });

        it('should lift with the draggable id', () => {
          executeOnLift(wrapper)();

          expect(getFromLift(dispatchProps).draggableId).to.equal(defaultDraggableId);
        });

        it('should lift with the draggable type', () => {
          executeOnLift(wrapper)();

          expect(getFromLift(dispatchProps).type).to.equal(defaultType);
        });

        it('should lift with the selected position', () => {
          const selection: Position = {
            x: 100,
            y: 200,
          };

          executeOnLift(wrapper)({ selection });

          expect(getFromLift(dispatchProps).selection).to.deep.equal(selection);
        });

        it('should lift with the scroll position', () => {
          const scroll: Position = {
            x: 100,
            y: 200,
          };
          setScroll(scroll);

          executeOnLift(wrapper)();

          expect(getFromLift(dispatchProps).scroll).to.deep.equal(scroll);
        });

        it('should lift with the center position', () => {
          const center: Position = {
            x: 50,
            y: 80,
          };

          executeOnLift(wrapper)({ center });

          expect(getFromLift(dispatchProps).center).to.deep.equal(center);
        });
      });

      describe('onMove', () => {
        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: notDraggingMapProps,
          });
          const move = () => {
            // Calling the prop directly as this is not able to be done otherwise
            wrapper.find(DragHandle).props().callbacks.onMove({ x: 100, y: 200 });
          };

          wrapper.unmount();

          expect(move).to.throw();
        });

        it('should not do anything if the dimensions have not all been published yet', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: notDraggingMapProps,
            dispatchProps,
          });

          // should not do anything yet as mapProps has not yet updated
          wrapper.find(DragHandle).props().callbacks.onMove({ x: 100, y: 200 });

          expect(dispatchProps.move.called).to.equal(false);
        });

        it('should consider any mouse movement in offset and center', () => {
          const original: Position = mockInitial.selection;
          const mouse: Position = {
            x: 10,
            y: 50,
          };
          const mouseDiff = {
            x: mouse.x - original.x,
            y: mouse.y - original.y,
          };
          const expectedCenter = {
            x: mockInitial.center.x + mouseDiff.x,
            y: mockInitial.center.y + mouseDiff.y,
          };
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onMove(mouse);
          const [, offset, center] = dispatchProps.move.args[0];

          expect(offset).to.deep.equal(mouseDiff);
          expect(center).to.deep.equal(expectedCenter);
        });

        it('should consider any change in scroll in offset and center', () => {
          const original: Position = mockInitial.scroll;
          const scroll: Position = {
            x: 100,
            y: 500,
          };
          const scrollDiff = {
            x: scroll.x - original.x,
            y: scroll.y - original.y,
          };
          const expectedCenter = {
            x: mockInitial.center.x + scrollDiff.x,
            y: mockInitial.center.y + scrollDiff.y,
          };
          setScroll(scroll);
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

              // no mouse movement
          wrapper.find(DragHandle).props().callbacks.onMove(mockInitial.selection);
          const [, offset, center] = dispatchProps.move.args[0];

          expect(offset).to.deep.equal(scrollDiff);
          expect(center).to.deep.equal(expectedCenter);
        });
      });

      describe('onDrop', () => {
        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: notDraggingMapProps,
          });
          const drop = () => {
            wrapper.find(DragHandle).props().callbacks.onDrop();
          };

          wrapper.unmount();

          expect(drop).to.throw();
        });

        it('should trigger drop', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onDrop();

          expect(dispatchProps.drop.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onKeyLift', () => {
        let standardWrapper;
        let dispatchProps;

        beforeEach(() => {
          dispatchProps = getDispatchPropsStub();
          standardWrapper = mountDraggable({
            mapProps: notDraggingMapProps,
            dispatchProps,
          });
        });

        it('should throw if not attached to the DOM', () => {
          const onKeyLift = () => executeOnKeyLift(standardWrapper)();

          standardWrapper.unmount();

          expect(onKeyLift).to.throw();
        });

        it('should lift with the draggableId', () => {
          executeOnKeyLift(standardWrapper)();

          expect(getFromLift(dispatchProps).draggableId).to.equal(defaultDraggableId);
        });

        it('should lift with the current center position', () => {
          const center: Position = {
            x: 50,
            y: 80,
          };
          executeOnKeyLift(standardWrapper)({ center });

          expect(getFromLift(dispatchProps).center).to.deep.equal(center);
        });

        it('should lift with the current scroll position', () => {
          const scroll: Position = {
            x: 100,
            y: 200,
          };
          setScroll(scroll);

          executeOnKeyLift(standardWrapper)();

          expect(getFromLift(dispatchProps).scroll).to.deep.equal(scroll);
        });

        it('should lift with the center point as the selected position', () => {
          const center: Position = {
            x: 100,
            y: 200,
          };
          executeOnKeyLift(standardWrapper)({ center });

          expect(getFromLift(dispatchProps).selection).to.deep.equal(center);
        });
      });

      describe('onMoveBackward', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: notDraggingMapProps,
          });

          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveBackward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
          });
          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveBackward(defaultDraggableId);

          wrapper.unmount();

          expect(tryMove).to.throw();
        });

        it('should call the move backward action', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onMoveBackward(defaultDraggableId);

          expect(dispatchProps.moveBackward.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onMoveForward', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: draggingMapProps,
          });

          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveForward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
          });

          wrapper.unmount();

          const tryMove = () =>
            wrapper.find(DragHandle).props().callbacks.onMoveForward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should call the move forward action', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onMoveForward(defaultDraggableId);

          expect(dispatchProps.moveForward.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onCancel', () => {
        it('should call the cancel dispatch prop', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });

        it('should allow the action even if dragging is disabled', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            ownProps: disabledOwnProps,
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });

        it('should allow the action even when not attached to the dom', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().callbacks.onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });
      });
    });
  });

  describe('movement', () => {

  });

  describe('rendering performance', () => {
    const dispatchProps = getDispatchPropsStub();

    beforeEach(() => {
      sinon.spy(Item.prototype, 'render');
    });

    afterEach(() => {
      Item.prototype.render.restore();
    });

    it('should not call the children function if continuing to not drag', () => {
      const wrapper = mountDraggable({
        ownProps: defaultOwnProps,
        mapProps: notDraggingMapProps,
        dispatchProps,
      });
      expect(Item.prototype.render.callCount).to.equal(1);

      // try a force update
      wrapper.update();
      expect(Item.prototype.render.callCount).to.equal(1);

      // try a resetting of props
      wrapper.setProps({
        ...defaultOwnProps,
        ...notDraggingMapProps,
        ...dispatchProps,
      });
      expect(Item.prototype.render.callCount).to.equal(1);
    });

    it('should not call the children function if continuing to drag', () => {
      const wrapper = mountDraggable({
        ownProps: defaultOwnProps,
        mapProps: draggingMapProps,
        dispatchProps,
      });
      // Count will be two because of the setting
      // of the child ref into state
      expect(Item.prototype.render.callCount).to.equal(2);

      // try a force update
      wrapper.update();
      expect(Item.prototype.render.callCount).to.equal(2);

      // try a resetting of props
      wrapper.setProps({
        ...defaultOwnProps,
        ...draggingMapProps,
        ...dispatchProps,
      });
      expect(Item.prototype.render.callCount).to.equal(2);
    });
  });
});
