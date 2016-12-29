// FIXME - FAB-1732 looking at making a shared component for this

import styles from 'style!../../style.less';

import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';

export default class Scrollable extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  // API
  reveal = (child) => {
    if (child && this.scrollableDiv) {
      const childNode = findDOMNode(child);
      // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
      // already visible
      const scrollableRect = this.scrollableDiv.getBoundingClientRect();
      const elementRect = childNode.getBoundingClientRect();
      if (elementRect.top < scrollableRect.top) {
        this.scrollableDiv.scrollTop += (elementRect.top - scrollableRect.top);
      } else if (elementRect.bottom > scrollableRect.bottom) {
        this.scrollableDiv.scrollTop += (elementRect.bottom - scrollableRect.bottom);
      }
    }
  }

  render() {
    const scrollableClasses = classNames([
      'emoji-scrollable',
      styles.emojiScrollable,
    ]);

    return (
      <div
        className={scrollableClasses}
        ref={(ref) => { this.scrollableDiv = ref; }}
      >
        {this.props.children}
      </div>
    );
  }
}
