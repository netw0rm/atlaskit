// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import textContent from 'react-addons-text-content';

import {
  GroupTitle,
  GroupTitleText,
  GroupTitleAfter,
} from '../styled/ItemGroup';

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
    /** Accessibility role to be applied to the root component */
    role: PropTypes.string,
    /** Accessibility label - if not provided the title will be used if available */
    label: PropTypes.node,
  }

  static defaultProps = {
    role: 'group',
  }

  headingAfterElement: Node // eslint-disable-line react/sort-comp

  render() {
    const { children, elemAfter, isCompact, title, label, innerRef, role } = this.props;

    const ariaLabel = (() => {
      if (label) {
        return textContent(label);
      }
      if (title) {
        return textContent(title);
      }
      return '';
    })();
    return (
      <div aria-label={ariaLabel} role={role} ref={innerRef}>
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
