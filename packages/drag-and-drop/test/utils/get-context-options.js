// @flow
import PropTypes from 'prop-types';
import { storeKey, droppableIdKey } from '../../src/view/context-keys';
import createStore from '../../src/state/create-store';
import type { DroppableId } from '../../src/types';

type ContextDefinition = {|
  context: { [string] : any },
  childContextTypes: { [string] : any },
|}

// Not using this store - just putting it on the context
// For any connected components that need it (eg DimensionPublisher)
export const withStore = (): ContextDefinition => ({
  context: {
    // Each consumer will get their own store
    [storeKey]: createStore({ onDragEnd: () => { } }),
  },
  childContextTypes: {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  },
});

export const withDroppableId = (droppableId: DroppableId): ContextDefinition => ({
  context: {
    [droppableIdKey]: droppableId,
  },
  childContextTypes: {
    [droppableIdKey]: PropTypes.string.isRequired,
  },
});

export const combine = (first: ContextDefinition,
  second: ContextDefinition): ContextDefinition => ({
    context: {
      ...first.context,
      ...second.context,
    },
    childContextTypes: {
      ...first.childContextTypes,
      ...second.childContextTypes,
    },
  });
