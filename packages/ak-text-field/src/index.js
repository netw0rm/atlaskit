import 'style!./host.less';
import { vdom, define } from 'skatejs';
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
      <div className={shadowStyles.locals.defaultSlotWrapper}>
        <style>{shadowStyles.toString()}</style>
        <label
          onclick={handleLabelClick(elem)}
          className={shadowStyles.locals.label}
        >{elem.label}</label>
        <slot className={shadowStyles.locals.defaultSlotElement} />
      </div>
    );
  },
  props: {
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof TextField
     * @instance
     * @type {string}
     */
    label: { attribute: true },
  },
});
