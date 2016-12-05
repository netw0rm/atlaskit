import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles.less';
import appearances, { compact, subtle } from './internal/appearances';

/* eslint-disable react/prefer-stateless-function */
export default class Content extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    isDisabled: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    children: PropTypes.node,
  }

  render() {
    const contentClasses = classNames(styles.locals.content, {
      [styles.locals.compact]: this.props.appearance === compact,
      [styles.locals.subtle]: this.props.appearance === subtle,
      [styles.locals.disabled]: this.props.isDisabled,
      [styles.locals.readOnly]: this.props.isReadOnly,
      [styles.locals.focused]: this.props.isFocused,
      [styles.locals.invalid]: this.props.isInvalid && !this.props.isFocused,
    });
    return (
      <div
        className={contentClasses}
        onFocusCapture={this.props.onFocus}
        onBlurCapture={this.props.onBlur}
      >
        {this.props.children}
      </div>
    );
  }
}
