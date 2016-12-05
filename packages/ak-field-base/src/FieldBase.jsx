import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Label from './Label';
import Content from './Content';
import appearances, { standard } from './internal/appearances';

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
     * @memberof FieldBase
     * @type {string}
     * @default standard
     * @example <FieldBase appearance="compact" />
     */
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    /**
     * @description The label to be rendered above the form field.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     * @memberof FieldBase
     * @type {string}
     * @example <FieldBase label="Email" />
     */
    label: PropTypes.string.isRequired,
    /**
     * @description Whether the field should show a label above it.
     *
     * If set to true no label will be shown and no space will be reserved for it.
     *
     * **Note**: You must still provide a label for the component regardless of this prop.
     * The label is also used to make the field accessible to screen readers.
     *
     * Defaults to false.
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase label="First Name" shouldHideLabel />
     */
    isLabelHidden: PropTypes.bool,
    /**
     * @description Whether or not a field should show a validation error.
     *
     * This is shown to the user through a red border currently but will also
     * include error messages in a future release.
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
     * @memberof FieldBase
     * @type {boolean}
     * @default false
     * @example <FieldBase isDisabled />
     */
    isDisabled: PropTypes.bool,
    /**
     * @description Callback that is called whenever the Label is clicked
     *
     * @memberof FieldBase
     * @type {Function}
     * @default () => void
     * @example <FieldBase onLabelClick={() => alert('label click!')} />
     */
    onLabelClick: PropTypes.func,
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
    isFocused: false,
    isDisabled: false,
    isRequired: false,
  }

  render = () =>
    <div className={styles.root}>
      <Label
        label={this.props.label}
        isLabelHidden={this.props.isLabelHidden}
        isRequired={this.props.isRequired}
        onLabelClick={this.props.onLabelClick}
      >
        <Content
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          appearance={this.props.appearance}
          isDisabled={this.props.isDisabled}
          isInvalid={this.props.isInvalid}
          isFocused={this.props.isFocused}
        >
          {this.props.children}
        </Content>
      </Label>
    </div>
}
