// @flow
import React, { PureComponent } from 'react';
import Provider from './provider';
import getDisplayName from '../get-display-name';
import initialise from './hooks';
import createStore from '../../state/create-store';
// eslint-disable-next-line no-duplicate-imports
import type { Hooks } from './hooks';
import type { Store } from '../../types';

export default (hooks?: Hooks = {}) => (Component: ReactClass<any>) => {
  const store: Store = createStore();

  initialise(hooks, store);

  return class DragDropContext extends PureComponent {
    static displayName = `DragDropContext(${getDisplayName(Component)})`

    render() {
      return (
        <Provider store={store}>
          <Component {...this.props} />
        </Provider>
      );
    }
  };
};
