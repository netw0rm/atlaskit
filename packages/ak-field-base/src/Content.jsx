import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import WarningIcon from 'ak-icon/glyph/warning';
import { locals } from './styles.less';
import appearances, { compact, subtle } from './internal/appearances';

/* eslint-disable react/prefer-stateless-function */
export default class Content extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    isDisabled: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
    isPaddingDisabled: PropTypes.bool.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    children: PropTypes.node,
    rightGutter: PropTypes.node,
  }

  static defaultProps = {
    rightGutter: false,
  }

  renderRightGutter = () => (
    <div className={locals.rightGutterWrapper}>
      {this.props.rightGutter}
    </div>
  )

  renderWarningIcon = () => (
    <div className={locals.warningIconWrapper}>
      <WarningIcon label="warning" />
    </div>
  )

  render() {
    const contentClasses = classNames(locals.content, {
      [locals.compact]: this.props.appearance === compact,
      [locals.subtle]: this.props.appearance === subtle,
      [locals.disabled]: this.props.isDisabled,
      [locals.readOnly]: this.props.isReadOnly,
      [locals.paddingDisabled]: this.props.isPaddingDisabled,
      [locals.focused]: this.props.isFocused,
      [locals.invalid]: this.props.isInvalid && !this.props.isFocused,
    });

    return (
      <div className={locals.contentWrapper}>
        <div
          className={contentClasses}
          onFocusCapture={this.props.onFocus}
          onBlurCapture={this.props.onBlur}
        >
          {this.props.children}
          {this.props.isInvalid ? this.renderWarningIcon() : null}
        </div>
        {this.props.rightGutter ? this.renderRightGutter() : null}
      </div>
    );
  }
}
