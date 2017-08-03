// @flow

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import uid from 'uid';

import getDisplayName from '../../util/getDisplayName';
import { focusManagerContext } from '../../util/contextNamespace';
import type { ItemId } from '../../types';

// HOC that typically wraps @atlaskit/item
// $FlowFixMe
const withItemFocus = WrappedComponent => (
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
      [focusManagerContext]: PropTypes.object.isRequired,
    };

    contextId: ItemId

    componentDidMount() {
      if (!this.isFocusable()) {
        return;
      }

      this.contextId = uid();
      this.context[focusManagerContext].registerItem(
        this.contextId,
        // eslint-disable-next-line react/no-find-dom-node
        ReactDOM.findDOMNode(this)
      );
    }

    componentDidUpdate() {
      if (!this.isFocusable()) {
        return;
      }

      this.context[focusManagerContext].updateItem(
        this.contextId,
        // eslint-disable-next-line react/no-find-dom-node
        ReactDOM.findDOMNode(this)
      );
    }

    componentWillUnmount() {
      if (this.isFocusable()) {
        this.context[focusManagerContext].deregisterItem(this.contextId);
      }
    }

    isFocusable = () => !this.props.isDisabled && !this.props.isHidden

    handleFocus = () => {
      if (this.isFocusable()) {
        this.context[focusManagerContext].itemFocused(this.contextId);
      }
    }

    render() {
      const { children, ...otherProps } = this.props;

      return (
        <WrappedComponent
          onFocus={this.handleFocus}
          {...otherProps}
        >
          {children}
        </WrappedComponent>
      );
    }
  }
);

export default withItemFocus;
