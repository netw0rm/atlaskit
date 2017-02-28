import styles from 'style!./styles.less';
import classNames from 'classnames';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import React, { PureComponent, PropTypes } from 'react';
import appearances, { standard, compact, none, subtle } from './internal/appearances';

 /* eslint-disable react/no-unused-prop-types */
export default class FieldBase extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    isInvalid: PropTypes.bool,
    isFocused: PropTypes.bool,
    isRequired: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isPaddingDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    isFitContainerWidthEnabled: PropTypes.bool,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    shouldReset: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    appearance: standard,
    isLabelHidden: false,
    isPaddingDisabled: false,
    isInvalid: false,
    isFocused: false,
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    isFitContainerWidthEnabled: false,
    shouldReset: false,
  }

  componentDidUpdate() {
    if (this.props.shouldReset) {
      this.props.onBlur();
    }
  }

  renderWarningIcon = () => (
    <div className={styles.warningIconWrapper}>
      <WarningIcon label="warning" />
    </div>
  )

  render() {
    const contentClasses = classNames(styles.contentContainer, {
      [styles.compact]: this.props.appearance === compact,
      [styles.none]: this.props.appearance === none,
      [styles.subtle]: this.props.appearance === subtle,
      [styles.disabled]: this.props.isDisabled,
      [styles.readOnly]: this.props.isReadOnly,
      [styles.paddingDisabled]: this.props.isPaddingDisabled,
      [styles.fitContainerWidth]: this.props.isFitContainerWidthEnabled,
      [styles.focused]: this.props.isFocused,
      [styles.invalid]: this.props.isInvalid && !this.props.isFocused,
    });

    const contentWrapperClasses = classNames(styles.contentWrapper, {
      [styles.fitContainerWidth]: this.props.isFitContainerWidthEnabled,
    });

    return (
      <div className={contentWrapperClasses}>
        <div
          className={contentClasses}
          onFocusCapture={this.props.onFocus}
          onBlurCapture={this.props.onBlur}
        >
          {this.props.children}
          {this.props.isInvalid ? this.renderWarningIcon() : null}
        </div>
      </div>
    );
  }
}
