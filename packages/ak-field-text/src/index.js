import { vdom, define, prop } from 'skatejs';
import FieldBase from 'ak-field-base';

import shadowStyles from './shadow.less';
import { inputEl } from './internal/symbols';

function getInput(elem) {
  return elem[inputEl];
}

/**
 * @description A text based form field with an associated label.
 * @class TextField
 * @example @js import TextField from 'ak-field-text';
 * const component = new TextField();
 * @example @html @playground <form>
 *   <ak-field-text label="My form field"></ak-field-text>
 * </form>
 */
export default define('ak-field-text', {
  render(elem) {
    return ([
      <style>{shadowStyles.toString()}</style>,
      <FieldBase
        appearance={elem.compact ? 'compact' : 'standard'}
        disabled={elem.disabled}
        label={elem.label}
        required={elem.required}
      >
        <input
          ref={el => (elem[inputEl] = el)}
          slot="input-slot"
          className={shadowStyles.locals.input}
          disabled={elem.disabled}
          name={elem.name}
          placeholder={elem.placeholder}
          type={elem.type}
        />
      </FieldBase>,
    ]);
  },
  props: {
    /**
     * @description Whether to use compact sizing for the field.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     * @example @html <ak-field-text compact></ak-field-text>
     */
    compact: prop.boolean({ attribute: true }),
    /**
     * @description Whether the field is disabled.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     * @example @html <ak-field-text disabled></ak-field-text>
     */
    disabled: prop.boolean({ attribute: true }),
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof TextField
     * @instance
     * @type {string}
     * @example @html <ak-field-text label="First name"></ak-field-text>
     */
    label: prop.string({ attribute: true }),
    /**
     * @description The name of the field, which is submitted with the form data.
     * @memberof TextField
     * @instance
     * @type {string}
     * @example @html <ak-field-text name="fname"></ak-field-text>
     */
    name: prop.string({ attribute: true }),
    /**
     * @description A hint to the user of what can be entered in the control.
     * @memberof TextField
     * @instance
     * @type {string}
     * @example @html <ak-field-text placeholder="e.g. Your name"></ak-field-text>
     */
    placeholder: prop.string({ attribute: true }),
    /**
     * @description Whether the field is required.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     * @example @html <ak-field-text required></ak-field-text>
     */
    required: prop.boolean({ attribute: true }),
    /**
     * @description The type of control to display.
     * @memberof TextField
     * @instance
     * @type {string}
     * @default text
     * @example @html <ak-field-text type="password"></ak-field-text>
     */
    // TODO: Document valid values for this prop
    type: prop.string({
      attribute: true,
      default: 'text',
    }),
    /**
     * @description The value of the field.
     * @memberof TextField
     * @instance
     * @type {string}
     * @example @js field.value = 'My new text field value';
     */
    value: {
      get(elem) {
        const input = getInput(elem);
        return input ? input.value : '';
      },
      set(elem, data) {
        const input = getInput(elem);
        if (input) {
          input.value = data.newValue;
        }
      },
    },
  },
});
