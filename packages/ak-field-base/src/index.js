import { vdom, define, prop, Component } from 'skatejs';
import base from 'ak-component-base';
import Label from './Label';
import Root from './Root';
import Content from './Content';
import { standard as standardAppearance } from './internal/appearance';
import safeProps from './internal/safeProps';
import { beforeFocusedChange } from './internal/events';

// need to inject Component and prop to create the base Component;
const Base = base({ Component, prop });

// we use this so that we can pass a function down to Content so that it can update the
// [focused] prop.
function setFocused(elem, focus) {
  safeProps(elem, { focused: focus });
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class FieldBase
 * @extends ComponentBase
 * @example @html <ak-field-base label="Email" />
 * @example @js import FieldBase from 'ak-field-base';
 *
 * const field = new FieldBase();
 * field.label = 'Email';
 * document.body.appendChild(field);
 */
export default define('ak-field-base', Base.extend({
  render(elem) {
    return (
      <Root>
        <Label
          label={elem.label}
          hideLabel={elem.hideLabel}
          required={elem.required}
        >
          <Content
            setFocused={focus => setFocused(elem, focus)}
            appearance={elem.appearance}
            focused={elem.focused}
            disabled={elem.disabled}
            invalid={elem.invalid}
          />
        </Label>
      </Root>
    );
  },
  props: Object.assign({}, {
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
     * @example @html <ak-field-base appearance="compact"></ak-field-base>
     * @example @js field.appearance = 'compact';
     */
    appearance: prop.string({
      attribute: true,
      default: standardAppearance,
    }),
    /**
     * @description The label to be rendered above the form field.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     * @memberof FieldBase
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
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
     * @example @html <ak-field-base label="First Name" hideLabel></ak-field-base>
     * @example @js field.label = 'First Name';
     * field.hideLabel = true;
     */
    hideLabel: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field should show a validation error.
     *
     * This is shown to the user through a red border currently but will also include error messages
     * in a future release.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base invalid></ak-field-base>
     * @example @js field.invalid = true;
     */
    invalid: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field should show it's focused styles.
     *
     * By default, this component will automatically add and remove this prop if itself or any child
     * of it receives focus or blur events. You can override this behaviour by using the override
     * prop.
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
    focused: prop.boolean(),
    /**
     * @description Whether or not the field is required.
     *
     * If set to true, an asterisk will be appended to the label text.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base label="First Name" required"></ak-field-base>
     * @example @js field.required = true;
     */
    required: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field is disabled.
     *
     * This is shown to the user through a disabled cursor icon when hovering over the field.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base disabled></ak-field-base>
     * @example @js field.disabled = true;
     */
    disabled: prop.boolean({ attribute: true }),
  }, Base.props),
}));

export const events = { beforeFocusedChange };
