// @flow
/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import { shallow, mount } from 'enzyme';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import makeDraggable from '../../../src/view/draggable/make-draggable';
import Placeholder from '../../../src/view/draggable/placeholder';
import DragHandle from '../../../src/view/drag-handle/drag-handle';
import Moveable from '../../../src/view/moveable';
import { dragDropContext } from '../../../src/';
import type { Position } from '../../../src/types';
import type { DispatchProps, MapProps, OwnProps, StateSnapshot, MapStateToProps } from '../../../src/view/draggable/draggable-types';

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
  initial: null,
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

// $ExpectError - spread and exact types
const disableMapProps = (mapProps: MapProps): MapProps => ({
  ...mapProps,
  isDragEnabled: false,
});

type MountConnected = {
  type?: string,
  mapStateToProps?: MapStateToProps,
  Component?: ReactClass<any>,
  mapProps?: MapProps,
  dispatchProps?: DispatchProps,
  ownProps?: OwnProps,
};

const shallowDraggable = ({
  type = 'TYPE',
  mapStateToProps = () => empty,
  Component = Container,
  mapProps = notDraggingMapProps,
  dispatchProps = getDispatchPropsStub(),
  ownProps = empty,
}: MountConnected = {}): ReactWrapper => {
  const Draggable = makeDraggable(type, mapStateToProps)(Component);
  return shallow(
    <Draggable
      mapProps={mapProps}
      dispatchProps={dispatchProps}
      ownProps={ownProps}
    />);
};

const mountDraggable = ({
  type = 'TYPE',
  mapStateToProps = () => empty,
  Component = Container,
  mapProps = notDraggingMapProps,
  dispatchProps = getDispatchPropsStub(),
  ownProps = empty,
}: MountConnected = {}): ReactWrapper => {
  const App = ({ children }) => children;

  const ConnectedApp = dragDropContext()(App);

  const Draggable = makeDraggable(type, mapStateToProps)(Component);
  return mount(
    <ConnectedApp>
      <Draggable
        mapProps={mapProps}
        dispatchProps={dispatchProps}
        ownProps={ownProps}
      />
    </ConnectedApp>
  );
};

const originalScroll: Position = {
  x: window.pageXOffset,
  y: window.pageYOffset,
};

const setScroll = (point: Position) => {
  window.pageXOffset = point.x;
  window.pageYOffset = point.y;
};

type LiftHelper = {|
  dispatchProps?: DispatchProps,
  scroll ?: Position,
  center ?: Position,
  selection ?: Position,
|}
const lift = (fn: 'onLift' | 'onKeyLift') => (wrapper: ReactWrapper<any>) => ({
  scroll,
  center = origin,
  selection = origin,
  }: LiftHelper = {}) => {
  if (scroll) {
    setScroll(scroll);
  }

    // fake some position to get the center we want
  sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
    left: 0,
    top: 0,
    right: center.x * 2,
    bottom: center.y * 2,
  });

  try {
    wrapper.find(DragHandle).props()[fn](selection);
  } catch (e) {
    throw e;
  } finally {
    // unstubbing getBoundingClientRect
    Element.prototype.getBoundingClientRect.restore();
  }

  const [draggableIdArg, typeArg, centerArg, scrollArg, selectionArg]
          = wrapper.find('Draggable').at(0).props().dispatchProps.lift.args[0] || [];

  return {
    draggableId: draggableIdArg,
    type: typeArg,
    center: centerArg,
    scroll: scrollArg,
    selection: selectionArg,
  };
};

const mouseLift = lift('onLift');
const keyLift = lift('onKeyLift');

describe('Draggable', () => {
  let draggingWrapper;
  let notDraggingWrapper;
  let returningHomeWrapper;

  beforeEach(() => {
    // recreating the wrappers before every test to guard against side effects
    draggingWrapper = shallowDraggable({
      mapProps: draggingMapProps,
    });
    notDraggingWrapper = shallowDraggable({
      mapProps: notDraggingMapProps,
    });
    returningHomeWrapper = shallowDraggable({
      mapProps: returningHomeMapProps,
    });
  });

  afterEach(() => {
    setScroll(originalScroll);
  });

  it('should set the display name to reflect the component being wrapped', () => {
    const wrapper = mountDraggable({
      Component: Container,
    });

    expect(wrapper.find('Draggable').name()).to.equal('Draggable(Container)');
  });

  describe('providing a state snapshot to the provided mapStateToProps function', () => {
    it('should provide the mapStateToProps function with a snapshot of the current drag state', () => {
      const mapStateToProps: MapStateToProps = sinon.stub().returns(empty);
      const expected: StateSnapshot = {
        isDragging: true,
      };

      shallowDraggable({
        mapStateToProps,
        mapProps: draggingMapProps,
      });

      expect(mapStateToProps.args[0][0]).to.deep.equal(expected);
    });

    it('should provide the mapStateToProps function with the children\'s own props', () => {
      const mapStateToProps: MapStateToProps = sinon.stub().returns(empty);
      const ownProps = {
        foo: 'bar',
      };

      shallowDraggable({
        ownProps,
        mapStateToProps,
      });

      expect(mapStateToProps.args[0][1]).to.have.property('foo', 'bar');
    });

    it('should provide the mapStateToProps function a getDragHandle function which returns a DragHandle', () => {
      const mapStateToProps: MapStateToProps = sinon.spy(
          (snapshot: StateSnapshot, ownProps: Object, requestDragHandle: Function) => ({
            dragHandle: requestDragHandle(),
          })
        );

      shallowDraggable({
        mapStateToProps,
        mapProps: draggingMapProps,
      });

        // grab the requestDragHandle function
      const requestDragHandle = mapStateToProps.args[0][2];

        // mount the DragHandle independently
      const wrapper = mount(requestDragHandle()(<Child />));

      expect(wrapper.find(DragHandle).length).to.equal(1);
      expect(wrapper.find(DragHandle).find(Child).length).to.equal(1);
    });

    it('should enhance the childs props with the result of the mapStateToProps function', () => {
      const mapStateToProps: MapStateToProps = sinon.spy(
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

      const wrapper = shallowDraggable({
        mapStateToProps,
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
    describe('optional control of drag handle', () => {
      it('should wrap the draggable in a drag handle if the user does not request one', () => {
        const wrapper = shallowDraggable();

        expect(wrapper.find(DragHandle).find(Container).length).to.equal(1);
      });

      it('should not wrap the draggable in a drag handle if the user requests to manage it', () => {
        const mapStateToProps = (state, ownProps, requestDragHandle) => ({
          dragHandle: requestDragHandle(),
        });

        const wrapper = shallowDraggable({
          mapStateToProps,
        });

        expect(wrapper.find(DragHandle).find(Container).length).to.equal(0);
      });

      it('should allow a draggable to handle its own drag handle', () => {
        const mapStateToProps: MapStateToProps = (state: StateSnapshot, ownProps: OwnProps, requestDragHandle) => ({
          dragHandle: requestDragHandle(),
        });

        const wrapper = shallowDraggable({
          mapStateToProps,
          Component: ContainerWithHandle,
        });

        expect(wrapper.find(ContainerWithHandle).shallow().find(DragHandle).length).to.equal(1);
      });
    });

    describe('handling events', () => {
      describe('onLift', () => {
        let standardWrapper;
        let dispatchProps;

        beforeEach(() => {
          dispatchProps = getDispatchPropsStub();
          standardWrapper = mountDraggable({
            mapProps: notDraggingMapProps,
            dispatchProps,
          });
        });

        it('should throw if lifted when dragging is not enabled', () => {
          const wrapper = mountDraggable({
            mapProps: disableMapProps(notDraggingMapProps),
          });

          expect(() => mouseLift(wrapper)()).to.throw();
        });

        it('should throw if lifted when not attached to the dom', () => {
          standardWrapper.unmount();

          expect(() => mouseLift(standardWrapper)()).to.throw();
        });

        it('should lift with the draggable id', () => {
          const result = mouseLift(standardWrapper)();

          expect(result.draggableId).to.equal(defaultDraggableId);
          expect(result.type).to.equal('TYPE');
        });

        it('should lift with the draggable type', () => {
          const result = mouseLift(standardWrapper)();

          expect(result.type).to.equal('TYPE');
        });

        it('should lift with the selected position', () => {
          const selection: Position = {
            x: 100,
            y: 200,
          };
          const result = mouseLift(standardWrapper)({ selection });

          expect(result.selection).to.deep.equal(selection);
        });

        it('should lift with the scroll position', () => {
          const scroll: Position = {
            x: 100,
            y: 200,
          };
          const result = mouseLift(standardWrapper)({ scroll });

          expect(result.scroll).to.deep.equal(scroll);
        });

        it('should lift with the center position', () => {
          const center: Position = {
            x: 50,
            y: 80,
          };
          const result = mouseLift(standardWrapper)({ center });

          expect(result.center).to.deep.equal(center);
        });
      });

      describe('onMove', () => {
        it('should throw if dragging is not enabled', () => {
          const wrapper = mountDraggable({
            mapProps: disableMapProps(draggingMapProps),
          });

          const move = () => wrapper.find(DragHandle).onMove({ x: 100, y: 200 });

          expect(move).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const move = () => draggingWrapper.find(DragHandle).onMove({ x: 100, y: 200 });

          draggingWrapper.unmount();

          expect(move).to.throw();
        });

        it('should not do anything if the dimensions have not all been published yet', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: notDraggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().onMove({ x: 100, y: 200 });

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

          wrapper.find(DragHandle).props().onMove(mouse);
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
          wrapper.find(DragHandle).props().onMove(mockInitial.selection);
          const [, offset, center] = dispatchProps.move.args[0];

          expect(offset).to.deep.equal(scrollDiff);
          expect(center).to.deep.equal(expectedCenter);
        });
      });

      describe('onDrop', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = mountDraggable({
            mapProps: disableMapProps(draggingMapProps),
          });

          const drop = () => wrapper.find(DragHandle).props.onDrop();

          expect(drop).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const drop = () => draggingWrapper.find(DragHandle).props.onDrop();

          draggingWrapper.unmount();

          expect(drop).to.throw();
        });

        it('should trigger drop', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().onDrop();

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

        it('should throw if dragging is disabled', () => {
          const wrapper = shallowDraggable({
            mapProps: disableMapProps(notDraggingMapProps),
          });

          const onKeyLift = () => keyLift(wrapper)();

          expect(onKeyLift).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          const onKeyLift = () => keyLift(standardWrapper)();

          standardWrapper.unmount();

          expect(onKeyLift).to.throw();
        });

        it('should lift with the draggableId', () => {
          const result = keyLift(standardWrapper)();

          expect(result.draggableId).to.equal(defaultDraggableId);
        });

        it('should lift with the current center position', () => {
          const center: Position = {
            x: 50,
            y: 80,
          };
          const result = keyLift(standardWrapper)({ center });

          expect(result.center).to.deep.equal(center);
        });

        it('should lift with the current scroll position', () => {
          const scroll: Position = {
            x: 100,
            y: 200,
          };
          const result = keyLift(standardWrapper)({ scroll });

          expect(result.scroll).to.deep.equal(scroll);
        });

        it('should lift with the center point as the selected position', () => {
          const center: Position = {
            x: 100,
            y: 200,
          };
          const result = keyLift(standardWrapper)({ center });

          expect(result.selection).to.deep.equal(center);
        });
      });

      describe('onMoveBackward', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = shallowDraggable({
            mapProps: disableMapProps(notDraggingMapProps),
          });

          const tryMove = () => wrapper.find(DragHandle).props().onMoveBackward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          notDraggingWrapper.unmount();

          const tryMove = () => notDraggingWrapper.find(DragHandle).props().onMoveBackward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should call the move backward action', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().onMoveBackward(defaultDraggableId);

          expect(dispatchProps.moveBackward.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onMoveForward', () => {
        it('should throw if dragging is disabled', () => {
          const wrapper = shallowDraggable({
            mapProps: disableMapProps(notDraggingMapProps),
          });

          const tryMove = () => wrapper.find(DragHandle).props().onMoveForward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should throw if not attached to the DOM', () => {
          notDraggingWrapper.unmount();

          const tryMove = () => notDraggingWrapper.find(DragHandle).props().onMoveForward(defaultDraggableId);

          expect(tryMove).to.throw();
        });

        it('should call the move forward action', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().onMoveForward(defaultDraggableId);

          expect(dispatchProps.moveForward.calledWith(defaultDraggableId)).to.equal(true);
        });
      });

      describe('onCancel', () => {
        it('should call the cancel dispatch prop', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = shallowDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });

        it('should allow the action even if dragging is disabled', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = shallowDraggable({
            mapProps: disableMapProps(draggingMapProps),
            dispatchProps,
          });

          wrapper.find(DragHandle).props().onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });

        it('should allow the action even when not attached to the dom', () => {
          const dispatchProps = getDispatchPropsStub();
          const wrapper = mountDraggable({
            mapProps: draggingMapProps,
            dispatchProps,
          });

          wrapper.find(DragHandle).props().onCancel(defaultDraggableId);

          expect(dispatchProps.cancel.calledWith(defaultDraggableId)).to.equal(true);
        });
      });
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
      const offsets: Array<Position> = [
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

    it('should give a placeholder the same dimension of the element being moved', () => {
      const props = draggingWrapper.find(Placeholder).props();
      expect(props.height).to.equal(mockInitial.dimension.height);
      expect(props.width).to.equal(mockInitial.dimension.width);
    });

    describe('is not dragging', () => {
      it('should not render a placeholder', () => {
        expect(notDraggingWrapper.find(Placeholder).length).to.equal(0);
      });

      it('should have its initial z index', () => {
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

        const customWrapper = shallowDraggable({
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

      it('should be above Draggables returning to home', () => {
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
          // $ExpectError - spread operator on exact type
        const mapProps: MapProps = {
          ...draggingMapProps,
          canAnimate: true,
        };

        const wrapper = shallowDraggable({
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
          // $ExpectError - initial is nullable
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
        // $ExpectError - spead operator and exact type
      const mapProps: MapProps = {
        ...returningHomeMapProps,
        isDropAnimating: false,
      };

      const wrapper = shallowDraggable({
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
        // $ExpectError - spread operator and exact type
      const mapProps: MapProps = {
        ...returningHomeMapProps,
        canAnimate: false,
        isDropAnimating: false,
      };

      const wrapper = shallowDraggable({
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
});
