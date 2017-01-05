import styles from 'style!./styles.less';
import classNames from 'classnames';
import WarningIcon from 'ak-icon/glyph/warning';
import React, { PureComponent, PropTypes } from 'react';
import appearances, { standard, compact, none, subtle } from './internal/appearances';

/**
 * @description Create instances of the FieldBase.
 * @class FieldBase
 * @example <FieldBase label="Email" />
 */
 /* eslint-disable react/no-unused-prop-types */
export default class FieldBase extends PureComponent {
  static propTypes = {
    /**
     * @description The appearance of the field.
     *
     * Valid values for this property are: 'standard' (default), 'compact' and 'subtle'.
     *
     * Compact will make the field have less padding and subtle will remove the background/border
     * until a user hovers over it.
     *
     * @memberof FieldBase
     * @type {string}
     * @default standard
     * @example <FieldBase appearance="compact" />
     */
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    /**
     * @description Whether or not a field should show a validation error.
     *
     * This is shown to the user through a warning icon and an orange border.
     * A future release will allow a custom error message to be displayed.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase isInvalid />
     */
    isInvalid: PropTypes.bool,
    /**
     * @description Whether or not a field should show its focused styles by default.
     *
     * By default, this component will automatically add and remove this prop if itself
     * or any child of it receives focus or blur events.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example @html <FieldBase isFocused />
     */
    isFocused: PropTypes.bool,
    /**
     * @description Whether or not the field is required.
     *
     * If set to true, an asterisk will be appended to the label text.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase label="First Name" isRequired" />
     */
    isRequired: PropTypes.bool,
    /**
     * @description Whether or not a field is disabled.
     *
     * This is shown to the user through a disabled cursor icon when hovering over the field.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase isDisabled />
     */
    isDisabled: PropTypes.bool,
    /**
     * @description Whether or not the field should have padding.
     *
     * Disables the field's padding css property.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase isPaddingDisabled />
     */
    isPaddingDisabled: PropTypes.bool,
    /**
     * @description Whether or not the field is in read-only mode.
     *
     * Disables the field's hover effect to indicate that it is not editable.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase isReadOnly />
     */
    isReadOnly: PropTypes.bool,
    /**
     * @description Whether or not the field should fill the width of its container.
     *
     * If enabled, the field will fit the width of its container even
     * when the field content is not that wide.
     *
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase isFitContainerWidthEnabled />
     */
    isFitContainerWidthEnabled: PropTypes.bool,
    /**
     * @description Callback that is called whenever the Content is focused
     *
     * @memberof FieldBase
     * @type {Function}
     * @default () => void
     * @example <FieldBase onFocus={() => alert('content focused!')} />
     */
    onFocus: PropTypes.func.isRequired,
    /**
     * @description Callback that is called whenever the Content is blured
     *
     * @memberof FieldBase
     * @type {Function}
     * @default () => void
     * @example <FieldBase onBlur={() => alert('content blured!')} />
     */
    onBlur: PropTypes.func.isRequired,
    /**
     * @description The content that will be displayed within the field
     *
     * @memberof FieldBase
     * @type {ReactNode}
     * @example <FieldBase><div>Hi!</div></FieldBase>
     */
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
