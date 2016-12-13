import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

export default class Spinner extends PureComponent {
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
      this.props.onComplete(this);
    }
  }

  render() {
    const spinnerStyles = {
      [styles.spinner]: true,
      [styles.active]: !this.props.isCompleting,
    };
    return (
      <div style={{ display: 'inline-flex' }}>
        <div className={classNames(spinnerStyles)} onTransitionEnd={this.handleTransitionEnd}>
          <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" strokeWidth="3" strokeLinecap="round" cx="16" cy="16" r="14" />
          </svg>
        </div>
      </div>
    );
  }
}
