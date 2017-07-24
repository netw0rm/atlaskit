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

const base: ContextDefinition = {
  context: {},
  childContextTypes: {},
};

export const combine = (...args: ContextDefinition[]): ContextDefinition =>
  args.reduce((previous: ContextDefinition, current: ContextDefinition): ContextDefinition => ({
    context: {
      ...previous.context,
      ...current.context,
    },
    childContextTypes: {
      ...previous.childContextTypes,
      ...current.childContextTypes,
    },
  }), base);
