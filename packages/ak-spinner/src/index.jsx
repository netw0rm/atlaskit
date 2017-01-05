import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

// This is hard codes to 20 pixels for now but if we end up doing t-shirt sizing AK-1153
const SPINNER_SIZE = 20;

export default class Spinner extends PureComponent {
  static displayName = 'AkSpinner';

  static propTypes = {
    onComplete: PropTypes.func,
    isCompleting: PropTypes.bool,
  }

  static defaultProps = {
    onComplete: () => {},
    isCompleting: false,
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
    const strokeWidth = Math.round(SPINNER_SIZE / 10);
    const strokeRadius = (SPINNER_SIZE / 2) - (strokeWidth / 2);
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
            height: `${SPINNER_SIZE}px`,
            width: `${SPINNER_SIZE}px`,
          }}
        >
          <div className={styles.spinnerWrapper}>
            <svg
              height={SPINNER_SIZE}
              width={SPINNER_SIZE}
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${SPINNER_SIZE} ${SPINNER_SIZE}`}
            >
              <circle
                className={styles.circle}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                cx={SPINNER_SIZE / 2}
                cy={SPINNER_SIZE / 2}
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
