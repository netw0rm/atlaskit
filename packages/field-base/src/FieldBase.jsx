import styles from 'style!./styles.less';
import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import Spinner from '@atlaskit/spinner';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import InlineDialog from '@atlaskit/inline-dialog';

 /* eslint-disable react/no-unused-prop-types */
export default class FieldBase extends PureComponent {
  static propTypes = {
    /**
      * controls the appearance of the field.
      * subtle shows styling on hover.
      * none hides all field styling.
      */
    appearance: PropTypes.oneOf(['standard', 'none', 'subtle']),
    /** children to render as dialog */
    children: PropTypes.node,
    /** message to show on the dialog when isInvalid and isDialogOpen  are true */
    invalidMessage: PropTypes.node,
    /** applies compact styling, making the field smaller */
    isCompact: PropTypes.bool,
    /** controls whether to show or hide the dialog */
    isDialogOpen: PropTypes.bool,
    /** disable the field and apply disabled styling */
    isDisabled: PropTypes.bool,
    /** whether the fit the field to the enclosing container */
    isFitContainerWidthEnabled: PropTypes.bool,
    /** apply styling based on whether the field is focused */
    isFocused: PropTypes.bool,
    /** set the field as invalid, triggering style and message */
    isInvalid: PropTypes.bool,
    /** show a loading indicator */
    isLoading: PropTypes.bool,
    /** disable padding styles */
    isPaddingDisabled: PropTypes.bool,
    /** apply read only styling */
    isReadOnly: PropTypes.bool,
    /** mark the field as required */
    isRequired: PropTypes.bool,
    /** handler for the onBlur event on the field element */
    onBlur: PropTypes.func.isRequired,
    /** handler for the onBlur event on the dialog element */
    onDialogBlur: PropTypes.func,
    /** handler for the click event on the dialog element */
    onDialogClick: PropTypes.func,
    /** handler for the focus event on the dialog element */
    onDialogFocus: PropTypes.func,
    /** handler for the focus event on the field element */
    onFocus: PropTypes.func.isRequired,
    /** whether to call the onBlur handler inside componentDidUpdate */
    shouldReset: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'standard',
    invalidMessage: '',
    isCompact: false,
    isDialogOpen: false,
    isDisabled: false,
    isFitContainerWidthEnabled: false,
    isFocused: false,
    isInvalid: false,
    isLoading: false,
    isPaddingDisabled: false,
    isReadOnly: false,
    isRequired: false,
    onDialogBlur: () => {},
    onDialogClick: () => {},
    onDialogFocus: () => {},
    shouldReset: false,
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
      [styles.none]: this.props.appearance === 'none',
      [styles.subtle]: this.props.appearance === 'subtle',
      [styles.compact]: this.props.isCompact,
      [styles.disabled]: this.props.isDisabled,
      [styles.readOnly]: this.props.isReadOnly,
      [styles.paddingDisabled]: this.props.isPaddingDisabled,
      [styles.fitContainerWidth]: this.props.isFitContainerWidthEnabled,
      [styles.focused]: this.props.isFocused,
      [styles.invalid]: this.props.isInvalid && !this.props.isFocused,
    });

    const dialogWrapperClasses = classNames(styles.dialogContainer, {
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
