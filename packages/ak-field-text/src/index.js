import 'style!./host.less';
import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';

import * as events from './internal/index.events';

const inputSlot = Symbol();
const focusHandlers = Symbol();

function getInput(elem) {
  return elem.querySelector('[slot=input]');
}

function handleLabelClick(elem) {
  return () => {
    const input = getInput(elem);
    if (input) {
      input.focus();
    }
  };
}

function setupFocusHandlers(elem) {
  const slot = elem[inputSlot];
  if (!slot[focusHandlers]) {
    slot.addEventListener('focus', () => emit(elem, events.focus), true);
    slot.addEventListener('blur', () => emit(elem, events.blur), true);
    slot[focusHandlers] = true;
  }
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TextField
 * @example @js import TextField from 'ak-field-text';
 * const component = new TextField();
 */
export default define('ak-field-text', {
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <label
          onclick={handleLabelClick(elem)}
          className={shadowStyles.locals.label}
        >
          <div className={shadowStyles.locals.labelText}>
            {elem.label}
            {elem.required && <span class={shadowStyles.locals.labelRequired}>*</span>}
          </div>
          <slot
            name="input"
            className={classNames(shadowStyles.locals.defaultSlotElement, {
              [shadowStyles.locals.compact]: elem.compact,
            })}
            ref={(el) => {
              elem[inputSlot] = el;
              setupFocusHandlers(elem);
            }}
          />
        </label>
      </div>
    );
  },
  rendered(elem) {
    let input = getInput(elem);
    if (!input) {
      input = document.createElement('input');
      input.slot = 'input';
      elem.appendChild(input);
    }
    ['disabled', 'name', 'placeholder', 'type'].forEach((propName) => {
      if (elem[propName]) {
        input[propName] = elem[propName];
      }
    });
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
