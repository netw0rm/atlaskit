import 'style!./host.less';
// import classNames from 'classnames';
import { symbols, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

function handleLabelClick(elem) {
  return () => {
    const nodes = elem[symbols.shadowRoot].querySelector('slot').assignedNodes();

    // Loop over light DOM nodes and focus on first input
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName === 'INPUT') {
        nodes[i].focus();
        break;
      }
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
     * @description The name of the TextField element.
     * @memberof TextField
     * @instance
     * @type {string}
     * @default TextField
     */
    name: {
      default: 'TextField',
    },
  },
});
