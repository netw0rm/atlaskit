import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

const SIZES = Object.freeze({
  small: 20,
  medium: 32,
  large: 45
});

/**
 * @description An spinning loading/waiting indicator
 * @class Spinner
 * @example @js import Spinner from 'ak-spinner';
 * ReactDOM.render(<Spinner />, container);
 */
export default class Spinner extends PureComponent {
  static displayName = 'AkSpinner';

  static propTypes = {
    /**
     * @description Callback function executed on completion
     * @memberof Spinner
     * @instance
     * @type {function}
     * @default noop
     */
    onComplete: PropTypes.func,

    /**
     * @description Flag indicating that the spinner should dismiss
     * @memberof Spinner
     * @instance
     * @type {Boolean}
     * @default false
     */
    isCompleting: PropTypes.bool,

    /**
     * @description Size of the spinner
     * Allowed values are: 'small' (20px), 'medium' (32px), 'large' (45px), or any number.
     * @memberof Spinner
     * @instance
     * @type {(string|number)}
     * @default 20
     */
    size: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.oneOf(['small', 'medium', 'large']),
    ])
  }

  static defaultProps = {
    onComplete: () => {},
    isCompleting: false,
    size: 20,
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
    const spinnerSize = SIZES[this.props.size] || this.props.size;

    if (typeof spinnerSize !== 'number') return null;

    const spinnerStyles = {
      [styles.spinner]: true,
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
