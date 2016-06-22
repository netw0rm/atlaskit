import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import 'ak-util-polyfills';
import { define, emit, vdom } from 'skatejs';

/**
 * Pony Button.
 * @constructs PonyButton
 * @description This button think it is a pony, but it is not.
 * @example <ak-pony-button></ak-pony-button>
 */
const PonyButton = define('ak-pony-button', {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.div(`I am a pony. My name is ${elem.name}`);
  },
  events: {
    click() {
      console.log('Neigh. I am a pony.'); // eslint-disable-line no-console
      /**
       * Neigh event.
       *
       * @event PonyButton#ak-neigh
       * @type {object}
       * @description The pony button attempts to neigh.
       */
      emit(this, 'ak-neigh');
    },
  },
  properties: {
    /**
     * The name of the pony button.
     *
     * @memberof PonyButton
     * @default Bob
     * @instance
     * @type {string}
     * @example <caption>Hi, my name is Randy. What's yours?</caption>
     * <ak-pony-button name="Randy"></ak-pony-button>
     */
    name: {
      attribute: true,
      default: 'Bob',
    },
  },
  prototype: {
    /**
     * Causes this pony to canter, and not much else. Neigh.
     *
     * @memberof PonyButton
     * @function
     * @instance
     * @example <caption>Look at it go!</caption>
     * ponyButton.canter();
     * // Clop clop clop.
     */
    canter() {
      console.log('Clop clop clop.'); // eslint-disable-line no-console
    },
  },
});

export default PonyButton;
