// @flow
import React, { PureComponent } from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
// eslint-disable-next-line no-duplicate-imports
import type { ReactWrapper } from 'enzyme';
import Droppable from '../../../src/view/droppable/droppable';
import storeKey from '../../../src/state/get-store-key';
import createStore from '../../../src/state/create-store';
import type { DroppableId } from '../../../src/types';
import type { MapProps, OwnProps, Provided } from '../../../src/view/droppable/droppable-types';

const getStubber = (stub?: Function = sinon.stub()) =>
  class Stubber extends PureComponent {
    props: {|
      provided: Provided
    |}
    render() {
      stub(this.props.provided);
      return (
        <div>Hey there</div>
      );
    }
};
const defaultDroppableId: DroppableId = 'droppable-1';
const notDraggingOverMapProps: MapProps = {
  isDraggingOver: false,
};
const isDraggingOverMapProps: MapProps = {
  isDraggingOver: true,
};

// $ExpectError - not providing children
const defaultOwnProps: OwnProps = {
  droppableId: defaultDroppableId,
  isDropEnabled: true,
};

type MountArgs = {|
  Component: any,
  ownProps?: OwnProps,
  mapProps?: MapProps,
|}

const mountDroppable = ({
  Component,
  ownProps = defaultOwnProps,
  mapProps = notDraggingOverMapProps,
}: MountArgs = {}): ReactWrapper => {
  // Not using this store - just putting it on the context
  // for any connected components that need it (eg DimensionPublisher)
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
    <Droppable
      {...ownProps}
      {...mapProps}
    >
      {(provided: Provided) => (
        <Component provided={provided} />
      )}
    </Droppable>
    , options);
};

describe('Droppable - unconnected', () => {
  it('should provide the props to its children', () => {
    const props: MapProps[] = [
      notDraggingOverMapProps, isDraggingOverMapProps,
    ];

    props.forEach((mapProps: MapProps) => {
      const stub = sinon.stub();

      mountDroppable({
        mapProps,
        Component: getStubber(stub),
      });

      const provided: Provided = stub.args[0][0];
      expect(provided.isDraggingOver).to.equal(mapProps.isDraggingOver);
    });
  });
});
