// FIXME - FAB-1732 looking at making a shared component for this

import styles from 'style!../../style.less';

import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';

const getDomNode = (refOrSelector) => {
  if (typeof refOrSelector === 'string') {
    return document.querySelector(refOrSelector);
  }
  // assume React ref
  return findDOMNode(refOrSelector);
};

export default class Scrollable extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    maxHeight: PropTypes.string.isRequired,
    onScroll: PropTypes.func,
  }

  static defaultProps = {
    onScroll: () => {},
  }

  onScroll = (event) => {
    const sampleOffset = 10;
    let firstElement;
    if (this.scrollableDiv) {
      const scrollableRect = this.scrollableDiv.getBoundingClientRect();
      firstElement = document.elementFromPoint(
        scrollableRect.left + sampleOffset,
        scrollableRect.top + sampleOffset
      );
    }
    this.props.onScroll(event, firstElement);
  }

  // API
  reveal = (child, forceToTop) => {
    if (child && this.scrollableDiv) {
      const childNode = getDomNode(child);
      if (childNode) {
        // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
        // already visible
        const scrollableRect = this.scrollableDiv.getBoundingClientRect();
        const elementRect = childNode.getBoundingClientRect();
        if (forceToTop || elementRect.top < scrollableRect.top) {
          this.scrollableDiv.scrollTop += (elementRect.top - scrollableRect.top);
        } else if (elementRect.bottom > scrollableRect.bottom) {
          this.scrollableDiv.scrollTop += (elementRect.bottom - scrollableRect.bottom);
        }
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
        style={{ maxHeight: this.props.maxHeight }}
        onScroll={this.onScroll}
      >
        {this.props.children}
      </div>
    );
  }
}
