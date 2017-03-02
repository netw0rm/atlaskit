import styles from 'style!./styles.less';
import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import Spinner from '@atlaskit/spinner';
import InlineMessage from '@atlaskit/inline-message';
import appearances, { standard, none, subtle } from './internal/appearances';

 /* eslint-disable react/no-unused-prop-types */
export default class FieldBase extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    isCompact: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isFitContainerWidthEnabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isLoading: PropTypes.bool,
    isPaddingDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    isRequired: PropTypes.bool,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    shouldReset: PropTypes.bool,
    children: PropTypes.node,
    validity: PropTypes.string,
  }

  static defaultProps = {
    appearance: standard,
    isCompact: false,
    isDisabled: false,
    isFitContainerWidthEnabled: false,
    isFocused: false,
    isInvalid: false,
    isLabelHidden: false,
    isLoading: false,
    isPaddingDisabled: false,
    isReadOnly: false,
    isRequired: false,
    shouldReset: false,
  }

  componentDidUpdate() {
    if (this.props.shouldReset) {
      this.props.onBlur();
    }
  }

  renderRightGutter() {
    if (this.props.isInvalid || this.props.validity) {
      return (
        <div className={styles.warningIconWrapper}>
          <InlineMessage type="warning">{this.props.validity}</InlineMessage>
        </div>
      );
    }

    if (this.props.isLoading) {
      return <Spinner />;
    }

    return null;
  }

  render() {
    const contentClasses = classNames(styles.contentContainer, {
      [styles.none]: this.props.appearance === none,
      [styles.subtle]: this.props.appearance === subtle,
      [styles.compact]: this.props.isCompact,
      [styles.disabled]: this.props.isDisabled,
      [styles.readOnly]: this.props.isReadOnly,
      [styles.paddingDisabled]: this.props.isPaddingDisabled,
      [styles.fitContainerWidth]: this.props.isFitContainerWidthEnabled,
      [styles.focused]: this.props.isFocused,
      [styles.invalid]: this.props.isInvalid && !this.props.isFocused,
    });

    const contentWrapperClasses = classNames(styles.contentWrapper, {
      [styles.fitContainerWidth]: this.props.isFitContainerWidthEnabled,
      [styles.disabled]: this.props.isDisabled,
    });

    return (
      <div className={contentWrapperClasses}>
        <div
          className={contentClasses}
          onFocusCapture={this.props.onFocus}
          onBlurCapture={this.props.onBlur}
        >
          {this.props.children}
          {this.renderRightGutter()}
        </div>
      </div>
    );
  }
}
