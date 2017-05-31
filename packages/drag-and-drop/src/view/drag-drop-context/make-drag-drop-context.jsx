// @flow
import React, { PureComponent, PropTypes } from 'react';
import getDisplayName from '../get-display-name';
import initialise from './hooks';
import createStore from '../../state/create-store';
// eslint-disable-next-line no-duplicate-imports
import type { Hooks } from './hooks';
import type { Store } from '../../types';
import storeKey from '../../state/get-store-key';

type Context = {|
  [storeKey]: Store
|}

export default (hooks?: Hooks = {}) => (Component: ReactClass<any>) => {
  const store: Store = createStore();

  initialise(hooks, store);

  return class DragDropContext extends PureComponent {
    static displayName = `DragDropContext(${getDisplayName(Component)})`

    // [need to declare childContextTypes without flow](https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/22)
    static childContextTypes = {
      [storeKey]: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        subscribe: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
      }).isRequired,
    }

    getChildContext(): Context {
      return {
        [storeKey]: store,
      };
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  };
};
