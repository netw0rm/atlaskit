// FIXME - FAB-1732 looking at making a shared component for this

import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import * as classNames from 'classnames';
import { findDOMNode } from 'react-dom';

import * as styles from './styles';


export interface Props {
  children?: ReactNode;
}

export default class Scrollable extends PureComponent<Props, undefined> {
  private scrollableDiv: HTMLElement;

  // API
  reveal = (child: HTMLElement): void => {
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
