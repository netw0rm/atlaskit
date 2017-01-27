import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/FlagAnimationWrapper.less';

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
    return (
      <div
        className={classNames({
          [styles.root]: true,
          [styles.entering]: (
            !this.state.hasAnimatedIn &&
            !this.props.isExiting &&
            this.props.isEntering
          ),
          [styles.movingToPrimary]: this.props.isMovingToPrimary,
          [styles.exiting]: this.props.isExiting,
        })}
        onAnimationEnd={() => {
          if (this.props.isExiting) {
            this.props.onAnimationFinished(this.props.flagId);
          }
        }}
      >
        { this.props.children }
      </div>
    );
  }
}
