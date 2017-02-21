import React, { PureComponent } from 'react';
import Provider from './provider';
import getDisplayName from '../get-display-name';

export default (Component: React$Element) => (
  class DragDropContext extends PureComponent {
    static displayName = `DragDropContext(${getDisplayName(Component)})`

    render() {
      return (
        <Provider>
          <Component {...this.props} />
        </Provider>
      );
    }
  }
);
