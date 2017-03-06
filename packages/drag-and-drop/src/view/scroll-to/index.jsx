// @flow
import React, { PureComponent } from 'react';
import invariant from 'invariant';

type Props = {
  shouldScroll: boolean,
  outerRef?: ?Element,
  children?: React$Element<any>,
}

export default class ScrollTo extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable */

  componentDidUpdate() {
    if (!this.props.shouldScroll) {
      return;
    }
    invariant(this.props.outerRef, 'cannot scroll to a ref that is not provided');

    // scroll to Element
    console.log('scrolling element', this.props.outerRef);
    // debugger;
    // setTimeout(() => {
    // this.props.outerRef.scrollIntoView();
    // });
  }

  render() {
    return this.props.children;
  }
}

