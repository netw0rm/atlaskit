import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles.less';
import appearances, { compact, subtle } from './internal/appearances';

/* eslint-disable react/prefer-stateless-function */
export default class Content extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    invalid: PropTypes.bool,
    onFocusCallback: PropTypes.func,
    onBlurCallback: PropTypes.func,
    children: PropTypes.element,
  }
  render() {
    const contentClasses = classNames(styles.locals.content, {
      [styles.locals.compact]: this.props.appearance === compact,
      [styles.locals.subtle]: this.props.appearance === subtle,
      [styles.locals.disabled]: this.props.disabled,
      [styles.locals.focused]: this.props.focused,
      [styles.locals.invalid]: this.props.invalid && !this.props.focused,
    });
    return (
      <div
        className={contentClasses}
        onFocusCapture={this.props.onFocusCallback}
        onBlurCapture={this.props.onBlurCallback}
      >
        {this.props.children}
      </div>
    );
  }
}
