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
      [shadowStyles.locals.blanket, { [`${shadowStyles.locals.tinted}`]: elem.tinted }]
    );

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div
          on-click={handleBlur(elem)}
          on-touch={handleBlur(elem)}
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
     * @default false
     * @example @html <ak-blanket tinted></ak-blanket>
     * @example @js component.tinted = true
     */
    tinted: prop.boolean({ attribute: true }),
    /**
     * @description If click on the blanket emits a 'blanket-click' event.
     * @memberof Blanket
     * @instance
     * @type Boolean
     * @default false
     * @example @html <ak-blanket clickable></ak-blanket>
     * @example @js component.clickable = true
     */
    clickable: prop.boolean({ attribute: true }),
  },
});
