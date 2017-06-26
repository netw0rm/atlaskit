// @flow
import React, { PureComponent } from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import type { ReactWrapper } from 'enzyme';
import Draggable from '../../../src/view/draggable/draggable';
import DragDropContext from '../../../src/view/drag-drop-context';
import { sloppyClickThreshold } from '../../../src/view/drag-handle/drag-handle';
import type {
  OwnProps,
  MapProps,
  DispatchProps,
  Provided,
} from '../../../src/view/draggable/draggable-types';
import type {
  Position,
  DraggingInitial,
} from '../../../src/types';
import { dispatchWindowMouseEvent, mouseEvent } from '../user-input-util';

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

const defaultDraggableId = 'draggable1';
const origin: Position = { x: 0, y: 0 };

const mockInitial: DraggingInitial = {
  source: {
    droppableId: 'droppable1',
    index: 0,
  },
  center: { x: 50, y: 50 },
  scroll: { x: 0, y: 0 },
  selection: { x: 20, y: 20 },
  dimension: {
    id: defaultDraggableId,
    top: 0,
    right: 100,
    bottom: 100,
    left: 0,
    width: 100,
    height: 100,
    center: { x: 50, y: 50 },
  },
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

const defaultOwnProps: OwnProps = ({
  draggableId: defaultDraggableId,
  isDragEnabled: true,
  type: 'ITEM',
  children: () => { },
});

const notDraggingMapProps: MapProps = {
  isDragEnabled: true,
  isDropAnimating: false,
  isDragging: false,
  canAnimate: true,
  offset: origin,
  initial: null,
};

const draggingMapProps: MapProps = {
  isDragEnabled: true,
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
}: ?MountConnected = {}): ReactWrapper =>
  mount(
    <DragDropContext
      onDragEnd={() => { }}
    >
      {/* $ExpectError - using spread for props */}
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
    </DragDropContext>
);

const mouseDown = mouseEvent.bind(null, 'mousedown');
const windowMouseMove = dispatchWindowMouseEvent.bind(null, 'mousemove');

describe.only('Draggable - unconnected #2', () => {
  it('should not create any wrapping elements', () => {
    const wrapper: ReactWrapper = mountDraggable();

    const node = wrapper.getDOMNode();

    expect(node.className).to.equal('item');
  });

  describe('drag handle', () => {
    it('should allow you to attach a drag handle', () => {
      const dispatchProps: DispatchProps = getDispatchPropsStub();
      const wrapper = mountDraggable({
        ownProps: defaultOwnProps,
        mapProps: notDraggingMapProps,
        dispatchProps,
        Component: Item,
      });

      // start a drag
      mouseDown(wrapper.find(Item), 0, 0);
      windowMouseMove(0, sloppyClickThreshold);

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

        // start a drag
        mouseDown(wrapper.find(WithNestedHandle).find('.can-drag'), 0, 0);
        windowMouseMove(0, sloppyClickThreshold);

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

        // start a drag
        mouseDown(wrapper.find(WithNestedHandle), 0, 0);
        windowMouseMove(0, sloppyClickThreshold);

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

        // start a drag
        mouseDown(wrapper.find(WithNestedHandle).find('.cannot-drag'), 0, 0);
        windowMouseMove(0, sloppyClickThreshold);

        expect(dispatchProps.lift.called).to.equal(false);
      });
    });
  });

  describe('movement', () => {

  });

  describe('rendering performance', () => {
    it('should not call the children function if the provided data has not changed', () => {

    });
  });
});
