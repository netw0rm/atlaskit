import 'style!./host.less';
import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';

function handleLabelClick(elem) {
  return () => {
    const firstInput = elem.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  };
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
            {elem.required && <span class={shadowStyles.locals.required}>*</span>}
          </div>
          <slot className={shadowStyles.locals.defaultSlotElement} />
        </label>
      </div>
    );
  },
  props: {
    /**
     * @description Whether to use compact sizing for the field.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     */
    compact: prop.boolean({ attribute: true }),
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof TextField
     * @instance
     * @type {string}
     */
    label: { attribute: true },
    /**
     * @description Whether the field is required.
     * @memberof TextField
     * @instance
     * @type {Boolean}
     */
    required: prop.boolean({ attribute: true }),
  },
});
