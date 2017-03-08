import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

const SPINNER_SIZE = 20;
// time in milliseconds to wait before displaying the loading spinner
const SPINNER_DELAY = 100;
const SIZES = Object.freeze({
  small: 20,
  medium: 30,
  large: 50,
  xlarge: 100,
});

export default class Spinner extends PureComponent {
  static displayName = 'AkSpinner';

  static propTypes = {
    onComplete: PropTypes.func,
    isCompleting: PropTypes.bool,
    size: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    ]),
  }

  static defaultProps = {
    onComplete: () => {},
    isCompleting: false,
    size: 'small',
  }

  state = {
    spinnerHiddenForDelay: true,
    spinnerDelayTimeout: null,
  };

  componentDidMount() {
    if (!this.props.isCompleting) {
      this.showSpinnerAfterDelay();
    }
  }

  componentWillReceiveProps(nextProps) {
    // if we werent displaying the spinner and now we are
    if (this.props.isCompleting && !nextProps.isCompleting) {
      this.showSpinnerAfterDelay();
    }
  }

  showSpinnerAfterDelay = () => {
    if (this.state.spinnerDelayTimeout) {
      clearTimeout(this.state.spinnerDelayTimeout);
    }
    this.setState({
      spinnerDelayTimeout: setTimeout(this.handleSpinnerDelayEnd, SPINNER_DELAY),
      spinnerHiddenForDelay: true,
    });
  }

  handleSpinnerDelayEnd = () => {
    this.setState({ spinnerHiddenForDelay: false });
  }

  handleTransitionEnd = (e) => {
    // we have to check that props.isCompleting as a transitionEnd event will be fired when starting
    // up and winding down. This could lead to a case where a spinner starts completing and is then
    // sets isCompleting="false" in which case onComplete will not be called, which is expected
    // behaviour (the transition did not complete).
    if (e.propertyName === 'stroke-dashoffset' && this.props.isCompleting) {
      this.props.onComplete();
    }
  }

  render() {
    let spinnerSize = SIZES[this.props.size] || this.props.size;

    if (typeof spinnerSize !== 'number') {
      spinnerSize = SPINNER_SIZE;
    }

    const spinnerStyles = {
      [styles.spinner]: true,
      [styles.hidden]: this.state.spinnerHiddenForDelay,
      [styles.active]: !this.props.isCompleting,
    };
    const strokeWidth = Math.round(spinnerSize / 10);
    const strokeRadius = (spinnerSize / 2) - (strokeWidth / 2);
    const circumference = Math.PI * strokeRadius * 2;
    const dashStyles = {
      strokeDashoffset: this.props.isCompleting ? circumference : 0.8 * circumference,
      strokeDasharray: circumference,
    };
    return (
      <div style={{ display: 'inline-flex' }}>
        <div
          className={classNames(spinnerStyles)}
          onTransitionEnd={this.handleTransitionEnd}
          style={{
            height: `${spinnerSize}px`,
            width: `${spinnerSize}px`,
          }}
        >
          <div className={styles.spinnerWrapper}>
            <svg
              height={spinnerSize}
              width={spinnerSize}
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${spinnerSize} ${spinnerSize}`}
            >
              <circle
                className={styles.circle}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                cx={spinnerSize / 2}
                cy={spinnerSize / 2}
                r={strokeRadius}
                style={dashStyles}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
