// @flow
/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import { shallow, mount } from 'enzyme';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import makeDraggable, { Placeholder } from '../../src/view/draggable/make-draggable';
import DragHandle from '../../src/view/drag-handle/drag-handle';
import Moveable from '../../src/view/moveable';
import type { DraggingInitial, Position } from '../../src/types';
import type { DispatchProps, MapProps, OwnProps, StateSnapshot, MapState } from '../../src/view/draggable/draggable-types';

const describe = window.describe;
const it = window.it;
const beforeEach = window.beforeEach;
const afterEach = window.afterEach;

class Child extends PureComponent {
  render() {
    return <div>hello world!</div>;
  }
}

class Container extends PureComponent {
  props: {|
  innerRef: Function,
  |}
  render() {
    return (
      <div ref={this.props.innerRef}>
      Hello world!
      </div>
    );
  }
}

class ContainerWithHandle extends PureComponent {
  props: {|
  dragHandle: Function,
  innerRef: Function,
  |}
  render() {
    return (
      <div ref={this.props.innerRef}>
      This container manages its own
        {this.props.dragHandle(<button>handle</button>)}
      </div>
    );
  }
}

const getDispatchPropsStub = (): DispatchProps => ({
  lift: sinon.stub(),
  move: sinon.stub(),
  moveForward: sinon.stub(),
  moveBackward: sinon.stub(),
  drop: sinon.stub(),
  cancel: sinon.stub(),
  dropAnimationFinished: sinon.stub(),
});

const empty = {};
const origin: Position = { x: 0, y: 0 };
const defaultDraggableId = 'draggable1';

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
    scrollHeight: 100,
    scrollWidth: 100,
    scrollTop: 0,
    scrollLeft: 0,
  },
};

const draggingMapProps: MapProps = {
  id: defaultDraggableId,
  isDragEnabled: true,
  isDropAnimating: false,
  isDragging: true,
  canAnimate: false,
  initial: mockInitial,
  offset: { x: 75, y: 75 },
};

const notDraggingMapProps: MapProps = {
  id: defaultDraggableId,
  isDragEnabled: true,
  isDropAnimating: false,
  isDragging: false,
  canAnimate: true,
  offset: origin,
};

const returningHomeMapProps: MapProps = {
  id: defaultDraggableId,
  isDragEnabled: true,
  isDropAnimating: true,
  isDragging: false,
  canAnimate: true,
  initial: mockInitial,
  offset: { x: 75, y: 75 },
};

type MountConnected = {
  type?: string,
  map?: MapState,
  Component?: ReactClass<any>,
  mapProps?: MapProps,
  dispatchProps?: DispatchProps,
  ownProps?: OwnProps,
};

const mountConnectedDraggable = ({
  type = 'TYPE',
  map = () => empty,
  Component = Container,
  mapProps = notDraggingMapProps,
  dispatchProps = getDispatchPropsStub(),
  ownProps = empty,
}: MountConnected = {}): ReactWrapper => {
  const Draggable = makeDraggable(type, map)(Component);
  return shallow(
    <Draggable
      mapProps={mapProps}
      dispatchProps={dispatchProps}
      ownProps={ownProps}
    />);
};

describe('Draggable', () => {
  let draggingWrapper;
  let notDraggingWrapper;
  let returningHomeWrapper;

  beforeEach(() => {
    // recreateing the wrappers before every test to guard against side effects
    draggingWrapper = mountConnectedDraggable({
      mapProps: draggingMapProps,
    });
    notDraggingWrapper = mountConnectedDraggable({
      mapProps: notDraggingMapProps,
    });
    returningHomeWrapper = mountConnectedDraggable({
      mapProps: returningHomeMapProps,
    });
  });

  describe('unconnected', () => {
    describe('TODO: remove - placeholder', () => {
      it('should not render a placeholder if a drag is finished and no animation is required', () => {
        const mapProps: MapProps = {
          id: defaultDraggableId,
          isDragEnabled: true,
          canAnimate: true,
          isDropAnimating: false,
          isDragging: false,
          initial: mockInitial,
          offset: origin,
        };

        const wrapper = mountConnectedDraggable({
          mapProps,
        });

        expect(wrapper.find(Placeholder).length).to.equal(0);
      });
    });

    describe('providing a state snapshot to the provided map function', () => {
      it('should provide the map function with a snapshot of the current drag state', () => {
        const map: MapState = sinon.stub().returns(empty);
        const expected: StateSnapshot = {
          isDragging: true,
        };

        mountConnectedDraggable({
          map,
          mapProps: draggingMapProps,
        });

        expect(map.args[0][0]).to.deep.equal(expected);
      });

      it('should provide the map function with the childrens own props', () => {
        const map: MapState = sinon.stub().returns(empty);
        const ownProps = {
          foo: 'bar',
        };

        mountConnectedDraggable({
          ownProps,
          map,
        });

        expect(map.args[0][1]).to.have.property('foo', 'bar');
      });

      it('should provide the map function a getDragHandle function which returns a DragHandle', () => {
        const map: MapState = sinon.spy(
          (snapshot: StateSnapshot, ownProps: Object, requestDragHandle: Function) => ({
            dragHandle: requestDragHandle(),
          })
        );

        mountConnectedDraggable({
          map,
          mapProps: draggingMapProps,
        });

        // grab the requestDragHandle function
        const requestDragHandle = map.args[0][2];

        // mount the DragHandle independently
        const wrapper = mount(requestDragHandle()(<Child />));

        expect(wrapper.find(DragHandle).length).to.equal(1);
        expect(wrapper.find(DragHandle).find(Child).length).to.equal(1);
      });

      it('should enhance the childs props with the result of the map function', () => {
        const map: MapState = sinon.spy(
          (snapshot: StateSnapshot, ownProps: Object, requestDragHandle: Function) => ({
            isDragging: snapshot.isDragging,
            name: ownProps.name,
            foo: 'bar',
            requestDragHandle: requestDragHandle(),
          })
        );
        const myOwnProps = {
          name: 'Alex',
        };

        const wrapper = mountConnectedDraggable({
          map,
          mapProps: draggingMapProps,
          ownProps: myOwnProps,
        });

        const { isDragging, name, foo, requestDragHandle } = wrapper.find(Container).props();
        expect(isDragging).to.equal(draggingMapProps.isDragging);
        expect(name).to.equal('Alex');
        expect(foo).to.equal('bar');
        expect(typeof requestDragHandle === 'function').to.equal(true);
      });
    });

    describe('drag handle', () => {
      it('should wrap the draggable in a drag handle if the user does not request one', () => {
        const wrapper = mountConnectedDraggable();

        expect(wrapper.find(DragHandle).find(Container).length).to.equal(1);
      });

      it('should not wrap the draggable in a drag handle if the user requests to manage it', () => {
        const map = (state, ownProps, requestDragHandle) => ({
          dragHandle: requestDragHandle(),
        });

        const wrapper = mountConnectedDraggable({
          map,
        });

        expect(wrapper.find(DragHandle).find(Container).length).to.equal(0);
      });

      it('should allow a draggable to handle its own drag handle', () => {
        const map: MapState = (state: StateSnapshot, ownProps: OwnProps, requestDragHandle) => ({
          dragHandle: requestDragHandle(),
        });

        const wrapper = mountConnectedDraggable({
          map,
          Component: ContainerWithHandle,
        });

        expect(wrapper.find(ContainerWithHandle).shallow().find(DragHandle).length).to.equal(1);
      });
    });

    describe('movement', () => {
      // reaching into Movable to get the inline style
      const getInlineStyle = (wrapper: ReactWrapper<any>): Object =>
        wrapper.find(Moveable).props().style;

      it('should move by the provided offset on mount', () => {
        expect(draggingWrapper.find(Moveable).props().destination)
          .to.equal(draggingMapProps.offset);
      });

      it('should move by the provided offset on update', () => {
        const offsets: Position[] = [
          { x: 12, y: 3 },
          { x: 20, y: 100 },
          { x: -100, y: 20 },
        ];

        offsets.forEach((offset: Position) => {
          const newMapProps = {
            ...draggingMapProps,
            offset,
          };
          draggingWrapper.setProps({ mapProps: newMapProps });
          expect(draggingWrapper.find(Moveable).props().destination).to.equal(offset);
        });
      });

      describe('is not dragging', () => {
        it('should not render a placeholder', () => {
          expect(notDraggingWrapper.find(Placeholder).length).to.equal(0);
        });

        it('should have its initial zindex', () => {
          expect(getInlineStyle(notDraggingWrapper)).to.not.have.property('zIndex');
        });

        it('should have its initial position', () => {
          expect(getInlineStyle(notDraggingWrapper)).to.not.have.property('position');
        });

        it('should move quickly out of the way if needed', () => {
          expect(notDraggingWrapper.find(Moveable).props().speed).to.equal('FAST');
        });

        it('should instantly move out of the way if animation is disabled', () => {
          // $FlowFixMe
          const mapProps: MapProps = {
            ...notDraggingMapProps,
            canAnimate: false,
          };

          const customWrapper = mountConnectedDraggable({
            mapProps,
          });

          expect(customWrapper.find(Moveable).props().speed).to.equal('INSTANT');
        });
      });

      describe('is dragging', () => {
        it('should render a placeholder', () => {
          expect(draggingWrapper.find(Placeholder).length).to.equal(1);
        });

        it('should be above of draggables that are not dragging', () => {
          expect(getInlineStyle(notDraggingWrapper)).to.not.have.property('zIndex');
          expect(getInlineStyle(draggingWrapper).zIndex).to.be.a('number');
        });

        it('should be above draggables returning to home', () => {
          expect(getInlineStyle(draggingWrapper).zIndex)
            .to.be.above(getInlineStyle(returningHomeWrapper).zIndex);
        });

        it('should be positioned absolutely in the same spot as before', () => {
          const draggingInlineStyle = getInlineStyle(draggingWrapper);
          // appeasing flow
          if (!draggingMapProps.initial) {
            throw new Error('invalid data');
          }
          const dimension = draggingMapProps.initial.dimension;

          expect(draggingInlineStyle.position).to.equal('absolute');
          expect(draggingInlineStyle.zIndex).to.be.a('number');
          expect(draggingInlineStyle.width).to.equal(dimension.width);
          expect(draggingInlineStyle.height).to.equal(dimension.height);
          expect(draggingInlineStyle.top).to.equal(dimension.top);
          expect(draggingInlineStyle.left).to.equal(dimension.left);
        });

        it('should move quickly if it should animate', () => {
          // $FlowFixMe - spead operator on exact type
          const mapProps: MapProps = {
            ...draggingMapProps,
            canAnimate: true,
          };

          const wrapper = mountConnectedDraggable({
            mapProps,
          });

          expect(wrapper.find(Moveable).props().speed).to.equal('FAST');
        });

        it('should move instantly if it should not animate', () => {
          expect(draggingWrapper.find(Moveable).props().speed).to.equal('INSTANT');
        });
      });

      describe('returning to home after drop', () => {
        it('should render a placeholder', () => {
          expect(returningHomeWrapper.find(Placeholder).length).to.equal(1);
        });

        it('should move back to home with standard speed', () => {
          expect(returningHomeWrapper.find(Moveable).props().speed).to.equal('STANDARD');
        });

        it('should be on top of draggables that are not being dragged', () => {
          expect(getInlineStyle(returningHomeWrapper).zIndex).to.be.a('number');
          expect(getInlineStyle(notDraggingWrapper)).to.not.have.property('zIndex');
        });

        it('should be positioned absolutely in the same spot as before', () => {
          const inlineStyle = getInlineStyle(returningHomeWrapper);
          // appeasing flow
          if (!returningHomeMapProps.initial) {
            throw new Error('invalid data');
          }
          const dimension = returningHomeMapProps.initial.dimension;

          expect(inlineStyle.position).to.equal('absolute');
          expect(inlineStyle.zIndex).to.be.a('number');
          expect(inlineStyle.width).to.equal(dimension.width);
          expect(inlineStyle.height).to.equal(dimension.height);
          expect(inlineStyle.top).to.equal(dimension.top);
          expect(inlineStyle.left).to.equal(dimension.left);
        });
      });

      describe('dropped and return to home animation is finished', () => {
        // $FlowFixMe - spead operator and exact type
        const mapProps: MapProps = {
          ...returningHomeMapProps,
          isDropAnimating: false,
        };

        const wrapper = mountConnectedDraggable({
          mapProps,
        });

        it('should not render a placeholder', () => {
          expect(wrapper.find(Placeholder).length).to.equal(0);
        });

        it('should not be moved from its original position', () => {
          expect(getInlineStyle(wrapper)).to.not.have.property('position');
        });
      });

      describe('dropped but no return to home animation is needed', () => {
        // $FlowFixMe - spead operator and exact type
        const mapProps: MapProps = {
          ...returningHomeMapProps,
          canAnimate: false,
          isDropAnimating: false,
        };

        const wrapper = mountConnectedDraggable({
          mapProps,
        });

        it('should not render a placeholder', () => {
          expect(wrapper.find(Placeholder).length).to.equal(0);
        });

        it('should not be moved from its original position', () => {
          expect(getInlineStyle(wrapper)).to.not.have.property('position');
        });
      });
    });

    describe('not dragging', () => {

    });

    describe('dragging', () => {

    });

    describe('finished dragging', () => {

    });
  });

  describe('connected', () => {

  });
});
