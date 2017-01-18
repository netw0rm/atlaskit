import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

export default class Spinner extends PureComponent {
  static displayName = 'AkSpinner';

  static propTypes = {
    onComplete: PropTypes.func,
    isCompleting: PropTypes.bool,
    spinnerSize: PropTypes.number,
  }

  static defaultProps = {
    onComplete: () => {},
    isCompleting: false,
    spinnerSize: 20,
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
    const spinnerStyles = {
      [styles.spinner]: true,
      [styles.active]: !this.props.isCompleting,
    };
    const strokeWidth = Math.round(this.props.spinnerSize / 10);
    const strokeRadius = (this.props.spinnerSize / 2) - (strokeWidth / 2);
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
            height: `${this.props.spinnerSize}px`,
            width: `${this.props.spinnerSize}px`,
          }}
        >
          <div className={styles.spinnerWrapper}>
            <svg
              height={this.props.spinnerSize}
              width={this.props.spinnerSize}
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${this.props.spinnerSize} ${this.props.spinnerSize}`}
            >
              <circle
                className={styles.circle}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                cx={this.props.spinnerSize / 2}
                cy={this.props.spinnerSize / 2}
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
