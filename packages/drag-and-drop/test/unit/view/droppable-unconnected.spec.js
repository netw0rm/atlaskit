// @flow
import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import type { ReactWrapper } from 'enzyme';
import makeDroppable from '../../../src/view/droppable/make-droppable';
import { dragDropContext } from '../../../src/';
import type { TypeId, DroppableId } from '../../../src/types';
import type { MapProps, OwnProps, MapState, StateSnapshot } from '../../../src/view/droppable/droppable-types';

const empty = {};
const noop = () => {};

const Child = () => <div>Hello world</div>;
const defaultId = '1';
const notDraggingOverMapProps: MapProps = {
  id: defaultId,
  isDraggingOver: false,
};
const isDraggingOverMapProps: MapProps = {
  id: defaultId,
  isDraggingOver: true,
};

type MountArgs = {|
      type?: TypeId,
      Component?: ReactClass<any>,
      mapProps?: MapProps,
      ownProps?: OwnProps,
      map?: () => mixed,
    |}

const shallowDroppable = ({
      type = 'TYPE',
      Component = Child,
      mapProps = notDraggingOverMapProps,
      ownProps = {},
      map = () => {},
    }: MountArgs = {}): ReactWrapper => {
  const Droppable = makeDroppable(type, map)(Component);
  return shallow(
    <Droppable
      mapProps={mapProps}
      ownProps={ownProps}
    />
    );
};

const mountDroppable = ({
      type = 'TYPE',
      Component = Child,
      mapProps = notDraggingOverMapProps,
      ownProps = {},
      map = () => {},
    }: MountArgs = {}): ReactWrapper => {
  const App = ({ children }) => children;
  const ConnectedApp = dragDropContext()(App);
  const Droppable = makeDroppable(type, map)(Component);

  return mount(
    <ConnectedApp>
      <Droppable
        mapProps={mapProps}
        ownProps={ownProps}
      />
    </ConnectedApp>
    );
};

describe.only('Droppable - unconnected', () => {
  it('should set the display name to reflect the component being wrapped', () => {
    const wrapper = mountDroppable({
      Component: Child,
    });

    expect(wrapper.find('Droppable').name()).to.equal('Droppable(Child)');
  });

  describe('providing a state snapshot to the provided map function', () => {
    it('should provide the map function with a snapshot of the current droppable state', () => {
      const map: MapState = sinon.stub().returns({});
      const expected: StateSnapshot = {
        isDraggingOver: true,
      };

      shallowDroppable({
        map,
        mapProps: isDraggingOverMapProps,
      });

      expect(map.calledWith(expected)).to.equal(true);
    });

    it('should provide the map function with the children\'s own props', () => {
      const map: MapState = sinon.stub().returns(empty);
      const ownProps = {
        foo: 'bar',
        bar: {
          count: 10,
        },
      };

      shallowDroppable({
        ownProps,
        map,
      });

      expect(map.args[0][1]).to.equal(ownProps);
    });

    it('should enhance the child\'s props with the result of the map function', () => {
      const map: MapState = sinon.spy(
        (snapshot: StateSnapshot, ownProps: Object) => ({
          isDraggingOver: snapshot.isDraggingOver,
          name: ownProps.name,
          foo: 'bar',
        })
      );
      const myOwnProps = {
        name: 'Alex',
      };

      const wrapper = shallowDroppable({
        map,
        Component: Child,
        mapProps: isDraggingOverMapProps,
        ownProps: myOwnProps,
      });

      const { isDraggingOver, name, foo } = wrapper.find(Child).props();
      expect(isDraggingOver).to.equal(isDraggingOverMapProps.isDraggingOver);
      expect(name).to.equal('Alex');
      expect(foo).to.equal('bar');
    });
  });
});
