// @flow

import React, { PropTypes, Component } from 'react';

import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { clickManagerContext } from '../../util/contextNamespace';
import type { ReactElement } from '../../types';

type Props = {
  /** Content to be displayed inside the item. Same as @atlaskit/item `children` prop. */
  children: ReactElement,
  /** If true, the item appears greyed out and does not fire click events. */
  isDisabled?: bool,
  /** If true, the item appears greyed out and does not fire click events. */
  href?: string,
  /** Standard onClick handler */
  onClick: (event: MouseEvent | KeyboardEvent) => {},
}

// HOC that typically wraps @atlaskit/item
const withItemClick = (WrappedItem: ReactElement) => (
  class WithItemClick extends Component {
    static displayName = `WithItemClick(${getDisplayName(WrappedItem)})`;
    static defaultProps = {
      onClick: () => {},
    }

    props: Props

    static contextTypes = {
      [clickManagerContext]: PropTypes.object,
    };

    callContextFn = safeContextCall(this, clickManagerContext)

    shouldCloseAfterClick = () => (
      !this.props.isDisabled &&
      !this.props.href
    )

    handleClick = (event: MouseEvent | KeyboardEvent) => {
      this.props.onClick(event);
      if (this.shouldCloseAfterClick()) {
        this.callContextFn('itemClicked');
      }
    }

    handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Space' || event.key === 'Enter') {
        this.handleClick(event);
      }
    }

    render() {
      const { children, ...otherProps } = this.props;

      return (
        <WrappedItem
          {...otherProps}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {children}
        </WrappedItem>
      );
    }
  }
);

export default withItemClick;
