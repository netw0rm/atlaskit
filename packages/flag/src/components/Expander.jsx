// @flow
import React, { PureComponent } from 'react';
import ExpanderInternal from '../styled/Expander';
import type { ChildrenType } from '../types';

type Props = {
  children?: ChildrenType,
  isExpanded?: boolean,
};

export default class Expander extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp
  static defaultProps = { isExpanded: false }
  state = { isAnimating: false }

  componentWillUpdate(nextProps) {
    if (this.props.isExpanded !== nextProps.isExpanded) {
      this.setState({ isAnimating: true });
    }
  }

  handleTransitionEnd = () => {
    this.setState({ isAnimating: false });
  }

  render() {
    const { children, isExpanded } = this.props;
    const { isAnimating } = this.state;

    // Need to always render the ExpanderInternal otherwise the
    // reveal transiton doesn't happen. We can't use CSS animation for
    // the the reveal because we don't know the height of the content.
    const childrenIfExpanded = (isAnimating || isExpanded) ? children : null;

    return (
      <ExpanderInternal
        aria-hidden={!isExpanded}
        isExpanded={isExpanded}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {childrenIfExpanded}
      </ExpanderInternal>
    );
  }
}
