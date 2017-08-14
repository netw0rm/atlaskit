// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  GroupTitle,
  GroupTitleText,
  GroupTitleAfter,
} from '../styled/ItemGroup';

type HTMLElement = any;

export default class ItemGroup extends Component {
  static propTypes = {
    /** Items to be shown inside the item group. */
    children: PropTypes.node,
    /** Causes the group title to be rendered with reduced spacing. */
    isCompact: PropTypes.bool,
    /** Optional heading text to be shown above the items. */
    title: PropTypes.node,
    /** Content to be shown to the right of the heading */
    elemAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /** A function that returns the DOM ref created by the group */
    innerRef: PropTypes.func,
  }
  // eslint-disable-next-line
  headingAfterElement: ?HTMLElement;

  state = { ariaLabel: this.props.title }

  componentDidMount = () => {
    if (this.props.title || this.props.elemAfter) {
      this.setState({ ariaLabel: this.getAriaLabel() });
    }
  }

  componentDidUpdate = () => {
    if (this.props.title || this.props.elemAfter) {
      const ariaLabel = this.getAriaLabel();
      if (this.state.ariaLabel !== ariaLabel) {
        this.setState({ ariaLabel });
      }
    }
  }

  getAriaLabel = () => {
    const { elemAfter, title } = this.props;
    const afterText = elemAfter && (typeof elemAfter === 'string')
        ? elemAfter
        : this.headingAfterElement && this.headingAfterElement.textContent;

    return `${title}${afterText ? ` ${String(afterText)}` : ''}`;
  }

  render() {
    const { children, elemAfter, isCompact, title, innerRef } = this.props;
    const { ariaLabel } = this.state;

    return (
      <div aria-label={ariaLabel} role="group" ref={innerRef}>
        {
          title ? (
            <GroupTitle aria-hidden="true" isCompact={isCompact}>
              <GroupTitleText>{title}</GroupTitleText>
              {
                elemAfter ? (
                  <GroupTitleAfter innerRef={r => (this.headingAfterElement = r)}>
                    {elemAfter}
                  </GroupTitleAfter>
                ) : null
              }
            </GroupTitle>
          ) : null
        }
        {children}
      </div>
    );
  }
}
