/** @jsx vdom */
import 'style!./host.less';

import { prop, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';


/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Blanket
 * @example @js import Blanket from 'ak-blanket';
 * const component = new Blanket();
 */
export default define('ak-blanket', {
  render(elem) {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div
          className={elem.getClassNames()}
          onclick={elem.handleClick.bind(elem)} // eslint-disable-line react/jsx-no-bind
          style={elem.getStyles()}
        >
        </div>
      </div>
    );
  },
  props: {
    /**
     * @description Element to which blanket is a dependant
     * @memberof Blanket
     * @instance
     * @example @html <ak-blanket master="masterELem"></ak-blanket>
     * @example @js component.master = masterELem
     */
    master: {},
    /**
     * @description Is blanket grey with opacity or transparent. By default it's grey.
     * @memberof Blanket
     * @instance
     * @type Boolean
     * @default true
     * @example @html <ak-blanket obscure="true"></ak-blanket>
     * @example @js component.obscure = true
     */
    obscure: prop.boolean({
      attribute: true,
      default: true,
    }),
    /**
     * @description If click on the blanket dismisses the master. By default it is.
     * @memberof Blanket
     * @instance
     * @type Boolean
     * @default true
     * @example @html <ak-blanket clickable="true"></ak-blanket>
     * @example @js component.clickable = true
     */
    clickable: prop.boolean({
      attribute: true,
      default: true,
    }),
    /**
     * @description z-index style for the blanket
     * @memberof Blanket
     * @instance
     * @type Number
     * @default 999999
     * @example @html <ak-blanket z-xndex="9999"></ak-blanket>
     * @example @js component.zIndex = 9999
     */
    zIndex: prop.number({
      attribute: true,
      default: 999999,
    }),
  },
  prototype: {
    handleClick() {
      if (this.clickable && this.master) {
        this.master.open = false;
      }
    },
    getClassNames() {
      let classes = shadowStyles.locals.blanket;

      if (this.obscure) {
        classes += ` ${shadowStyles.locals.obscured}`;
      }

      return classes;
    },
    getStyles() {
      return {
        zIndex: this.zIndex,
      };
    },
  },
});
