// @flow
import React, { PureComponent } from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import makeDraggable from '../../src/view/draggable/make-draggable';
import DragHandle from '../../src/view/drag-handle/drag-handle';
import { dragDropContext } from '../../src/';
import type { DraggingInitial } from '../../src/types';
import type { DispatchProps, MapProps, OwnProps, StateSnapshot } from '../../src/view/draggable/draggable-types';

const describe = window.describe;
const it = window.it;
const beforeEach = window.beforeEach;
const afterEach = window.afterEach;

class App extends PureComponent {
  render() {
    console.log('rendering app');
    return this.props.children;
  }
}

const ConnectedApp = dragDropContext()(App);

class Child extends PureComponent {
  render() {
    console.log('rendering child');
    return <div>hello world!</div>;
  }
}

class ChildWithHandle extends PureComponent {
  render() {
    return (
      <div>
        A child that contains a
        {this.props.dragHandle(<button>handle</button>)}
      </div>
    )
  }
}

class Container extends PureComponent {
  render() {
    console.log('rendering container');
    return (
      <div ref={this.props.innerRef}>
        Hello world!
      </div>
    );
  }
}

class ContainerWithHandle extends PureComponent {
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
  dropFinished: sinon.stub(),
});

const empty = {};
const defaultId = '1';
const defaultMapProps: MapProps = {
  id: defaultId,
  isDragEnabled: true,
  isDragging: false,
  canAnimate: true,
};

const mockInitial: DraggingInitial = {
  source: {
    droppableId: 'd1',
    index: 0,
  },
  center: { x: 50, y: 50 },
  scroll: { x: 0, y: 0 },
  selection: { x: 20, y: 20 },
  dimension: {
    id: defaultId,
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
  }
}

const draggingMapProps: MapProps = {
  id: defaultId,
  isDragEnabled: true,
  isDragging: true,
  canAnimate: true,
  initial: mockInitial,
};

describe('Draggable', () => {
  describe('unconnected', () => {
    describe('placeholder', () => {
      it('should not render a placeholder when the item is not dragging', () => {

      });

      it('should render a placeholder if the item is dragging', () => {

      });

      it('should render a placeholder if the item was dragging but as not finished animating yet', () => {

      });

      it('should not render a placeholder once the drag animation is finished', () => {

      });

      it('should not render a placeholder if a drag is finished and no animation is required', () => {

      });
    });

    describe('providing state to map function', () => {
      it('should provide the map function with a snapshot of the current drag state', () => {
        const map = sinon.stub().returns(empty);
        const Draggable = makeDraggable('TYPE', map)(Container);
        const mapProps = {
          ...defaultMapProps,
          isDragging: true,
        }
        const expected: StateSnapshot = {
          isDragging: true,
        };

        const wrapper = mount(
          <ConnectedApp>
            <Draggable
              mapProps={mapProps}
              dispatchProps={getDispatchPropsStub()}
              ownProps={{}}
            />
          </ConnectedApp>
        );

        expect(map.args[0][0]).to.deep.equal(expected);

      });

      it('should provide the map function with the childrens own props', () => {

      });

      it('should provide the map function a getDragHandle function which returns a DragHandle', () => {

      });

      it('should enhance the childs props with the result of the map function', () => {

      });
    });

    describe('drag handle', () => {
      it('should wrap the draggable in a drag handle if the user does not request one', () => {

        const Draggable = makeDraggable('TYPE', () => empty)(Container);
        const wrapper = mount(
          <ConnectedApp>
            <Draggable
              mapProps={defaultMapProps}
              dispatchProps={getDispatchPropsStub()}
              ownProps={{}}
            />
          </ConnectedApp>
        );

        expect(wrapper.find(DragHandle).find(Container).length).to.equal(1);
      });

      it('should not wrap the draggable in a drag handle if the user requests to manage it', () => {
        const map = (state, ownProps, requestDragHandle) => {
          return {
            dragHandle: requestDragHandle(),
          };
        };
        const Draggable = makeDraggable('TYPE', map)(Container);
        const wrapper = mount(
          <ConnectedApp>
            <Draggable
              mapProps={defaultMapProps}
              dispatchProps={getDispatchPropsStub()}
              ownProps={{}}
            />
          </ConnectedApp>
        );

        expect(wrapper.find(DragHandle).find(Container).length).to.equal(0);
      });

      it('should allow a draggable to handle its own drag handle', () => {
        const map = (state, ownProps, requestDragHandle) => {
          return {
            dragHandle: requestDragHandle(),
          };
        };
        const Draggable = makeDraggable('TYPE', map)(ContainerWithHandle);
        const wrapper = mount(
          <ConnectedApp>
            <Draggable
              mapProps={draggingMapProps}
              dispatchProps={getDispatchPropsStub()}
              ownProps={{}}
            />
          </ConnectedApp>
        );

        expect(wrapper.find(ContainerWithHandle).find(DragHandle).length).to.equal(1);
      })
    });

    describe('placement', () => {

    });

    describe('not dragging', () => {
      it('should not render a placeholder', () => {

      });
    });

    describe('dragging', () => {

    });

    describe('finished dragging', () => {

    });
  });

  describe('connected', () => {

  });
});
