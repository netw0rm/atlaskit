// @flow
import React, { Children, cloneElement, PureComponent } from 'react';
import FlagAnimationWrapper from './FlagAnimationWrapper';
import Group, { SROnly, Inner } from '../styled/Group';
import type { ChildrenType, FunctionType } from '../types';

type Props = {
  /** Flag elements to be displayed. */
  children?: ChildrenType,
  /** Handler which will be called when a Flag's dismiss button is clicked.
    * Receives the id of the dismissed Flag as a parameter.
    */
  onDismissed?: FunctionType,
};

export default class FlagGroup extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp

  renderChildren = () => {
    const { children, onDismissed } = this.props;

    return Children.map(children, (flag, idx) => {
      const isDismissAllowed = idx === 0;
      const { id, key } = flag.props;

      return (
        <FlagAnimationWrapper key={id || key}>
          {cloneElement(flag, { onDismissed, isDismissAllowed })}
        </FlagAnimationWrapper>
      );
    });
  }

  render() {
    return (
      <Group>
        <SROnly>Flag notifications</SROnly>
        <Inner component="div">
          {this.renderChildren()}
        </Inner>
      </Group>
    );
  }
}
