// FIXME - FAB-1732 looking at making a shared component for this

import * as React from 'react';
import { PureComponent, ReactNode, UIEvent } from 'react';
import * as classNames from 'classnames';
import { findDOMNode } from 'react-dom';

import * as styles from './styles';

export interface OnScroll {
  (element: HTMLElement, event: UIEvent<any>): void;
}

export interface Props {
  maxHeight: string;
  children?: ReactNode;
  onScroll?: OnScroll;
}

export default class Scrollable extends PureComponent<Props, undefined> {
  private scrollableDiv: HTMLElement;

  // API
  reveal = (child: HTMLElement, forceToTop?: boolean): void => {
    if (child && this.scrollableDiv) {
      const childNode = findDOMNode(child);
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

  private handleScroll = (event) => {
    const sampleOffset = 10;
    let firstElement;
    if (this.scrollableDiv) {
      const scrollableRect = this.scrollableDiv.getBoundingClientRect();
      firstElement = document.elementFromPoint(
        scrollableRect.left + sampleOffset,
        scrollableRect.top + sampleOffset
      );
    }
    if (this.props.onScroll) {
      this.props.onScroll(firstElement, event);
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
        onScroll={this.handleScroll}
      >
        {this.props.children}
      </div>
    );
  }
}
