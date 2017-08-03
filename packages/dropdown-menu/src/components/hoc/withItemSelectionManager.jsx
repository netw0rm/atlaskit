// @flow

import React, { PropTypes, Component } from 'react';
import getDisplayName from '../../util/getDisplayName';
import DropdownItemSelectionManager from '../context/DropdownItemSelectionManager';
import type { Behaviors } from '../../types';

// HOC that typically wraps @atlaskit/item/ItemGroup
// $FlowFixMe
const withDropdownItemSelectionManager = (WrappedComponent, selectionBehavior: Behaviors) => (
  class WithDropdownItemSelectionManager extends Component {
    static displayName = `WithDropdownItemSelectionManager(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      children: PropTypes.node,
      id: PropTypes.string.isRequired,
    }

    render() {
      const { children, id, ...otherProps } = this.props;

      return (
        <WrappedComponent {...otherProps}>
          <DropdownItemSelectionManager groupId={id} behavior={selectionBehavior}>
            {children}
          </DropdownItemSelectionManager>
        </WrappedComponent>
      );
    }
  }
);

export default withDropdownItemSelectionManager;
