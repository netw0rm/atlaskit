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
import type { MapProps, OwnProps, MapStateToProps, StateSnapshot } from '../../../src/view/droppable/droppable-types';

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
      mapStateToProps?: () => mixed,
    |}

const shallowDroppable = ({
      type = 'TYPE',
      Component = Child,
      mapProps = notDraggingOverMapProps,
      ownProps = {},
      mapStateToProps = () => {},
    }: MountArgs = {}): ReactWrapper => {
  const Droppable = makeDroppable(type, mapStateToProps)(Component);
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
      mapStateToProps = () => {},
    }: MountArgs = {}): ReactWrapper => {
  const App = ({ children }) => children;
  const ConnectedApp = dragDropContext()(App);
  const Droppable = makeDroppable(type, mapStateToProps)(Component);

  return mount(
    <ConnectedApp>
      <Droppable
        mapProps={mapProps}
        ownProps={ownProps}
      />
    </ConnectedApp>
    );
};

describe('Droppable - unconnected', () => {
  it('should set the display name to reflect the component being wrapped', () => {
    const wrapper = mountDroppable({
      Component: Child,
    });

    expect(wrapper.find('Droppable').name()).to.equal('Droppable(Child)');
  });

  describe('providing a state snapshot to the provided mapStateToProps function', () => {
    it('should provide the mapStateToProps function with a snapshot of the current droppable state', () => {
      const mapStateToProps: MapStateToProps = sinon.stub().returns({});
      const expected: StateSnapshot = {
        isDraggingOver: true,
      };

      shallowDroppable({
        mapStateToProps,
        mapProps: isDraggingOverMapProps,
      });

      expect(mapStateToProps.calledWith(expected)).to.equal(true);
    });

    it('should provide the mapStateToProps function with the children\'s own props', () => {
      const mapStateToProps: MapStateToProps = sinon.stub().returns(empty);
      const ownProps = {
        foo: 'bar',
        bar: {
          count: 10,
        },
      };

      shallowDroppable({
        ownProps,
        mapStateToProps,
      });

      expect(mapStateToProps.args[0][1]).to.equal(ownProps);
    });

    it('should enhance the child\'s props with the result of the mapStateToProps function', () => {
      const mapStateToProps: MapStateToProps = sinon.spy(
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
        mapStateToProps,
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
