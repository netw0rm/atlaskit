import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Label from './Label';
import Content from './Content';
import appearances, { standard } from './internal/appearances';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class FieldBase
 * @extends ComponentBase
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
     * @instance
     * @type {string}
     * @default standard
     * @example <FieldBase appearance="compact"></FieldBase>
     */
    appearance: PropTypes.oneOf(Object.keys(appearances)),
    /**
     * @description The label to be rendered above the form field.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     * @memberof FieldBase
     * @instance
     * @type {string}
     */
    label: PropTypes.string,
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
     * @instance
     * @type {boolean}
     * @example <FieldBase label="First Name" hideLabel></FieldBase>
     */
    hideLabel: PropTypes.bool,
    /**
     * @description Whether or not a field should show a validation error.
     *
     * This is shown to the user through a red border currently but will also
     * include error messages in a future release.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example <FieldBase invalid></FieldBase>
     */
    invalid: PropTypes.bool,
    /**
     * @description Whether or not a field should show it's focused styles by default.
     *
     * By default, this component will automatically add and remove this prop if itself
     * or any child of it receives focus or blur events.
     *
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <FieldBase invalid></FieldBase>
     * @example @js field.invalid = true;
     */
    focused: PropTypes.bool,
    /**
     * @description Whether or not the field is required.
     *
     * If set to true, an asterisk will be appended to the label text.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example <FieldBase label="First Name" required"></FieldBase>
     */
    required: PropTypes.bool,
    /**
     * @description Whether or not a field is disabled.
     *
     * This is shown to the user through a disabled cursor icon when hovering over the field.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example <FieldBase disabled></FieldBase>
     */
    disabled: PropTypes.bool,
    /**
     * @description Callback that is called whenever the Label is clicked
     *
     * @memberof FieldBase
     * @instance
     * @type {Function}
     * @default () => void
     * @example <FieldBase onLabelClick={() => alert('label click!')} />
     */
    onLabelClick: PropTypes.func,
  }

  static defaultProps = {
    appearance: standard,
    focused: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      focused: props.focused,
    };
  }

  render() {
    const { props } = this;
    return (
      <div className={styles.root}>
        <Label
          label={props.label}
          hideLabel={props.hideLabel}
          required={props.required}
          onLabelClick={props.onLabelClick}
        >
          <Content
            onFocusCallback={() => this.setState({ focused: true })}
            onBlurCallback={() => this.setState({ focused: false })}
            appearance={props.appearance}
            disabled={props.disabled}
            invalid={props.invalid}
            focused={this.state.focused}
          >
            {props.children}
          </Content>
        </Label>
      </div>
    );
  }
}
