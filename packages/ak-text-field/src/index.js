import 'style!./host.less';
import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';

import * as events from './internal/index.events';

const focusHandlers = Symbol();

function handleLabelClick(elem) {
  return () => {
    const firstInput = elem.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  };
}

function setupFocusHandlers(inputSlot) {
  if (!inputSlot[focusHandlers]) {
    inputSlot.addEventListener('focus', () => emit(inputSlot, events.focus), true);
    inputSlot.addEventListener('blur', () => emit(inputSlot, events.blur), true);
    inputSlot[focusHandlers] = true;
  }
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TextField
 * @example @js import TextField from 'ak-text-field';
 * const component = new TextField();
 */
export default define('ak-text-field', {
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
            ref={(el) => (setupFocusHandlers(el))}
          />
        </label>
      </div>
    );
  },
  rendered(elem) {
    let input = elem.querySelector('[slot=input]');
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
     * @default input
     */
    // TODO: Document valid values for this prop
    type: prop.string({
      attribute: true,
      default: 'text',
    }),
  },
});

export { events };
