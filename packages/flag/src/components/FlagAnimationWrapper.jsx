import React, { PropTypes, PureComponent } from 'react';
import Wrapper from '../styled/Wrapper';

export default class FlagAnimationWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    flagId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isEntering: PropTypes.bool,
    isExiting: PropTypes.bool,
    isMovingToPrimary: PropTypes.bool,
    onAnimationFinished: PropTypes.func,
  };

  static defaultProps = {
    isEntering: false,
    isExiting: false,
    isMovingToPrimary: false,
    onAnimationFinished: () => {},
  };

  state = {
    hasAnimatedIn: false,
  }

  componentDidUpdate() {
    if (this.state.hasAnimatedIn === false) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hasAnimatedIn: true });
    }
  }

  render() {
    const { hasAnimatedIn } = this.state;
    const {
      children, flagId, isEntering, isExiting, isMovingToPrimary, onAnimationFinished,
    } = this.props;
    const isEnteringQualified = !hasAnimatedIn && !isExiting && isEntering;

    return (
      <Wrapper
        isEntering={isEnteringQualified}
        isExiting={isExiting}
        isMovingToPrimary={isMovingToPrimary}
        onAnimationEnd={() => isExiting && onAnimationFinished(flagId)}
      >
        {children}
      </Wrapper>
    );
  }
}
