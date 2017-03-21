import styles from 'style!./styles.less';
import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import Spinner from '@atlaskit/spinner';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import InlineDialog from '@atlaskit/inline-dialog';
import appearances, { standard, none, subtle } from './internal/appearances';

 /* eslint-disable react/no-unused-prop-types */
export default class FieldBase extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    invalidMessage: PropTypes.node,
    isCompact: PropTypes.bool,
    isDialogOpen: PropTypes.bool,
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
    onDialogBlur: PropTypes.func,
    onDialogClick: PropTypes.func,
    onDialogFocus: PropTypes.func,
  }

  static defaultProps = {
    appearance: standard,
    invalidMessage: '',
    isCompact: false,
    isDialogOpen: false,
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
    onDialogBlur: () => {},
    onDialogClick: () => {},
    onDialogFocus: () => {},
  }

  componentDidUpdate() {
    if (this.props.shouldReset) {
      this.props.onBlur();
    }
  }

  renderRightGutter() {
    if (!this.props.isDisabled && this.props.isInvalid) {
      return (
        <div className={styles.warningIconWrapper}>
          <WarningIcon label="warning" />
        </div>
      );
    }

    return this.props.isLoading ? <Spinner /> : null;
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

    const dialogWrapperClasses = classNames({
      [styles.fitContainerWidth]: this.props.isFitContainerWidthEnabled,
    });

    const contentWrapperClasses = classNames(styles.contentWrapper, {
      [styles.fitContainerWidth]: this.props.isFitContainerWidthEnabled,
      [styles.disabled]: this.props.isDisabled,
    });

    return (
      <div className={contentWrapperClasses}>
        <div className={dialogWrapperClasses}>
          <InlineDialog
            position="right middle"
            isOpen={this.props.isDialogOpen && !!this.props.invalidMessage}
            content={this.props.invalidMessage}
            shouldFlip={['top']}
            onContentBlur={this.props.onDialogBlur}
            onContentClick={this.props.onDialogClick}
            onContentFocus={this.props.onDialogFocus}
          >
            <div
              className={contentClasses}
              onFocusCapture={this.props.onFocus}
              onBlurCapture={this.props.onBlur}
            >
              {this.props.children}
              {this.renderRightGutter()}
            </div>
          </InlineDialog>
        </div>
      </div>
    );
  }
}
