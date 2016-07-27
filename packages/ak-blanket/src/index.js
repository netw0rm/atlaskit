/** @jsx vdom */
import 'style!./host.less';

import { prop, vdom, define, emit } from 'skatejs';
import shadowStyles from './shadow.less';
import classNames from 'classnames';

function handleBlur(elem) {
  return () => {
    if (elem.clickable) {
      emit(elem, 'ak-blanket-click');
    }
  };
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Blanket
 * @example @js import Blanket from 'ak-blanket';
 * const component = new Blanket();
 */
export default define('ak-blanket', {
  render(elem) {
    const classes = classNames(
      [shadowStyles.locals.blanket, { [`${shadowStyles.locals.obscured}`]: elem.obscured }]
    );
    const styles = elem.zIndex ? { zIndex: elem.zIndex } : '';

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div
          onclick={handleBlur(elem)}
          ontouch={handleBlur(elem)}
          style={styles}
          class={classes}
        >
        </div>
      </div>
    );
  },
  props: {
    /**
     * @description Is blanket grey with opacity or transparent. By default it's transparent.
     * @memberof Blanket
     * @instance
     * @type Boolean
     * @default true
     * @example @html <ak-blanket obscure></ak-blanket>
     * @example @js component.obscure = true
     */
    obscured: prop.boolean({
      attribute: true,
      default: false,
    }),
    /**
     * @description If click on the blanket emits a 'blanket-click' event.
     * @memberof Blanket
     * @instance
     * @type Boolean
     * @default true
     * @example @html <ak-blanket clickable></ak-blanket>
     * @example @js component.clickable = true
     */
    clickable: prop.boolean({
      attribute: true,
      default: false,
    }),
    /**
     * @description z-index style for the blanket
     * @memberof Blanket
     * @instance
     * @type Number
     * @example @html <ak-blanket z-index="9999"></ak-blanket>
     * @example @js component.zIndex = 9999
     */
    zIndex: prop.number({
      attribute: true,
    }),
  },
});
