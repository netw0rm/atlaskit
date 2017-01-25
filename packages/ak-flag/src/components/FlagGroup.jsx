import React, { PropTypes, PureComponent } from 'react';
import { akGridSizeInt } from 'akutil-shared-styles';
import styled from 'styled-components';
import FlagAnimationWrapper from './FlagAnimationWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export default class FlagGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
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
      {
        React.cloneElement(childFlag, {
          onDismissed: this.onFlagDismissRequested,
          isDismissAllowed: flagIndex === 0,
        })
      }
    </FlagAnimationWrapper>
  )

  render() {
    const RootSection = styled.section`
      bottom: ${akGridSizeInt * 6};
      left: ${akGridSizeInt * 10};
      position: fixed;
      z-index: 4;
    `;

    // this is an assistive h1. styles taken from `akutil-shared-styles/a11y.less`
    const SectionHeading = styled.h1`
      border: 0 !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      height: 1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      width: 1px !important;
      white-space: nowrap !important;
    `;

    const FlagsWrapper = styled.div`
      position: relative;
    `;

    return (
      <RootSection>
        <SectionHeading>Flag notifications</SectionHeading>
        <FlagsWrapper>{
          React.Children.map(this.props.children, this.renderFlag)
        }</FlagsWrapper>
      </RootSection>
    );
  }
}
