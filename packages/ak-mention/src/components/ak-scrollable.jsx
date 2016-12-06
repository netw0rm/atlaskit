import styles from 'style!./ak-scrollable.less';

import React, { PropTypes, PureComponent } from 'react';
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
    if (child && this._scrollableDiv) {
      const childNode = findDOMNode(child);
      // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
      // already visible
      const scrollableRect = this._scrollableDiv.getBoundingClientRect();
      const elementRect = childNode.getBoundingClientRect();
      if (elementRect.top < scrollableRect.top) {
        this._scrollableDiv.scrollTop += (elementRect.top - scrollableRect.top);
      } else if (elementRect.bottom > scrollableRect.bottom) {
        this._scrollableDiv.scrollTop += (elementRect.bottom - scrollableRect.bottom);
      }
    }
  }

  render() {
    return (
      <div
        className={styles.akScrollable}
        ref={(ref) => { this._scrollableDiv = ref; }}
      >
        {this.props.children}
      </div>
    );
  }
}
