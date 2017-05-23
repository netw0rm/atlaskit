import React, { Children, cloneElement, PropTypes, PureComponent } from 'react';
import FlagAnimationWrapper from './FlagAnimationWrapper';
import Group, { SROnly, Inner } from '../styled/Group';

export default class FlagGroup extends PureComponent {
  static propTypes = {
    /** Flag elements to be displayed. */
    children: PropTypes.node,
    /**
      * Handler to be called once a Flag is dismissed and its animation has finished.
      * Receives the id of the dismissed Flag as a parameter.
      */
    onDismissed: PropTypes.func,
  };

  static defaultProps = {
    onDismissed: () => {},
  }

  state = {
    isAnimatingOut: false,
  }

  onFlagDismissRequested = () => {
    this.setState({ isAnimatingOut: true });
  }

  onFlagDismissFinished = (dismissedFlagId) => {
    this.setState({ isAnimatingOut: false });
    this.props.onDismissed(dismissedFlagId);
  }

  renderFlag = (childFlag, flagIndex) => (
    <FlagAnimationWrapper
      flagId={childFlag.props.id}
      isEntering={flagIndex === 0}
      isExiting={flagIndex === 0 && this.state.isAnimatingOut}
      isMovingToPrimary={flagIndex === 1 && this.state.isAnimatingOut}
      key={childFlag.props.id}
      onAnimationFinished={this.onFlagDismissFinished}
    >
      {cloneElement(childFlag, {
        onDismissed: this.onFlagDismissRequested,
        isDismissAllowed: flagIndex === 0,
      })}
    </FlagAnimationWrapper>
  )

  render() {
    return (
      <Group>
        <SROnly>Flag notifications</SROnly>
        <Inner>
          {Children.map(this.props.children, this.renderFlag)}
        </Inner>
      </Group>
    );
  }
}
