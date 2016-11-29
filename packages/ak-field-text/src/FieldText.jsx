import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import FieldBase from 'ak-field-base';

/**
 * @description A text based form field with an associated label.
 * @class TextField
 * @example @html @playground
 * <form>
 *   <FieldText label="My form field"></FieldText>
 * </form>
 */
 /* eslint-disable react/prefer-stateless-function, react/no-unused-prop-types */
export default class FieldText extends PureComponent {
  static propTypes = {
    /**
     * @description Whether to use compact sizing for the field.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     * @example @html <FieldText compact></FieldText>
     */
    compact: PropTypes.bool,
    /**
     * @description The type of control to display.
     * @memberof TextField
     * @instance
     * @type {string}
     * @default text
     * @example @html <FieldText type="password"></FieldText>
     */
    type: PropTypes.string,
    /**
     * @description Whether the field is disabled.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     * @example @html <FieldText disabled></FieldText>
     */
    disabled: PropTypes.bool,
    /**
     * @description Whether the field is required.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     * @example @html <FieldText required></FieldText>
     */
    required: PropTypes.bool,
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof TextField
     * @instance
     * @type {string}
     * @example @html <FieldText label="First name"></FieldText>
     */
    label: PropTypes.string,
    /**
     * @description The name of the field, which is submitted with the form data.
     * @memberof TextField
     * @instance
     * @type {string}
     * @example @html <FieldText name="fname"></FieldText>
     */
    name: PropTypes.string,
    /**
     * @description A hint to the user of what can be entered in the control.
     * @memberof TextField
     * @instance
     * @type {string}
     * @example @html <FieldText placeholder="e.g. Your name"></FieldText>
     */
    placeholder: PropTypes.string,
    /**
     * @description The value of the input field.
     * @memberof TextField
     * @instance
     * @type {string}
     */
    value: PropTypes.string,
    /**
     * @description Callback to update input value
     * @memberof TextField
     * @instance
     * @type {Function}
     */
    onChange: PropTypes.func.required,
  }

  static defaultProps = {
    compact: false,
    disabled: false,
    required: false,
    type: 'text',
  }

  render() {
    return (
      <FieldBase
        appearance={this.props.compact ? 'compact' : 'standard'}
        disabled={this.props.disabled}
        label={this.props.label}
        required={this.props.required}
      >
        <input
          className={styles.input}
          type={this.props.type}
          disabled={this.props.disabled}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          required={this.props.required}
          onChange={this.props.onChange}
        />
      </FieldBase>
    );
  }
}
