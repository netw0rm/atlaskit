import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Label from './Label';
import Content from './Content';
import { standard as standardAppearance } from './internal/appearance';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class FieldBase
 * @extends ComponentBase
 * @example <ak-field-base label="Email" />
 */
export default class FieldBase extends PureComponent {
  static get typeProps() {
    return {
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
       * @example <ak-field-base appearance="compact"></ak-field-base>
       */
      appearance: PropTypes.string,
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
       * @example <ak-field-base label="First Name" hideLabel></ak-field-base>
       */
      hideLabel: PropTypes.boolean,
      /**
       * @description Whether or not a field should show a validation error.
       *
       * This is shown to the user through a red border currently but will also
       * include error messages in a future release.
       * @memberof FieldBase
       * @instance
       * @type {boolean}
       * @default false
       * @example <ak-field-base invalid></ak-field-base>
       */
      invalid: PropTypes.boolean,
      /**
       * @description Whether or not a field should show it's focused styles.
       *
       * By default, this component will automatically add and remove this prop if itself
       * or any child of it receives focus or blur events. You can override this behaviour
       * by using the override prop.
       *
       * See [Override behaviour](#override-behaviour) for more information.
       *
       * @memberof FieldBase
       * @instance
       * @type {boolean}
       * @default false
       * @example @html <ak-field-base invalid></ak-field-base>
       * @example @js field.invalid = true;
       */
      focused: PropTypes.boolean,
      /**
       * @description Whether or not the field is required.
       *
       * If set to true, an asterisk will be appended to the label text.
       * @memberof FieldBase
       * @instance
       * @type {boolean}
       * @default false
       * @example <ak-field-base label="First Name" required"></ak-field-base>
       */
      required: PropTypes.boolean,
      /**
       * @description Whether or not a field is disabled.
       *
       * This is shown to the user through a disabled cursor icon when hovering over the field.
       * @memberof FieldBase
       * @instance
       * @type {boolean}
       * @default false
       * @example <ak-field-base disabled></ak-field-base>
       */
      disabled: PropTypes.boolean,
      /**
       * @description Callback that is called whenever the Label is clicked
       *
       * @memberof FieldBase
       * @instance
       * @type {Function}
       * @default () => void
       * @example <ak-field-base onLabelClick={() => alert('label click!')} />
       */
      onLabelClick: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      appearance: standardAppearance,
      focused: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      // TODO: fix linting error
      // focused: props.focused,
      focused: false,
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
