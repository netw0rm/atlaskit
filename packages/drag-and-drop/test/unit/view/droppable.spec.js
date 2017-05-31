// @flow
import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import type { ReactWrapper } from 'enzyme';
import makeDroppable from '../../../src/view/droppable/make-droppable';
import type { TypeId } from '../../../src/types';
import type { MapProps, OwnProps, MapState } from '../../../src/view/droppable/droppable-types';

describe('Droppable', () => {
  describe('unconnected', () => {
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

    const createMap = (id?: DroppableId = defaultId, isDraggingOver?: boolean): NeedsProviding => ({
      id: defaultId,
      isDraggingOver,
    });

    type MountArgs = {|
      type?: TypeId,
      map?: MapState,
      Component?: ReactClass<any>,
      mapProps?: MapProps,
      ownProps?: OwnProps,
    |}

    const mountShallow = ({
      type = 'TYPE',
      Component = Child,
      mapProps = notDraggingOverMapProps,
      map = createMap(),
      ownProps = {},
    }: MountArgs = {}): ReactWrapper => {
      const Droppable = makeDroppable(type, map)(Component);

      return shallow(
        <Droppable
          mapProps={mapProps}
          ownProps={ownProps}
        />
      );
    };

    it('should set the display name to reflect the component being wrapped', () => {
      const wrapper = mountShallow({
        Component: Child,
      });

      expect(wrapper.find('Droppable').name()).to.equal('Droppable(Child)');
    });

    // describe.skip('providing a state snapshot to the provided map function', () => {
    //   it('should provide the map function with a snapshot of the current drag state', () => {
    //     const map: MapState = sinon.stub().returns(empty);
    //     const expected: StateSnapshot = {
    //       isDragging: true,
    //     };

    //     shallowDraggable({
    //       map,
    //       mapProps: draggingMapProps,
    //     });

    //     expect(map.args[0][0]).to.deep.equal(expected);
    //   });

    //   it('should provide the map function with the children\'s own props', () => {
    //     const map: MapState = sinon.stub().returns(empty);
    //     const ownProps = {
    //       foo: 'bar',
    //     };

    //     shallowDraggable({
    //       ownProps,
    //       map,
    //     });

    //     expect(map.args[0][1]).to.have.property('foo', 'bar');
    //   });

    //   it('should provide the map function a getDragHandle function which returns a DragHandle', () => {
    //     const map: MapState = sinon.spy(
    //       (snapshot: StateSnapshot, ownProps: Object, requestDragHandle: Function) => ({
    //         dragHandle: requestDragHandle(),
    //       })
    //     );

    //     shallowDraggable({
    //       map,
    //       mapProps: draggingMapProps,
    //     });

    //     // grab the requestDragHandle function
    //     const requestDragHandle = map.args[0][2];

    //     // mount the DragHandle independently
    //     const wrapper = mount(requestDragHandle()(<Child />));

    //     expect(wrapper.find(DragHandle).length).to.equal(1);
    //     expect(wrapper.find(DragHandle).find(Child).length).to.equal(1);
    //   });

    //   it('should enhance the childs props with the result of the map function', () => {
    //     const map: MapState = sinon.spy(
    //       (snapshot: StateSnapshot, ownProps: Object, requestDragHandle: Function) => ({
    //         isDragging: snapshot.isDragging,
    //         name: ownProps.name,
    //         foo: 'bar',
    //         requestDragHandle: requestDragHandle(),
    //       })
    //     );
    //     const myOwnProps = {
    //       name: 'Alex',
    //     };

    //     const wrapper = shallowDraggable({
    //       map,
    //       mapProps: draggingMapProps,
    //       ownProps: myOwnProps,
    //     });

    //     const { isDragging, name, foo, requestDragHandle } = wrapper.find(Container).props();
    //     expect(isDragging).to.equal(draggingMapProps.isDragging);
    //     expect(name).to.equal('Alex');
    //     expect(foo).to.equal('bar');
    //     expect(typeof requestDragHandle === 'function').to.equal(true);
    //   });
    // });
  });

  describe('connected', () => {

  });
});
