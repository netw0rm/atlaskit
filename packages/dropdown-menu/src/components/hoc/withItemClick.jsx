// @flow
// We currently need to keep the dropdown open if an item with `href` is clicked, to avoid the
// analytics package to track the href value without the event target disappearing. Without this
// requirement, we could just use a native click event all the way up to DropdownMenuStateless,
// and could get rid of this HOC and DropdownItemClickManager.

import React, { PropTypes, Component } from 'react';

import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { clickManagerContext } from '../../util/contextNamespace';
import type { ReactElement } from '../../types';

type Props = {
  /** Content to be displayed inside the item. Same as @atlaskit/item `children` prop. */
  children?: ReactElement,
  /** If true, the item appears greyed out and does not fire click events. */
  isDisabled?: bool,
  /** If true, the item appears greyed out and does not fire click events. */
  href?: string,
  /** Standard onClick handler */
  onClick: (event?: Event) => void,
  onMouseDown: (event?: Event) => void
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

    handleMouseDown = (event: MouseEvent) => {
      this.props.onMouseDown(event);
    }

    render() {
      const { children, ...otherProps } = this.props;

      return (
        <WrappedItem
          {...otherProps}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
        >
          {children}
        </WrappedItem>
      );
    }
  }
);

export default withItemClick;
