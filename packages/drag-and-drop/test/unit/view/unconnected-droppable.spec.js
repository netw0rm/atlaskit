// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import type { MapProps, OwnProps, Provided, StateSnapshot } from '../../../src/view/droppable/droppable-types';

const getStubber = (stub?: Function = sinon.stub()) =>
  class Stubber extends PureComponent {
    props: {|
      provided: Provided,
      snapshot: StateSnapshot,
    |}
    render() {
      stub({
        provided: this.props.provided,
        snapshot: this.props.snapshot,
      });
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
  isDropDisabled: false,
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
      [storeKey]: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        subscribe: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
      }).isRequired,
    },
  };

  return mount(
    <Droppable
      {...ownProps}
      {...mapProps}
    >
      {(provided: Provided, snapshot: StateSnapshot) => (
        <Component provided={provided} snapshot={snapshot} />
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

      const provided: Provided = stub.args[0][0].provided;
      const snapshot: StateSnapshot = stub.args[0][0].snapshot;
      expect(provided.innerRef).to.be.a('function');
      expect(snapshot.isDraggingOver).to.equal(mapProps.isDraggingOver);
    });
  });
});
