import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import shadowStyles from './styles.less';
import validAppearances from './internal/appearances';

const [, compact, subtle] = validAppearances;

/* eslint-disable react/prefer-stateless-function */
export default class Content extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(validAppearances),
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    invalid: PropTypes.invalid,
    onFocusCallback: PropTypes.func,
    onBlurCallback: PropTypes.func,
    children: PropTypes.element,
  }
  render() {
    const contentClasses = classNames(shadowStyles.locals.content, {
      [shadowStyles.locals.compact]: this.props.appearance === compact,
      [shadowStyles.locals.subtle]: this.props.appearance === subtle,
      [shadowStyles.locals.disabled]: this.props.disabled,
      [shadowStyles.locals.focused]: this.props.focused,
      [shadowStyles.locals.invalid]: this.props.invalid && !this.props.focused,
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
