import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import 'akutil-polyfills';
import { define, emit, vdom } from 'skatejs';

/**
 * Pony Button.
 * @constructs PonyButton
 * @description This button think it is a pony, but its really just a button.
 * @example
 * <html-example>
 * <ak-pony-button></ak-pony-button>
 * </html-example>
 */
const PonyButton = define('ak-pony-button', {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.button(`I am a pony. My name is ${elem.name}.`);
  },
  events: {
    /**
     * Click handler. Fires when the button is clicked.
     * @description <strong>Event handler.</strong> The pony button will log output to the console
     * and fire the {@link ak-neigh|ak-neigh} event when it is clicked.
     * @memberof PonyButton
     * @instance
     * @fires PonyButton#ak-neigh
     * @listens click
       */
    click(elem) {
      console.log('Neigh. I am a pony.'); // eslint-disable-line no-console
      /**
       * Neigh event.
       *
       * @event PonyButton#ak-neigh
       * @description Description of the ak-neigh event goes here.
       */
      emit(elem, 'ak-neigh');
    },
  },
  props: {
    /**
     * The name of the pony button.
     *
     * @memberof PonyButton
     * @default Bob
     * @instance
     * @type {string}
     * @example
     * <html-example>
     * <ak-pony-button name="Randy"></ak-pony-button>
     * </html-example>
     */
    name: {
      attribute: true,
      default: 'Bob',
    },
  },
  prototype: {
    /**
     * Causes this pony to canter, and not much else.
     * @description This method will log output the the console and fire the
     * {@link ak-neigh|ak-neigh} event.
     * @memberof PonyButton
     * @function
     * @instance
     * @fires PonyButton#ak-neigh
     * @return {PonyButton} The PonyButton element.
     * @example
     * <html-example>
     * <ak-pony-button id="my-pony-button"></ak-pony-button>
     * </html-example>
     * <js-example>
     * var ponyButton = document.querySelector('my-pony-button');
     * ponyButton.canter(); // Clop clop clop.
     * </js-example>
     */
    canter() {
      console.log('Clop clop clop.'); // eslint-disable-line no-console
      emit(this, 'ak-neigh');
      return this;
    },
  },
});

export default PonyButton;
