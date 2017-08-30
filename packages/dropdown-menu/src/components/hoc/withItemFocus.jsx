// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import uid from 'uid';

import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { focusManagerContext } from '../../util/contextNamespace';
import type { ItemId } from '../../types';

// HOC that typically wraps @atlaskit/item

const withItemFocus = (WrappedComponent:any) => (
  class WithItemFocus extends Component {
    static displayName = `WithItemFocus(${getDisplayName(WrappedComponent)})`;

    static propTypes = {
      /** Content to be displayed inside the item. Same as @atlaskit/item `children` prop. */
      children: PropTypes.node,
      /** If true, the item appears greyed out and does not fire click events. */
      isDisabled: PropTypes.bool,
      /** If true, the item is mounted but not rendered. */
      isHidden: PropTypes.bool,
    }

    static contextTypes = {
      [focusManagerContext]: PropTypes.object,
    };

    contextId: ItemId

    componentDidMount() {
      if (!this.isFocusable()) {
        return;
      }

      this.contextId = uid();
      // eslint-disable-next-line react/no-find-dom-node
      this.callContextFn('registerItem', this.contextId, ReactDOM.findDOMNode(this));
    }

    componentDidUpdate() {
      if (!this.isFocusable()) {
        return;
      }

      // eslint-disable-next-line react/no-find-dom-node
      this.callContextFn('updateItem', this.contextId, ReactDOM.findDOMNode(this));
    }

    componentWillUnmount() {
      if (this.isFocusable()) {
        this.callContextFn('deregisterItem', this.contextId);
      }
    }

    callContextFn = safeContextCall(this, focusManagerContext)

    isFocusable = () => !this.props.isDisabled && !this.props.isHidden

    handleFocus = () => {
      if (this.isFocusable()) {
        this.callContextFn('itemFocused', this.contextId);
      }
    }

    render() {
      const { children, ...otherProps } = this.props;

      return (
        <WrappedComponent
          onFocus={this.handleFocus}
          role="menuitem"
          {...otherProps}
        >
          {children}
        </WrappedComponent>
      );
    }
  }
);

export default withItemFocus;
