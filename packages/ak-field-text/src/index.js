import { vdom, define, prop } from 'skatejs';
import FieldBase from 'ak-field-base';

import shadowStyles from './shadow.less';
import * as events from './internal/index.events';


function getInput(elem) {
  return elem.querySelector('[slot=input]');
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TextField
 * @example @js import TextField from 'ak-field-text';
 * const component = new TextField();
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
     */
    compact: prop.boolean({ attribute: true }),
    /**
     * @description Whether the field is disabled.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     */
    disabled: prop.boolean({ attribute: true }),
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof TextField
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
    /**
     * @description The name of the field, which is submitted with the form data.
     * @memberof TextField
     * @instance
     * @type {string}
     */
    name: prop.string({ attribute: true }),
    /**
     * @description A hint to the user of what can be entered in the control.
     * @memberof TextField
     * @instance
     * @type {string}
     */
    placeholder: prop.string({ attribute: true }),
    /**
     * @description Whether the field is required.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     * @default false
     */
    required: prop.boolean({ attribute: true }),
    /**
     * @description The type of control to display.
     * @memberof TextField
     * @instance
     * @type {string}
     * @default text
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
     */
    value: {
      get(elem) {
        const input = getInput(elem);
        return input ? input.value : null;
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

export { events };
